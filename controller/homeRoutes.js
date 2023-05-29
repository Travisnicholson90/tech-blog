const router = require('express').Router()
const path = require('path');
const { BlogPost, User, BlogComment } = require('../model');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const signupConfirmation  = req.query.signupConfirmation === "true";

        const blogPost = await BlogPost.findAll({})      
        
        if(!blogPost) {
            res.status(404).json({message: 'No blogs found'})
            return;
        };

        res.render('home', { 
            blogPost,
            signupConfirmation,
            loggedIn: req.session.loggedIn
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/blogs', async (req, res) => {
    try {
        const blogPost = await BlogPost.findAll({})      
        
        if(!blogPost) {
            res.status(404).json({message: 'No blogs found'})
            return;
        }
        res.render('blog', { blogPost })
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
});

router.get('/post-blog', withAuth, (req, res) => {
    res.render('post-blog');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
    res.redirect('/');
});


module.exports = router;