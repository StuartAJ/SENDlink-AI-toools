/*
 * ChatGPT-powered tool executor
 *
 * This module provides a generic way to execute tools using OpenAI’s
 * completion API. Each tool is defined with a prompt template and a form
 * schema describing the inputs required from the user. The `executeTool`
 * function takes the name of a tool and the form data, constructs a
 * prompt by injecting the data into the template and calls OpenAI to
 * generate a response.
 */

import { Configuration, OpenAIApi } from 'openai';

// Initialise OpenAI client using an API key stored in the environment.
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

/**
 * Call the OpenAI Chat Completion API with a given prompt.
 *
 * @param {string} prompt - Prompt to send to the model
 * @returns {Promise<string>} Generated text
 */
async function callOpenAI(prompt) {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an educational assistant generating documents for schools.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 800,
    temperature: 0.7
  });
  return response.data.choices[0].message.content.trim();
}

/**
 * Definitions for each tool. Each entry specifies a prompt template with
 * placeholders matching the keys of the form data, and a form schema
 * defining the fields required. The form schema can be used by
 * front‑end builders such as Lovable.dev to generate forms automatically.
 */
export const toolDefinitions = {
  behaviourSupportPlan: {
    prompt: (data) => {
      const { studentName, concerns } = data;
      return `Generate a behaviour support plan for a pupil.\n\nPupil name: ${studentName}\nBehaviour concerns: ${concerns.join(', ')}\n\nThe plan should outline positive strategies, interventions and monitoring procedures in a friendly and supportive tone.`;
    },
    form: [
      { name: 'studentName', label: 'Student Name', type: 'text', required: true },
      { name: 'concerns', label: 'Behaviour Concerns', type: 'tags', required: true }
    ]
  },
  attendanceImprovementPlan: {
    prompt: (data) => {
      const { cohort, currentAttendance, targetAttendance } = data;
      return `Create an attendance improvement plan for ${cohort}. Current attendance: ${currentAttendance}%. Target attendance: ${targetAttendance}%. Outline steps to engage families, incentives, monitoring and support.`;
    },
    form: [
      { name: 'cohort', label: 'Cohort (e.g. Year Group or Student)', type: 'text', required: true },
      { name: 'currentAttendance', label: 'Current Attendance (%)', type: 'number', required: true },
      { name: 'targetAttendance', label: 'Target Attendance (%)', type: 'number', required: true }
    ]
  },
  lessonPlan: {
    prompt: (data) => {
      const { subject, yearGroup, objectives, duration } = data;
      return `Design a detailed lesson plan for ${subject} (${yearGroup}). Learning objectives: ${objectives.join('; ')}. Duration: ${duration} minutes. Include a starter, main activity, differentiation and plenary.`;
    },
    form: [
      { name: 'subject', label: 'Subject', type: 'text', required: true },
      { name: 'yearGroup', label: 'Year Group', type: 'text', required: true },
      { name: 'objectives', label: 'Learning Objectives', type: 'tags', required: true },
      { name: 'duration', label: 'Duration (minutes)', type: 'number', required: true }
    ]
  },
  worksheet: {
    prompt: (data) => {
      const { topic, questionCount, difficulty } = data;
      return `Generate a worksheet for the topic "${topic}" with ${questionCount} questions. Difficulty: ${difficulty}. Provide clear questions and leave space for answers.`;
    },
    form: [
      { name: 'topic', label: 'Topic', type: 'text', required: true },
      { name: 'questionCount', label: 'Number of Questions', type: 'number', required: true },
      { name: 'difficulty', label: 'Difficulty Level', type: 'select', options: ['Easy', 'Medium', 'Hard'], required: true }
    ]
  },
  scienceInvestigation: {
    prompt: (data) => {
      const { concept, ageGroup } = data;
      return `Outline a science investigation for the concept of ${concept} suitable for ${ageGroup}. Include hypothesis, variables, materials, method, safety and expected outcomes.`;
    },
    form: [
      { name: 'concept', label: 'Scientific Concept', type: 'text', required: true },
      { name: 'ageGroup', label: 'Age Group', type: 'text', required: true }
    ]
  }
  // Additional tools can be added here following the same pattern
};

/**
 * Execute a tool by name using the provided form data.
 *
 * @param {string} toolName - Key from toolDefinitions
 * @param {Object} formData - Data collected from the user via the form
 * @returns {Promise<Object>} Response containing the generated text
 */
export async function executeTool(toolName, formData) {
  const definition = toolDefinitions[toolName];
  if (!definition) {
    throw new Error(`Tool not found: ${toolName}`);
  }
  const prompt = definition.prompt(formData);
  const output = await callOpenAI(prompt);
  return {
    title: toolName,
    content: output,
    generatedAt: new Date().toISOString()
  };
}