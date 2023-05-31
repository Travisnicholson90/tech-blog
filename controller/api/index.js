const path = require('path');
const router = require('express').Router();
const postComment = require('./post-comment');
const blogPage = require('./blogPage');
const signup = require('./signup');
const login = require('./login');
const postBlog = require('./postBlog');
const deleteBlog = require('./delete-blog');


router.use('/post-comment', postComment);
router.use('/post-blog', postBlog);
router.use('/blog-page', blogPage);
router.use('/signup', signup);
router.use('/login', login);
router.use('/delete-blog', deleteBlog);

module.exports = router;