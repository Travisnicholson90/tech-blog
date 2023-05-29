const path = require('path');
const router = require('express').Router();
const postComment = require('./post-comment');
const blogPage = require('./blogPage');
const signup = require('./signup');
const login = require('./login');

router.use('/post-comment', postComment);
router.use('/blog-page', blogPage);
router.use('/signup', signup);
router.use('/login', login);

module.exports = router;