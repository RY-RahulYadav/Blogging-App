const express = require('express');
const Blog = require('../model/blog');


const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { username, content } = req.body;
    const newBlog = new Blog({ username, content });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Failed to create blog entry' });
  }
});


router.put('/api/blogs/:id', async (req, res) => {
  try {
    const { username, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { username, content, date: Date.now() }, // Updates date automatically
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog entry' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog entry' });
  }
});


router.post('/get', async (req, res) => {
  try {
    const {username} = req.body;
    console.log(username);
    
    const blogs = await Blog.find({username});
    console.log(blogs)
    res.status(200).json({blogs});
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Failed to fetch blog entries' });
  }
});

router.get('/get/all', async (req, res) => {
  try {
   
    
    const blogs = await Blog.find();
   
    res.status(200).json({blogs});
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Failed to fetch blog entries' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog entry not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog entry' });
  }
});



module.exports = router;
