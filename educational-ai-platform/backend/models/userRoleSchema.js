// User Roles Schema
//
// This module defines a simple schema for role‑based permissions within
// the educational AI platform. Each role specifies its permitted actions
// and the dashboard that should be displayed to the user.

export const userRoleSchema = {
  headteacher: {
    permissions: ['all_slt_tools', 'school_data_access'],
    dashboard: 'leadership_overview'
  },
  deputy: {
    permissions: ['strategic_planning', 'staff_management'],
    dashboard: 'leadership_focused'
  },
  teacher: {
    permissions: ['all_teachmate_tools', 'student_data_access'],
    dashboard: 'teaching_focused'
  },
  subject_leader: {
    permissions: ['subject_tools', 'department_data'],
    dashboard: 'subject_leadership'
  }
};