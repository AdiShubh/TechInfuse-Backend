import Blog from "../models/blogModel.js";






export const createBlog = async (req, res) => {
    try {
      const { title, content, image, category, author, status } = req.body;
  
      const newBlog = new Blog({
        title,
        content,
        image,
        category,
        author,
        status
      });

     
  
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
      
    } catch (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  export const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 })
      .populate('author', 'name username profileImage'); 
      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Get Blog by ID
export const getBlogById = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id)
      .populate('author', 'name username profileImage');
      if (!blog) return res.status(404).json({ message: 'Blog not found' })
        
      res.status(200).json(blog);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

// Update Blog
export const updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedBlog)
        return res.status(404).json({ message: 'Blog not found' });
  
      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  // Delete Blog
  export const deleteBlog = async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog)
        return res.status(404).json({ message: 'Blog not found' });
  
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  // export const uploadBlogImage = async (req, res) => {
  //   if (!req.file) {
  //     return res.status(400).json({ error: 'No file uploaded' });
  //   }
  
  //   const imageUrl = `/uploads/${req.file.filename}`; // Relative path
  //   return res.status(200).json({ imageUrl });
  // }

  export const uploadBlogImage = async (req, res) => {
    // Check if the file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // Get the Cloudinary URL from the file object (it should be in req.file)
    const imageUrl = req.file.path; // The `path` contains the Cloudinary URL
  
    // Send the URL as the response
    return res.status(200).json({ imageUrl });
  };

  export const updateBlogStatus =async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const blog = await Blog.findByIdAndUpdate(id, { status }, { new: true });
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: "Failed to update status" });
    }
  }