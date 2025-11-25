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

// Seed endpoint (optional, remove/secure in production)
router.post('/seed', async (req, res) => {
  try {
    await Document.deleteMany({});
    const docs = await Document.insertMany([
      {
        title: 'School Code of Conduct 2024',
        type: 'policy',
        year: 2024,
        url: '/docs/code-of-conduct-2024.pdf',
      },
      {
        title: 'Admission Requirements',
        type: 'admission',
        url: '/docs/admission-requirements.pdf',
      },
      {
        title: 'School Fee Structure',
        type: 'fees',
        url: '/docs/fee-structure.pdf',
      },
      {
        title: 'Term Calendar 2024',
        type: 'calendar',
        year: 2024,
        url: '/docs/term-calendar-2024.pdf',
      },
    ]);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Error seeding documents' });
  }
});

module.exports = router;