"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const allowedFiles = new Set([
  ".gitignore",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/publication-feedback.yml",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/workflows/publication-check.yml",
  "CITATION.cff",
  "CONTRIBUTING.md",
  "IP.md",
  "LICENSE",
  "package.json",
  "README.md",
  "SECURITY.md",
  "paper/ARTIFACT-AND-DATA-AVAILABILITY.md",
  "paper/EPC-Research-Paper.md",
  "paper/REFERENCES.md",
  "tests/publication-boundary.test.cjs"
]);

function listFiles(directory, prefix = "") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.posix.join(prefix, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listFiles(absolutePath, relativePath);
    }
    return [relativePath];
  });
}

test("publication package contains only explicitly approved files", () => {
  const actualFiles = new Set(listFiles(root));
  assert.deepEqual(
    [...actualFiles].filter((file) => !allowedFiles.has(file)).sort(),
    [],
    "review and explicitly allow any new file before adding it"
  );
  assert.deepEqual(
    [...allowedFiles].filter((file) => !actualFiles.has(file)).sort(),
    [],
    "the publication package is missing an expected file"
  );
});

test("manuscript states bounded claims and contains no executable code blocks", () => {
  const manuscript = fs.readFileSync(
    path.join(root, "paper", "EPC-Research-Paper.md"),
    "utf8"
  );
  assert.match(manuscript, /^## Abstract$/m);
  assert.match(manuscript, /ten independent processes/i);
  assert.match(manuscript, /single x64 host/i);
  assert.match(manuscript, /not a novelty claim/i);
  assert.match(manuscript, /claim of hardware simulation/i);
  assert.doesNotMatch(manuscript, /^```/m);
});

test("local Markdown links resolve within the publication package", () => {
  const markdownFiles = listFiles(root).filter((file) => file.endsWith(".md"));
  for (const relativeFile of markdownFiles) {
    const content = fs.readFileSync(path.join(root, relativeFile), "utf8");
    const links = content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g);
    for (const [, target] of links) {
      if (/^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith("#")) {
        continue;
      }
      const localTarget = target.split("#", 1)[0];
      const resolvedTarget = path.resolve(path.dirname(path.join(root, relativeFile)), localTarget);
      const relativeTarget = path.relative(root, resolvedTarget);
      assert.ok(
        relativeTarget === "" || (!relativeTarget.startsWith("..") && !path.isAbsolute(relativeTarget)),
        `${relativeFile} links outside the publication package: ${target}`
      );
      assert.ok(fs.existsSync(resolvedTarget), `${relativeFile} has a broken link: ${target}`);
    }
  }
});
