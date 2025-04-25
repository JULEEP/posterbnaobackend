// models/Poster.js
import mongoose from 'mongoose';

const posterSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  categoryName: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 0
  },
  images: {
    type: [String], // Array of image URLs
    default: []
  },
  description: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    enum: ['A3', 'A4', 'A5', 'Custom'],
    default: 'A4'
  },
  festivalDate: {
    type: Date, // Store festival date as a Date object
  },
  inStock: {
    type: Boolean,
    default: true
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const Poster = mongoose.model('Poster', posterSchema);

export default Poster;
