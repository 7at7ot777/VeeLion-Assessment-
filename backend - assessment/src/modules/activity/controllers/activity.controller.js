const activityService = require('../services/activity.service');
const { validateCreateActivity } = require('../utils/activityValidator');

async function get_activity(req, res) {
  const activities = await activityService.getAllActivity();
  res.status(200).json(activities);
}

async function addActivity(req, res) {
  const bodyData = validateCreateActivity(req.body);
  const made = await activityService.createNewActivity(bodyData);
  res.status(201).json(made);
}

module.exports = {
  get_activity,
  addActivity,
};
