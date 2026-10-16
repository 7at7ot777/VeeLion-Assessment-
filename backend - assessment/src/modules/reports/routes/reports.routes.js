const express = require('express');
const asyncHandler = require('../../../middleware/asyncHandler');

const reportsController = require('../controllers/reports.controller');

const reportsRouter = express.Router();

reportsRouter.get(
  '/tasks-summary',
  asyncHandler(reportsController.getTasksSummary)
);

// Deprecated alias, kept so existing `GET /reports` callers keep working.
reportsRouter.get('/', asyncHandler(reportsController.getTasksSummaryDeprecated));

module.exports = reportsRouter;