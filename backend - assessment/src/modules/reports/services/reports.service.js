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

  const doneCount = tasks.filter((task) => task.completed).length;
  const todoCount = total - doneCount;
  // Task rows only store boolean `completed`, there is no
  // `in-progress` state in the data, so it stays 0.
  const inProgressCount = 0; // task state is boolean, so it's either completed or to-do.

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