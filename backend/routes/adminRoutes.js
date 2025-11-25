// backend/routes/adminRoutes.js
const express = require('express');
const authenticate = require('../middleware/auth');
const ContactMessage = require('../models/ContactMessage');
const Document = require('../models/Document');
const GalleryItem = require('../models/GalleryItem');

const router = express.Router();

// All admin routes require authentication
router.use(authenticate);

// GET /api/admin/me - basic profile for token validation
router.get('/me', (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

// GET /api/admin/messages - list contact messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// POST /api/admin/gallery - create new gallery item
router.post('/gallery', async (req, res) => {
  const { title, category, imageUrl } = req.body;
  if (!title || !imageUrl) {
    return res.status(400).json({ message: 'Title and imageUrl are required' });
  }
  try {
    const item = await GalleryItem.create({ title, category, imageUrl });
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating gallery item' });
  }
});

// DELETE /api/admin/gallery/:id - delete gallery item
router.delete('/gallery/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await GalleryItem.findByIdAndDelete(id);
    res.json({ message: 'Gallery item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
});

// POST /api/admin/documents - add new document
router.post('/documents', async (req, res) => {
  const { title, type, year, url } = req.body;
  if (!title || !type || !url) {
    return res.status(400).json({ message: 'Title, type and url are required' });
  }
  try {
    const doc = await Document.create({ title, type, year, url });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating document' });
  }
});

// DELETE /api/admin/documents/:id - delete document
router.delete('/documents/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Document.findByIdAndDelete(id);
    res.json({ message: 'Document deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting document' });
  }
});

module.exports = router;