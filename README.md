# EPC Research Paper

This directory is a self-contained, publication-oriented description of a
bounded software execution and abstract simulation study. It is intended to
be separable from the EPC implementation repository.

## Contents

## Contents

- [`paper/EPC-Research-Paper.md`](paper/EPC-Research-Paper.md) — primary manuscript based on the approved abstract.
- [`paper/EPC-Executive-Summary.md`](paper/EPC-Executive-Summary.md) — supplementary executive summary for manufacturers and technical stakeholders.
- [`paper/REFERENCES.md`](paper/REFERENCES.md) — cited related work.
- [`paper/ARTIFACT-AND-DATA-AVAILABILITY.md`](paper/ARTIFACT-AND-DATA-AVAILABILITY.md) — evidence scope and release boundary.
- [`IP.md`](IP.md) — intellectual-property and publication boundary.
- [`CITATION.cff`](CITATION.cff) — citation metadata.
- [`tests/`](tests/) — checks for this publication package, not the EPC implementation.


## Public-release boundary

This repository contains no EPC source code, executable, implementation
details, private schemas, simulator configuration, or raw benchmark artifacts.
The manuscript reports only high-level claims and the evidence scope needed to
interpret them. It deliberately omits implementation recipes and tuning
details.

When creating a standalone GitHub repository, publish **only the contents of
this `publication` directory**. Do not publish the parent EPC project or its
Git history as part of this package.

The tests verify package contents and publication guardrails only. They do
**not** run or independently validate the EPC runtime or simulator. The study's
reported results are limited to the described ten-process replay test and
three synthetic workloads on one x64 host.

## Status

Prepared for rights-holder and research review. Do not make this repository
public until the checklist in [`IP.md`](IP.md) is complete and publication
approval has been obtained.

## Local checks

Requires Node.js 20 or later. From this directory:

```text
npm test
```

The project has no third-party package dependencies.

## Contributions

Proposed changes must preserve the public-release boundary. See
[`CONTRIBUTING.md`](CONTRIBUTING.md). Do not submit source, private data,
credentials, unreleased results, or implementation-specific details.
