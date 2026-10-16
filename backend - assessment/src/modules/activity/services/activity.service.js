const { createId } = require('../../../utils/id');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');
const path = require('node:path');

const FP = path.join(process.cwd(), 'data', 'activity.json');

async function getAllActivity() {
  return readJsonArray(FP);
}

async function createNewActivity(activityData) {
  // Validate action
  if (typeof activityData.action !== 'string') {
    throw new Error('Action must be a string');
  }
  const action = activityData.action.trim();
  if (!action) {
    throw new Error('Action cannot be empty');
  }

  // Info is optional, can be any type (we'll store as is)
  const info = activityData.info;

  const activities = await readJsonArray(FP);
  const newActivity = {
    id: createId(),
    action,
    info,
    when: new Date().toISOString(),
  };

  activities.push(newActivity);
  await writeJsonArray(FP, activities);

  return newActivity;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
