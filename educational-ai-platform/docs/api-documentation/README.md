# API Documentation

This document summarises the features of the **SLT AI** and **TeachMate AI** platforms and outlines how they will be exposed via the unified API in this project. It also captures pricing information and integration considerations drawn from the official websites.

## SLT AI feature overview

SLT AI provides over 100 tools for senior leaders. Tools are organised into categories such as *School Improvement*, *Personnel*, *Management*, *Day‑to‑Day*, *Mental Health*, *Pupil Support* and *SEND*. Examples include:

* **Strategic planning tools** – generate long‑term strategic plans and action plans. For example the *3–5 Year Strategic Plan* tool helps leaders produce an overarching school improvement strategy【472307938149712†screenshot】. Another tool creates an *Accessibility Plan* tailored to the school context【472307938149712†screenshot】.
* **Behaviour and attendance tools** – create behaviour expectations and plans, produce attendance improvement plans and generate personalised *Pastoral Support Plans* for pupils【472307938149712†screenshot】.
* **Audit and compliance** – tools like the *Audit Action Plan Generator* allow users to upload RAG‑rated audits and receive a list of actions for improvement【472307938149712†screenshot】. Other tools generate risk assessments and GDPR documentation.
* **Documentation and communication** – the platform can produce meeting agendas and minutes, newsletters, letters, case studies and internal updates. It also offers a *PowerPoint Generator* to create presentations from text, a *Newsletter Writer* and a *Press Release* generator.
* **Governance and leadership support** – tools assist governors and headteachers with reports, strategic plans and recruitment. For example the platform generates governor biographies and questions, headteacher performance management reports and subject leader action plans.
* **Support for SEND and pupil voice** – there are tools to write *EHCP Pupil Plans*, *SEND Action Plans* and *Personal Emergency Evacuation Plans*. Others simplify documents for parents or pupils.

SLT AI offers subscription packages: individual monthly (£10 per month), individual annual (£95 per year) and team plans (small team 2–5 leaders at £85 per user per year, medium team 6–10 leaders at £75 per user per year). All plans provide unlimited access to all tools【174569121085586†L100-L157】.

## TeachMate AI feature overview

TeachMate AI offers more than 135 tools for teachers covering planning, resource creation, assessment, SEND support and leadership tasks. Key categories include:

* **Planning** – tools such as *Lesson Planner*, *Medium Term Topic Planner* and *Assembly Planner* generate lesson plans, medium term plans and assemblies. The *Help Me Write* and *Model Text Generator* tools support writing tasks.
* **Resource creation** – the platform generates worksheets, quizzes, knowledge organisers, flash cards, colouring sheets and more. Tools like *Worksheet Generator* and *Quiz Generator* let teachers specify topics and question types.
* **Assessment** – tools create exam questions, rubrics and exit tickets. Examples include the *Rubric Generator* and *Exit Ticket Generator*.
* **SEND & adaptation** – tools help differentiate text, generate one‑page pupil profiles and plan targeted interventions. An *IEP Writer* produces individual education plans.
* **Administration and reports** – the site includes tools for meeting notes, email responders, report writing, personal references and risk assessments【146197045184920†screenshot】.

TeachMate AI pricing includes individual subscriptions (Pro monthly at £6.99 per month or Pro annual at £6 per month billed annually) and whole‑school packages. Whole‑school pricing starts at **£395 per year for 10 accounts**, £645 per year for 20 accounts, £830 per year for 30 accounts and £1,260 per year for 50 accounts【660611906430064†L82-L116】. Features include access to all tools, CPD webinars, time‑saved tracking, curriculum‑specific content, a slideshow generator and the ability to save outputs to OneDrive or Google Drive【660611906430064†L82-L116】.

## Unified API surface

The unified API will expose functions that wrap the above tools. For example:

| Endpoint | Description |
|---|---|
| `POST /api/slt-tools/behaviour-plan` | Accepts `studentData` and `schoolPolicies` and returns a personalised behaviour plan. |
| `POST /api/slt-tools/attendance-plan` | Accepts attendance data and improvement targets; returns an attendance plan. |
| `POST /api/slt-tools/sip` | Generates a School Improvement Plan from school context and objectives. |
| `POST /api/teachmate-tools/lesson-plan` | Returns a detailed lesson plan given subject, year, objectives and curriculum. |
| `POST /api/teachmate-tools/worksheet` | Creates a worksheet based on topic, difficulty and format. |
| `POST /api/teachmate-tools/quiz` | Generates a quiz with specified question types. |
| `POST /api/teachmate-tools/assessment` | Produces exam questions, rubrics or exit tickets depending on parameters. |

See `/backend/api` for stub implementations of these functions. Real implementations will call the underlying AI services or integrate local models. Authentication, data formats and response structures are defined in the integration guides.

## Pricing and licence considerations

Both services are commercial. When integrating them into a unified platform, ensure that subscription terms allow programmatic access and that the number of seats covers all intended users. Pricing data indicates that whole‑school licences for TeachMate AI scale with the number of accounts, while SLT AI charges per leader. Budgeting should account for the combined costs of leadership and classroom tools【174569121085586†L100-L157】【660611906430064†L82-L116】.

## Data and authentication requirements

* **Data structures** – the back end should accept JSON objects matching the `schoolSchema` and `userRoleSchema` defined in `/backend/models`. These structures capture school context, policies, performance data and user roles.
* **Authentication** – the API will implement JWT‑based authentication with role‑based access control. User accounts will be stored in a database and cross‑referenced with `userRoleSchema` to determine permissions.
* **Security** – all endpoints must enforce SSL/TLS. Sensitive data such as pupil information must be processed in compliance with GDPR. Audit logging should record which user invokes each tool, along with inputs and outputs.

Refer to the integration guides for details on implementing these patterns.