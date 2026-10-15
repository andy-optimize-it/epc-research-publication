# Intellectual Property and Publication Boundary

## Rights

This package does not identify or infer the legal owner of the EPC name,
implementation, research materials, or related intellectual property.
Ownership and publication authority must be confirmed by the relevant
rights-holder(s) before public distribution.

No license to any implementation, source code, patent rights, trade secrets,
trademarks, or other intellectual property is granted by this repository.
Unless and until a separate license is issued by the rights-holder(s), all
rights are reserved. The [`LICENSE`](LICENSE) file states this boundary; it is
not an open-source license.

## Deliberate disclosure limits

The publication package is limited to high-level scientific claims and the
scope needed to interpret them. It must not contain:

- EPC source code, binaries, private interfaces, schemas, or internal data
  structures;
- simulator settings, instruction/event encodings, algorithms, or tuning
  information beyond the approved manuscript;
- raw traces, detailed benchmark records, unpublished results, or confidential
  operational information;
- credentials, keys, customer data, personal data, or information belonging to
  another rights-holder;
- unapproved patent disclosures or statements about patentability.

The included tests are publication-boundary checks only. They cannot certify
that every future edit is legally cleared or free of sensitive information.
Human review is required for every release.

## Release checklist

Before creating a public GitHub repository or publishing a release:

1. Confirm the rights-holder(s), authorship, and authority to publish.
2. Obtain legal/IP review of the manuscript, citations, and repository terms.
3. Review the entire proposed Git diff and repository history for confidential
   or implementation-enabling material.
4. Confirm that every figure, citation, and statement is cleared for use and
   accurately represented.
5. Confirm that no patent filing or other disclosure restriction is affected.
6. Obtain explicit publication approval and update the author and citation
   metadata.

Do not treat passing automated tests as approval to publish.
