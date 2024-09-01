const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  username: { type: String, required: true }, // e.g., "ry"
  date: { type: Date, default: Date.now }, // Automatically sets the date
  content: [
    {
      ContenType: { type: String }, // e.g., "image"
      data: { type: String }, // e.g., image URL or base64 data
    }
  ]
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
