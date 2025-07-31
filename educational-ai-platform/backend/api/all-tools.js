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
        {
          role: 'system',
          content: `You are an educational assistant generating documents for schools. Use a friendly yet professional tone and format outputs with clear headings or bullet points. Keep responses under 800 words. Follow safeguarding and data privacy best practices, only using details provided. Do not offer legal or medical advice.`
        },
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
  const prompt = `Create a behaviour support plan for pupil ${studentName}. Concerns: ${concerns.join(', ')}.\n\nFormat using the sections:\n- Positive Strategies\n- Interventions\n- Monitoring\n\nUse bullet points and a supportive tone for teachers and families.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Behaviour Support Plan', body);
};

export const createAttendanceImprovementPlan = async ({ cohort, targets }) => {
  const prompt = `Write an attendance improvement plan for ${cohort}. Target attendance: ${targets.targetPercentage}%.\n\nInclude:\n- Engagement strategies for families\n- Incentives and rewards\n- Monitoring timeline.\nUse a clear, professional style.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Attendance Improvement Plan', body);
};

export const generateAccessibilityStrategy = async ({ schoolContext }) => {
  const prompt = `Draft an accessibility strategy for ${schoolContext.name}.\n\nProvide bullet points on physical adaptations, staff training and communication adjustments to ensure equal access for all pupils.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Accessibility Strategy', body);
};

export const generateStrategicPlan = async ({ years, objectives }) => {
  const prompt = `Generate a ${years}-year strategic plan focusing on: ${objectives.join('; ')}.\n\nStructure with yearly milestones, key actions and success criteria in bullet points.`;
  const body = await callChatGPT(prompt);
  return buildResponse(`${years}-Year Strategic Plan`, body);
};

export const generateRiskAssessmentReport = async ({ activity, hazards }) => {
  const prompt = `Create a risk assessment for ${activity}. Hazards: ${hazards.join(', ')}.\n\nList mitigation measures and evaluate residual risk under clear headings.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Risk Assessment Report', body);
};

export const createMeetingAgenda = async ({ meetingType, items }) => {
  const agendaItems = items.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
  const prompt = `Write a meeting agenda for a ${meetingType} meeting with the following items:\n${agendaItems}\n\nUse a numbered list and include expected timings if known.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Meeting Agenda', body);
};

export const createNewsletter = async ({ audience, highlights }) => {
  const prompt = `Draft a short newsletter for ${audience} highlighting: ${highlights.join(', ')}.\n\nOpen with a friendly greeting and keep paragraphs brief.`;
  const body = await callChatGPT(prompt);
  return buildResponse('School Newsletter', body);
};

export const generatePolicy = async ({ policyName, principles }) => {
  const prompt = `Write a ${policyName} policy. Guiding principles: ${principles.join(', ')}.\n\nInclude key procedures, responsibilities and review cycles using headings.`;
  const body = await callChatGPT(prompt);
  return buildResponse(`${policyName} Policy`, body);
};

export const generateGovernorProfile = async ({ governorName, background }) => {
  const prompt = `Create a short profile for school governor ${governorName} highlighting their background in ${background}.\nUse no more than two short paragraphs.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Governor Profile', body);
};

export const generateHeadteacherReport = async ({ term, achievements }) => {
  const prompt = `Write a headteacher report for the ${term} term.\n\nSections:\n- Achievements (${achievements.join(', ')})\n- Upcoming priorities\n- Key challenges.\nKeep the tone professional.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Headteacher Report', body);
};

// Teaching and learning tools
export const createLessonPlan = async ({ subject, yearGroup, objectives, duration }) => {
  const prompt = `Create a ${duration} minute lesson plan for ${subject} (${yearGroup}). Objectives: ${objectives.join(', ')}.\n\nUse headings for Starter, Main Activity, Differentiation and Plenary.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Lesson Plan', body);
};

export const createMediumTermPlan = async ({ subject, term, topics }) => {
  const prompt = `Generate a medium term plan for ${subject} during ${term}.\n\nList weekly topics (${topics.join(', ')}) with learning goals and suggested assessments.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Medium Term Plan', body);
};

export const generateAssemblyOutline = async ({ theme, ageGroup, keyMessages }) => {
  const prompt = `Create an assembly outline on the theme of ${theme} for ${ageGroup} pupils.\n\nInclude Introduction, Main Story and Conclusion sections highlighting: ${keyMessages.join(', ')}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Assembly Outline', body);
};

export const generateWorksheet = async ({ topic, questions }) => {
  const questionList = questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n');
  const prompt = `Produce a worksheet on ${topic}.\n\nProvide a short introduction and list the questions:\n${questionList}\n\nLeave space for answers.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Worksheet', body);
};

export const generateQuiz = async ({ subject, quizQuestions }) => {
  const prompt = `Create a quiz for ${subject} with the following questions: ${quizQuestions.join(' | ')}.\nList each question with multiple choice options labelled A-D.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Quiz', body);
};

export const generateKnowledgeOrganiser = async ({ topic, facts }) => {
  const prompt = `Write a knowledge organiser for ${topic}.\n\nInclude key facts in bullet points: ${facts.join(', ')}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Knowledge Organiser', body);
};

export const createRubric = async ({ assignment, criteria }) => {
  const prompt = `Create an assessment rubric for ${assignment}.\nCriteria: ${criteria.join(', ')}.\nProvide descriptors for each achievement level in a table.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Assessment Rubric', body);
};

export const generateExitTicket = async ({ lesson, reflectionQuestions }) => {
  const prompt = `Generate an exit ticket for a lesson on ${lesson}.\n\nList a few short reflection questions: ${reflectionQuestions.join('; ')}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Exit Ticket', body);
};

export const generateMathsProblems = async ({ topic, difficulty, count }) => {
  const prompt = `Create ${count} ${difficulty} maths problems on the topic of ${topic}.\nNumber each problem and leave space for working and answers.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Maths Problems', body);
};

export const createScienceInvestigation = async ({ concept, ageGroup }) => {
  const prompt = `Outline a science investigation exploring ${concept} suitable for ${ageGroup}.\n\nInclude sections for Hypothesis, Materials, Method and Safety.`;
  const body = await callChatGPT(prompt);
  return buildResponse('Science Investigation', body);
};

export const generateHistoryResource = async ({ period, topic, sourceTypes }) => {
  const prompt = `Create a history resource pack for the ${period} period on ${topic}.\n\nSummarise key information and include source types: ${sourceTypes.join(', ')}.`;
  const body = await callChatGPT(prompt);
  return buildResponse('History Resource', body);
};