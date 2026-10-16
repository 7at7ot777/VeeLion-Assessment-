const reportsService = require('../services/reports.service');

async function getTasksSummaryDeprecated(req, res) {
  const summary = await reportsService.getTasksSummary();
  res.status(200).json({ data: summary });
}

async function getTasksSummary(req, res) {
  const summary = await reportsService.getTasksSummary();
  res.status(200).json(summary);
}

module.exports = {
  getTasksSummary,
  getTasksSummaryDeprecated,
};