const reportsService = require('../services/reports.service');
const asyncHandler = require('../../../middleware/asyncHandler');

async function getTasksSummary(req, res) {
  const summary = await reportsService.getTasksSummary();
  res.status(200).json({ data: summary });
}

module.exports = {
  getTasksSummary: asyncHandler(getTasksSummary),
};