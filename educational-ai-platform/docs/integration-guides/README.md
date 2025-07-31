# Integration Guide

This guide describes how to integrate the SLT AI and TeachMate AI tool suites into a unified educational platform. It covers API patterns, authentication, data binding and best practices for connecting the front end to the back end.

## API patterns

The platform exposes RESTful endpoints under `/api` which wrap individual tools. Endpoints follow these conventions:

* **HTTP verbs** – `GET` retrieves data, `POST` executes a tool or creates resources, `PUT` updates existing data and `DELETE` removes data where applicable.
* **Resource names** – endpoints are grouped by function, e.g. `/api/slt-tools/:toolName` for SLT AI and `/api/teachmate-tools/:toolName` for TeachMate AI. Tool names correspond to the exported functions in `/backend/api`.
* **Request and response formats** – requests accept JSON bodies aligned with the schemas defined in `/backend/models`. Responses return a JSON object containing a `data` field (the generated document or plan), plus metadata such as timestamps, user ID and tool used.

Example call to generate a lesson plan:

```http
POST /api/teachmate-tools/lesson-plan
Content-Type: application/json
Authorization: Bearer <JWT>

{
  "subject": "Mathematics",
  "year": "Year 6",
  "objectives": { "fractions": true },
  "curriculum": { "national": "UK KS2" }
}
```

The server validates the JWT, checks that the user has `all_teachmate_tools` permission and then calls `generateLessonPlan()` from `/backend/api/teachmate-ai/lesson-planning.js`. The result is returned as JSON.

## Authentication and authorisation

Authentication uses JWT tokens issued by the `/api/users/authenticate` endpoint. After login, the front end stores the token and includes it in the `Authorization` header on each request. Middleware reads the token, verifies its signature and retrieves the user’s role. Permissions are defined in `userRoleSchema` and enforced per endpoint.

User management endpoints:

* `GET /api/users/:role` – list users by role.
* `POST /api/users/authenticate` – verify credentials and issue a JWT.
* `GET /api/users/:id/permissions` – return permission list for a user.

For example, only users with the `all_slt_tools` permission can access SLT AI endpoints, while teachers require `all_teachmate_tools`.

## School data integration

School context and performance data are stored according to the `schoolSchema`. Endpoints allow retrieval and update of this information:

* `GET /api/school/profile` – returns the school’s profile including name, type, phase and demographic context.
* `PUT /api/school/profile` – updates the profile. Only headteachers or deputies may call this.
* `GET /api/school/performance` – returns attainment, progress, attendance and behaviour data.
* `POST /api/school/policies` – updates policies such as behaviour or safeguarding.

When tools require school data (e.g. generating a behaviour plan), the back end fetches the relevant fields and supplies them to the tool functions.

## Front‑end integration

The front end, developed by Lovable.dev, should connect to the API using the configuration below:

```javascript
// API Configuration
const API_BASE_URL = 'https://your-domain.com/api';
const SCHOOL_ID = 'your-school-id';

// Authentication Setup
const authConfig = {
  method: 'JWT',
  endpoints: {
    login: '/api/users/authenticate',
    refresh: '/api/auth/refresh',
    profile: '/api/auth/profile'
  }
};

// School Data Binding
const schoolDataConfig = {
  profile: '/api/school/profile',
  performance: '/api/school/performance',
  users: '/api/users',
  tools: '/api/tools'
};
```

Using this configuration, dashboard components can fetch and display school information, user accounts and tool usage statistics. Lovable.dev components should handle loading states and error conditions gracefully.

## Best practices

* **Role‑based UI** – only show tools and data relevant to the user’s role. For example, teachers should not see SLT AI compliance tools.
* **Data minimisation** – fetch only the data needed for each operation to minimise risk and improve performance.
* **Accessibility** – ensure components meet WCAG 2.1 standards. Provide keyboard navigation and screen reader labels.
* **Security** – use HTTPS for all requests, sanitise inputs, enforce strong passwords and implement regular security audits.
* **Performance** – cache static data where appropriate (e.g. curriculum standards), lazy‑load heavy components and use pagination for large lists.

Adhering to these patterns will ensure that the unified platform remains secure, performant and easy to use for all roles.