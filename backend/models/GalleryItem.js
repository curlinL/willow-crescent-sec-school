// backend/models/GalleryItem.js
const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String }, // e.g. "Science Labs", "Sports Grounds"
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GalleryItem', galleryItemSchema);