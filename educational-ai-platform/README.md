# Educational AI Platform

This repository provides the foundations for a unified educational AI platform.  
It combines the leadership‑focused tools of **SLT AI** with the classroom and planning features of **TeachMate AI**.  
The structure laid out here separates backend logic, frontend components, data models and documentation, making it easier to extend the platform to suit your school’s context.

## Repository structure

```
educational-ai-platform/
├── backend/
│   ├── api/
│   │   ├── slt-ai/
│   │   │   ├── leadership-tools.js
│   │   │   ├── planning-tools.js
│   │   │   ├── compliance-tools.js
│   │   │   └── communication-tools.js
│   │   ├── teachmate-ai/
│   │   │   ├── lesson-planning.js
│   │   │   ├── resource-creation.js
│   │   │   ├── assessment-tools.js
│   │   │   └── subject-specific.js
│   │   └── integrations/
│   ├── models/
│   │   ├── schoolSchema.js
│   │   └── userRoleSchema.js
│   ├── middleware/
│   │   └── index.js
│   └── config/
│       └── index.js
├── frontend/
│   ├── components/
│   │   ├── slt-dashboard/
│   │   │   └── index.js
│   │   ├── teachmate-dashboard/
│   │   │   └── index.js
│   │   └── shared/
│   │       └── index.js
│   ├── pages/
│   │   └── index.js
│   └── utils/
│       └── index.js
├── data/
│   ├── school-schema/
│   │   └── README.md
│   ├── user-roles/
│   │   └── README.md
│   └── templates/
│       └── README.md
└── docs/
    ├── api-documentation/
    │   └── README.md
    ├── integration-guides/
    │   └── README.md
    └── deployment/
        └── README.md
```

Each folder contains either implementation code, configuration, data definitions or explanatory documentation.  
All of the JavaScript files are stubbed with asynchronous functions to make it straightforward to attach real AI models or external services later.