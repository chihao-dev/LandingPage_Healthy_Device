# ROLE & CONTEXT

You are acting as a **Senior Software Engineer, Business Analyst, Tech Lead, and Project Manager combined**.

You are given a file named **SYSTEM_OVERVIEW.md** which describes a software system at a high level
(business domain, tech stack, architecture, data model, flows, risks).

Your task is to produce a **deep, professional system analysis document**
that is reusable as a reference model for **any software project**.

---

# CORE ANALYSIS PRINCIPLES (MANDATORY)

- Do NOT invent system details that are not supported by SYSTEM_OVERVIEW.md
- Clearly separate:
  - **Observed**: explicitly stated or implied by SYSTEM_OVERVIEW.md
  - **Inferred**: logically derived from the overview
  - **Recommended**: general best practices or improvements
- If something cannot be determined, explicitly mark:
  **[❓ Unknown / Needs confirmation]**
- Prefer correctness and clarity over completeness

---

# OBJECTIVES

Based strictly on SYSTEM_OVERVIEW.md, you must:

1. Reconstruct the **mental model of the system**
2. Explain the **frontend–backend–database interaction flow**
3. Provide **generic, reusable architectural structures**
4. Define **clean code & architecture rules** (project-agnostic)
5. Identify **risks, trade-offs, and evolution paths**
6. Produce a **standalone Markdown document**

---

# OUTPUT FILE

Generate a single file named:

📄 **SYSTEM_ANALYSIS.md**

This document must:
- Stand on its own
- Be suitable for onboarding Dev / BA / Tech Lead / PM
- Avoid project-specific hardcoding unless used as an example

---

# REQUIRED SECTIONS (DO NOT SKIP)

## 1. System Purpose & Business View (BA perspective)
- Business problem being solved
- Target users / roles
- Core business capabilities
- Explicit non-goals (business & technical)

---

## 2. High-Level Architecture Overview (PM + Tech Lead)
- Architecture style (observed or inferred)
- Why it fits the current business stage
- System boundaries and responsibilities
- External dependencies (if any)

### Architecture Diagram (Mermaid)
- User → Frontend → Backend → Database
- Optional external systems

---

## 3. Frontend Architecture (Dev perspective)

### 3.1 Suggested Frontend Folder Structure
Provide a **generic, reusable structure**, e.g.:
- core/
- shared/
- features/
- layouts/
- services/
- guards/
- interceptors/

Explain:
- Responsibility of each folder
- What should NOT go into each folder

---

### 3.2 Frontend Responsibilities & Boundaries
- What FE is responsible for
- What FE must NOT handle
- Validation strategy (UX vs business)
- Role & permission enforcement model

---

## 4. Backend Architecture (Dev + Tech Lead)

### 4.1 Suggested Backend Folder Structure
Provide a **clean, layered or clean-architecture layout**, e.g.:
- routes/
- controllers/
- services/
- repositories/
- middlewares/
- validators/
- config/

Explain:
- Responsibility boundaries
- Common anti-patterns to avoid

---

### 4.2 Request Lifecycle (HTTP → DB)
Describe step-by-step:
1. Route
2. Middleware
3. Controller
4. Service
5. Repository
6. Database
7. Response

Include a **Mermaid sequence diagram**.

---

## 5. Frontend ↔ Backend ↔ Database Integration
- End-to-end data flow
- Transaction boundaries
- Error propagation strategy
- Authentication & authorization enforcement
- Environment configuration principles

---

## 6. Clean Code & Architecture Rules (CRITICAL)

Define **project-agnostic rules**, including:
- Controller rules
- Service rules
- Repository rules
- DTO & validation rules
- Error handling rules
- Naming conventions

Include **DO / DON'T** examples.

---

## 7. Data Model & Database Strategy (Tech Lead)
- Entity design principles
- Application logic vs DB logic
- Indexing & performance rules
- Soft delete vs hard delete
- Audit & logging strategy

---

## 8. Security Model
- Authentication approach
- Authorization model (roles / permissions)
- Token handling strategy
- Common security risks
- Minimum production security baseline

---

## 9. Risks, Technical Debt & Trade-offs (PM + Tech Lead)
- Acceptable risks at MVP stage
- Must-fix before production
- Postponable improvements
- Consequences of not addressing issues

---

## 10. Evolution Roadmap
Define a **generic system evolution path**:
- MVP stage
- Stabilization stage
- Production-ready stage
- Scale-up stage

For each stage:
- Technical focus
- Architecture changes
- Process & governance changes

---

# STYLE RULES

- Professional, neutral, structured tone
- Prefer principles over specific frameworks
- Avoid repeating SYSTEM_OVERVIEW verbatim
- Focus on analysis, boundaries, and decision-making

---

# FINAL INSTRUCTION

Produce **SYSTEM_ANALYSIS.md only**.
Do NOT explain how you generated it.