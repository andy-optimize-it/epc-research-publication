# A Bounded Software Model for Deterministic Contract Execution and Replay

**Manuscript status:** Research report draft  
**Version:** 1.0  
**Date:** 15 October 2026

## Abstract

This paper examines a strictly bounded, software-based execution model for
deterministic contract and replay execution, together with a parameterized x64
simulator that maps declared pipeline, memory, and control-flow events to
abstract model cycles. The EPC system consists of a versioned operator
runtime, a validated execution contract, and a deterministic simulator
profile. It guarantees reproducibility only for registered operators,
normalized inputs, and fully controlled event traces; uncontrolled or live
sources receive no replay guarantee. The simulator does not model a real
microarchitecture, but instead provides a well-defined deterministic
abstraction with documented limits.

We evaluate the system using a ten-run cross-process replay test and three
synthetic workloads on a single x64 host. All ten independent processes
produce byte-identical canonical states and model traces. The workload
measurements report native wall-clock time, EPC runtime time, setup costs, and
abstract model cycles separately; model cycles are not CPU cycles and are not
interpreted as hardware predictions. The results show reproducible execution
and simulation within the stated guarantee boundaries. We discuss
methodological limitations, the distinction from real microarchitectures, and
threats to validity. This paper is an evidence-based report on a deterministic
software model, not a novelty claim or a claim of hardware simulation.

**Keywords:** deterministic execution; software replay; execution contracts;
abstract simulation; reproducibility

## 1. Introduction

Reproducing a software result requires a clear boundary around the inputs that
can affect execution and a precise definition of the output being compared.
External events, runtime behavior, and implementation choices can all affect
an execution. A reproducibility statement is therefore meaningful only when
its assumptions and limits are explicit.

This study considers a bounded software model that combines a validated
execution contract, a versioned runtime for registered operators, and a
deterministic simulator profile. Its focus is reproducibility within a
declared software boundary. It does not attempt to control a physical
processor or assert that its simulator reproduces the behavior of one.

The paper addresses two questions:

1. Does the tested configuration produce identical canonical state and model
   traces in independent processes?
2. How can wall-clock observations and abstract model costs be reported
   separately without conflating their meanings?

The goal is to document the evidence for this bounded model and to make its
limitations clear. We do not claim that the design is novel, that the results
generalize to arbitrary programs, or that abstract costs predict hardware
performance.

## 2. Scope and terminology

The term **deterministic execution** in this paper refers only to the
contract-bounded configuration under evaluation. The guarantee applies to
registered operators, normalized input, and fully controlled event traces.
Uncontrolled or live sources are outside that guarantee.

The term **model cycle** denotes an abstract cost produced by the declared
simulator model. It is not a physical CPU cycle, a performance-counter
measurement, or a prediction of wall-clock time.

The simulator is an x64-hosted abstraction over declared pipeline, memory, and
control-flow events. The architecture label describes the intended context of
the model; it does not imply fidelity to any specific x64 processor. The
simulator's documented boundaries are part of the result and must accompany
any interpretation of its output.

## 3. System overview

At a high level, the evaluated system has three parts:

- A **versioned execution contract** defines the bounded execution context.
- A **registered-operator runtime** executes within that context and supports
  replay only when the relevant event trace is controlled.
- A **deterministic simulator profile** maps declared events to abstract model
  costs and produces a model trace.

This overview is intentionally non-operational. It does not specify internal
interfaces, data formats, validation rules, event encodings, algorithms,
parameter values, or implementation steps. The paper does not provide enough
information to recreate or substitute for the system.

## 4. Evaluation

### 4.1 Cross-process replay test

The replay evaluation launches ten independent processes using the same
tested configuration. It compares canonical state and model traces across
those runs. All ten processes produce byte-identical results for the tested
case.

This observation is bounded to that test configuration. It is not evidence
for arbitrary registered code, untested event patterns, other runtime
versions, or other hosts. A ten-run test is not a proof of universal
determinism.

### 4.2 Synthetic workload measurements

Three synthetic workloads were evaluated on a single x64 host. The report
keeps native wall-clock measurements, EPC runtime measurements, setup costs,
and abstract model cycles distinct. The workloads and host provide a
descriptive reference point for the evaluated artifact only.

The EPC execution path and the native baseline do not perform identical work.
Consequently, their timing difference must not be interpreted as a like-for-
like speed comparison. Timing observations from one host do not establish
general performance characteristics.

### 4.3 Interpretation

The experiment supports the limited statement that the tested execution
configuration reproduced the selected canonical outputs and model traces
across ten independent processes. The simulator also provides deterministic
outputs for its declared abstraction. The results do not establish that the
simulator predicts physical execution or that the measured timing is
representative of other workloads or systems.

The underlying raw results and implementation are not included in this
publication package. The public package is not a runnable EPC artifact; the
availability boundary is described in
[`ARTIFACT-AND-DATA-AVAILABILITY.md`](ARTIFACT-AND-DATA-AVAILABILITY.md).

## 5. Related work

Deterministic replay and processor simulation are established areas of
research. Prior work such as ODR and DoublePlay studies replay in broader
execution contexts, while gem5 is a configurable architecture simulation
infrastructure. EPC's claims here are narrower: a bounded software execution
model and a deterministic abstract cost profile. The systems differ in
purpose, abstraction, and evaluation scope; this paper makes no comparative
performance or novelty claim. Full citations are in
[`REFERENCES.md`](REFERENCES.md).

## 6. Threats to validity

- **Scope of replay:** Only the tested configuration is covered. The result
  does not prove determinism for arbitrary operators, uncontrolled sources,
  or untested conditions.
- **Number of configurations:** Ten independent processes exercise one
  configuration, not a broad sample of contracts or runtime environments.
- **Workload representativeness:** Three synthetic workloads on one host
  cannot establish performance on production applications or other hosts.
- **Measurement interpretation:** Native and EPC timings correspond to
  different work. Their difference is not an equivalent-workload comparison.
- **Model validity:** Abstract cycles are defined by the simulator profile;
  no claim is made that they match physical CPU cycles or hardware counters.
- **External validity:** A single-host evaluation cannot establish
  cross-platform behavior.
- **Reproducibility of publication artifacts:** This public package omits
  implementation and raw measurement artifacts by design. Independent
  re-execution of the reported study is therefore not possible from this
  package alone.

## 7. Conclusion

This study reports a bounded software model for contract-based execution,
controlled replay, and deterministic abstract simulation. In the evaluated
case, ten independent processes produced byte-identical canonical states and
model traces. Three synthetic workloads were measured on one x64 host, with
wall-clock observations and abstract model cycles treated as separate
quantities.

These findings support only the stated, configuration-specific conclusions.
They do not establish general determinism, hardware prediction, physical
microarchitectural fidelity, cross-platform performance, or novelty. The
implementation and detailed artifacts are intentionally not part of this
public package.

## Declarations

### Data and artifact availability

This publication package contains no executable artifact or raw measurement
data. See
[`ARTIFACT-AND-DATA-AVAILABILITY.md`](ARTIFACT-AND-DATA-AVAILABILITY.md).

### Intellectual property

No implementation source, confidential material, patent claim, or ownership
assertion is disclosed in this manuscript. See [`IP.md`](../IP.md).

### Competing interests

To be completed by the author(s) before publication.

### Author contributions and acknowledgements

To be completed by the author(s) before publication.
