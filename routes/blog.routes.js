import express from 'express';

import {createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog,uploadBlogImage , updateBlogStatus} from '../controllers/blog.controller.js';
import protectMiddleware from '../middlewares/protectMiddleware.js';
import upload from '../middlewares/upload.js';




const router = express.Router();



router.post('/create',upload.single("image"), createBlog);
router.get('/all', getAllBlogs);
router.get('/single/:id', getBlogById);
router.put('/update/:id', protectMiddleware, updateBlog);
router.delete('/delete/:id', protectMiddleware, deleteBlog);
router.post("/uploadBlogImage",upload.single("image"), uploadBlogImage);
router.patch("/:id/status", updateBlogStatus);

export default router