// School Information Schema
//
// This module defines a schema for representing school information. The
// structure is described using a plain JavaScript object. In a real
// implementation this would be replaced with Mongoose or another ORM
// definition.

/**
 * Schema for school information and performance data.
 */
export const schoolSchema = {
  schoolInfo: {
    name: 'String',
    type: 'String', // primary, secondary, special
    phase: 'String', // KS1, KS2, KS3, KS4, KS5
    ofstedRating: 'String',
    lastInspection: 'Date',
    pupilCount: 'Number',
    staffCount: 'Number'
  },
  policies: {
    behaviour: 'Object',
    safeguarding: 'Object',
    attendance: 'Object',
    curriculum: 'Object'
  },
  performance: {
    attainment: 'Object',
    progress: 'Object',
    attendance: 'Object',
    behaviour: 'Object'
  },
  context: {
    location: 'String',
    demographics: 'Object',
    disadvantaged: 'Number',
    sen: 'Number',
    eal: 'Number'
  }
};