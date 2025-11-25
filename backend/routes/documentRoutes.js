// backend/routes/documentRoutes.js
const express = require('express');
const Document = require('../models/Document');

const router = express.Router();

// GET /api/documents
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching documents' });
  }
});

module.exports = router;