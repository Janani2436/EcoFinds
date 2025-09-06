// utils/helpers.js

/**
 * Standardizes API JSON responses
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {Object} data - Data to send in response
 */
function sendResponse(res, statusCode, data) {
  return res.status(statusCode).json(data);
}

/**
 * Handles errors by setting a client-friendly message and status code
 * @param {Error} error - Original error
 * @param {number} statusCode - HTTP status code to return
 * @param {string} clientMessage - Safe message for client
 * @returns {Object} Augmented error with statusCode and clientMessage
 */
function createClientError(error, statusCode = 400, clientMessage = 'An error occurred') {
  error.statusCode = statusCode;
  error.clientMessage = clientMessage;
  return error;
}

/**
 * Generates a random string of given length (alphanumeric)
 * Useful for tokens, temp passwords etc.
 * @param {number} length 
 * @returns {string}
 */
function generateRandomString(length = 16) {
  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 36).toString(36))
    .join('');
}

module.exports = {
  sendResponse,
  createClientError,
  generateRandomString,
};
