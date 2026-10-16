const { readJsonArray } = require('../../../utils/jsonStore');
const path = require('node:path');

const TASKS_FILE_PATH = path.join(process.cwd(), 'data', 'tasks.json');
const ACTIVITY_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

async function getTasksSummary() {
  const [tasks, activities] = await Promise.all([
    readJsonArray(TASKS_FILE_PATH),
    readJsonArray(ACTIVITY_FILE_PATH),
  ]);

  const total = tasks.length;

  const todoCount = tasks.filter(task => !task.completed).length;
  const doneCount = tasks.filter(task => task.completed).length;
  // In-progress count is not available from current data, set to 0
  const inProgressCount = 0;

  const recentActivityCount = activities.length;

  return {
    total,
    byStatus: {
      todo: todoCount,
      'in-progress': inProgressCount,
      done: doneCount,
    },
    recentActivityCount,
  };
}

module.exports = {
  getTasksSummary,
};