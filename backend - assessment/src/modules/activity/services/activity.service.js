const { createId } = require('../../../utils/id');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');
const path = require('node:path');

const activityLogDirectory = path.join(process.cwd(), 'data', 'activity.json');

async function getAllActivity() {
  return readJsonArray(activityLogDirectory);
}

async function createNewActivity(activityData) {
  const { action, info } = activityData;

  const activities = await readJsonArray(activityLogDirectory);
  const newActivity = {
    id: createId(),
    action,
    info,
    when: new Date().toISOString(),
  };

  activities.push(newActivity);
  await writeJsonArray(activityLogDirectory, activities);

  return newActivity;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
