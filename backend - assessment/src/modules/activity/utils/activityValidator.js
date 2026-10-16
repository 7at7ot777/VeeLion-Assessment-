const HttpError = require('../../../utils/httpError');

const ALLOWED_FIELDS = ['action', 'info'];

function validateCreateActivity(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new HttpError(400, 'Body must be a JSON object.');
  }

  const unknownFields = Object.keys(payload).filter(
    (field) => !ALLOWED_FIELDS.includes(field)
  );

  if (unknownFields.length > 0) {
    throw new HttpError(400, 'Body contains unsupported fields.', {
      unsupportedFields: unknownFields,
    });
  }

  if (typeof payload.action !== 'string') {
    throw new HttpError(400, '"action" is required and must be a string.');
  }

  const action = payload.action.trim();
  if (!action) {
    throw new HttpError(400, '"action" cannot be empty.');
  }

  const normalized = { action };
  if (Object.hasOwn(payload, 'info')) {
    normalized.info = payload.info;
  }

  return normalized;
}

module.exports = {
  validateCreateActivity,
};
