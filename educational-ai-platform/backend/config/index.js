// Configuration
//
// Central configuration for the backend server. This module would
// typically export environment variables, database credentials and
// other settings. Here we provide a minimal placeholder.

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000
};