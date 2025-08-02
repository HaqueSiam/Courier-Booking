// === File: server/middleware/errorHandler.js ===
exports.errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};