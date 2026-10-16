const { createId } = require('../../../utils/id');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');
const path = require('node:path');

const FP = path.join(process.cwd(), 'data', 'activity.json');

async function getAllActivity() {
  return readJsonArray(FP);
}

async function createNewActivity(activityData) {
  const { action, info } = activityData;

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
