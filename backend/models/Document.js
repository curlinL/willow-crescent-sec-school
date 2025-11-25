// backend/models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['policy', 'fees', 'admission', 'calendar'], required: true },
    year: { type: Number },
    url: { type: String, required: true }, // link to pdf on server or external
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);