// Custom implementations of educational AI tools
//
// This module previously returned simple stub responses inspired by the
// functionality of SLT AI and TeachMate AI. The stubs have been replaced with
// functions that send prompts directly to the OpenAI ChatGPT API so the project
// can operate independently of those commercial services.

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Call the OpenAI Chat Completion API with a prompt describing the task.
 *
 * @param {string} prompt - The prompt to send to ChatGPT
 * @returns {Promise<string>} The generated text
 */
async function callChatGPT(prompt) {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an educational assistant generating documents for schools.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7
    })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ? data.error.message : 'OpenAI request failed');
  }
  return data.choices[0].message.content.trim();
}

/**
 * Helper used by many tools to return a consistent response structure.
 *
 * @param {String} title - name of the generated document
 * @param {String} body - body text of the document
 * @returns {Object}
 */
function buildResponse(title, body) {
  return {
    title,
    body,
    createdAt: new Date().toISOString()
  };
}

// Leadership and management tools
export const generateBehaviourSupportPlan = async ({ studentName, concerns }) => {
  const prompt = `Create a behaviour support plan for a pupil named ${studentName}. Concerns: ${concerns.join(', ')}. Include positive strategies, interventions and monitoring steps.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Behaviour Support Plan', body);
};

export const createAttendanceImprovementPlan = async ({ cohort, targets }) => {
  const prompt = `Write an attendance improvement plan for ${cohort}. Target attendance: ${targets.targetPercentage}%. Suggest engagement strategies and rewards.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Attendance Improvement Plan', body);
};

export const generateAccessibilityStrategy = async ({ schoolContext }) => {
  const prompt = `Draft an accessibility strategy for ${schoolContext.name}. Outline adjustments to ensure equal access for all pupils including physical adaptations and staff training.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Accessibility Strategy', body);
};

export const generateStrategicPlan = async ({ years, objectives }) => {
  const prompt = `Generate a ${years}-year strategic plan focusing on: ${objectives.join('; ')}. Provide key actions, timelines and success criteria.`;
  const body = await callChatGPT(prompt);
  return buildResponse(`${years}-Year Strategic Plan`, body);
};

export const generateRiskAssessmentReport = async ({ activity, hazards }) => {
  const prompt = `Create a risk assessment for ${activity}. Hazards: ${hazards.join(', ')}. Include mitigation measures and residual risk evaluation.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Risk Assessment Report', body);
};

export const createMeetingAgenda = async ({ meetingType, items }) => {
  const agendaItems = items.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
  const prompt = `Write a meeting agenda for a ${meetingType} meeting with the following items:\n${agendaItems}`;
  const body = await callChatGPT(prompt);
  return buildResponse('Meeting Agenda', body);
};

export const createNewsletter = async ({ audience, highlights }) => {
  const prompt = `Draft a short newsletter for ${audience} highlighting: ${highlights.join(', ')}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('School Newsletter', body);
};

export const generatePolicy = async ({ policyName, principles }) => {
  const prompt = `Write a ${policyName} policy. Guiding principles: ${principles.join(', ')}. Include key procedures and review cycles.`;
  const body = await callChatGPT(prompt);
  return buildResponse(`${policyName} Policy`, body);
};

export const generateGovernorProfile = async ({ governorName, background }) => {
  const prompt = `Create a short profile for school governor ${governorName} highlighting their background in ${background}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Governor Profile', body);
};

export const generateHeadteacherReport = async ({ term, achievements }) => {
  const prompt = `Write a headteacher report for the ${term} term highlighting achievements: ${achievements.join(', ')}. Include upcoming priorities and challenges.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Headteacher Report', body);
};

// Teaching and learning tools
export const createLessonPlan = async ({ subject, yearGroup, objectives, duration }) => {
  const prompt = `Create a ${duration} minute lesson plan for ${subject} (${yearGroup}). Objectives: ${objectives.join(', ')}. Include starter, main activity, differentiation and plenary.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Lesson Plan', body);
};

export const createMediumTermPlan = async ({ subject, term, topics }) => {
  const prompt = `Generate a medium term plan for ${subject} during ${term}. Cover topics: ${topics.join(', ')} with weekly learning goals and assessments.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Medium Term Plan', body);
};

export const generateAssemblyOutline = async ({ theme, ageGroup, keyMessages }) => {
  const prompt = `Create an assembly outline on the theme of ${theme} for ${ageGroup} pupils. Key messages: ${keyMessages.join(', ')}. Include introduction, main story and conclusion.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Assembly Outline', body);
};

export const generateWorksheet = async ({ topic, questions }) => {
  const questionList = questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n');
  const prompt = `Produce a worksheet on ${topic} with the following questions:\n${questionList}`;
  const body = await callChatGPT(prompt);
  return buildResponse('Worksheet', body);
};

export const generateQuiz = async ({ subject, quizQuestions }) => {
  const prompt = `Create a quiz for ${subject} with questions: ${quizQuestions.join(' | ')}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Quiz', body);
};

export const generateKnowledgeOrganiser = async ({ topic, facts }) => {
  const prompt = `Write a knowledge organiser for ${topic} including facts: ${facts.join(', ')}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Knowledge Organiser', body);
};

export const createRubric = async ({ assignment, criteria }) => {
  const prompt = `Create an assessment rubric for ${assignment}. Criteria: ${criteria.join(', ')}. Include descriptors for achievement levels.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Assessment Rubric', body);
};

export const generateExitTicket = async ({ lesson, reflectionQuestions }) => {
  const prompt = `Generate an exit ticket for a lesson on ${lesson}. Include reflection questions: ${reflectionQuestions.join('; ')}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Exit Ticket', body);
};

export const generateMathsProblems = async ({ topic, difficulty, count }) => {
  const prompt = `Create ${count} ${difficulty} maths problems on the topic of ${topic}. Include space for working and answers.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Maths Problems', body);
};

export const createScienceInvestigation = async ({ concept, ageGroup }) => {
  const prompt = `Outline a science investigation exploring ${concept} suitable for ${ageGroup}. Include hypothesis, materials, method and safety.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Science Investigation', body);
};

export const generateHistoryResource = async ({ period, topic, sourceTypes }) => {
  const prompt = `Create a history resource pack for the ${period} period on ${topic}. Include source types: ${sourceTypes.join(', ')}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('History Resource', body);
};