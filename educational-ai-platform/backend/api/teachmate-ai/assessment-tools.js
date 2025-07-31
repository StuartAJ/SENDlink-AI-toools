// TeachMate AI Assessment Tools
//
// These stubs outline the API surface for creating exam questions, rubrics
// and exit tickets. Implementation will be added later.

/**
 * Generate exam questions tailored to a specific subject, level and format.
 *
 * @param {String} subject - subject area
 * @param {String} level - difficulty or curriculum level
 * @param {String} format - question format (e.g. 'multiple choice')
 * @returns {Promise<Object>} set of exam questions
 */
function buildResponse(title, body) {
  return {
    title,
    body,
    createdAt: new Date().toISOString(),
  };
}

export const generateExamQuestions = async (subject, level, format) => {
  const body = `Exam questions for ${subject} at ${level} level using ${format} format.`;
  return buildResponse('Exam Questions', body);
};

/**
 * Create an assessment rubric for an assignment with criteria and performance levels.
 *
 * @param {String} assignment - name or description of the assignment
 * @param {Array<String>} criteria - criteria by which to assess
 * @param {Array<String>} levels - performance levels (e.g. 'Emerging', 'Expected')
 * @returns {Promise<Object>} rubric document
 */
export const createRubric = async (assignment, criteria, levels) => {
  const body = `Rubric for ${assignment}. Criteria: ${criteria.join(', ')}. Levels: ${levels.join(', ')}.`;
  return buildResponse('Rubric', body);
};

/**
 * Generate an exit ticket for a lesson to assess pupil understanding.
 *
 * @param {String} lesson - identifier for the lesson
 * @param {Object} objectives - learning objectives assessed by the exit ticket
 * @returns {Promise<Object>} exit ticket
 */
export const generateExitTicket = async (lesson, objectives) => {
  const body = `Exit ticket for ${lesson} covering objectives: ${Object.keys(objectives).join(', ')}.`;
  return buildResponse('Exit Ticket', body);
};