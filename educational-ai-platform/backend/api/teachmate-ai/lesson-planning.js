// TeachMate AI Lesson Planning Tools
//
// These functions encapsulate the lesson and medium‑term planning tools found
// within TeachMate AI. They currently return empty objects until the
// underlying logic has been implemented.

/**
 * Generate a detailed lesson plan for a given subject and year group.
 *
 * @param {String} subject - the subject of the lesson (e.g. 'English')
 * @param {String} year - year group (e.g. 'Year 5')
 * @param {Object} objectives - learning objectives aligned with curriculum
 * @param {Object} curriculum - curriculum standards or guidelines
 * @returns {Promise<Object>} lesson plan document
 */
function buildResponse(title, body) {
  return {
    title,
    body,
    createdAt: new Date().toISOString(),
  };
}

export const generateLessonPlan = async (subject, year, objectives, curriculum) => {
  const obj = Object.values(objectives).join(', ');
  const body = `Lesson plan for ${subject} (${year}) covering ${obj}. Curriculum links: ${Object.keys(curriculum).join(', ')}.`;
  return buildResponse('Lesson Plan', body);
};

/**
 * Create a medium term plan for a subject across a term.
 *
 * @param {String} subject - subject area
 * @param {String} term - term identifier (e.g. 'Autumn 1')
 * @param {Object} standards - curriculum standards to cover
 * @returns {Promise<Object>} medium term plan
 */
export const createMediumTermPlan = async (subject, term, standards) => {
  const body = `Medium term plan for ${subject} during ${term}. Standards: ${Object.keys(standards).join(', ')}.`;
  return buildResponse('Medium Term Plan', body);
};

/**
 * Generate an assembly plan including theme, age group and duration.
 *
 * @param {String} theme - theme of the assembly
 * @param {String} ageGroup - target age group
 * @param {Number} duration - duration in minutes
 * @returns {Promise<Object>} assembly plan
 */
export const generateAssemblyPlan = async (theme, ageGroup, duration) => {
  const body = `Assembly plan on ${theme} for ${ageGroup} lasting ${duration} minutes.`;
  return buildResponse('Assembly Plan', body);
};