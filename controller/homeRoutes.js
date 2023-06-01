const router = require('express').Router()
const path = require('path');
const { BlogPost, User, BlogComment } = require('../model');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const signupConfirmation  = req.query.signupConfirmation === "true";

        const signedInUser = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });
        console.log('signed in user', signedInUser);
        

        const blogPost = await BlogPost.findAll({})      
        
        if(!blogPost) {
            res.status(404).json({message: 'No blogs found'})
            return;
        };

        if(req.session.loggedIn) {
            console.log('you are logged in' );
        } else {
            console.log('you are logged out');
        }

        res.render('home', { 
            blogPost,
            signupConfirmation,
            loggedIn: req.session.loggedIn,
            signedInUser
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

router.get('/dashboard', async (req, res) => {
    try {
        const signedInUser = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });
        
        const blogPost = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        
        if(!signedInUser) {
            res.status(404).json({message: 'No user found'})
            return;
        }

        if(!blogPost) {
            res.status(404).json({message: 'No blog found'})
            return;
        }

        console.log('users blog posts', blogPost)
               
        res.render('dashboard', { signedInUser, blogPost, loggedIn: req.session.loggedIn })
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/post-blog', withAuth, (req, res) => {
    res.render('post-blog');
});

router.get('/edit-blog/:id', async (req, res) => {
    try { 
        const blogPost = await BlogPost.findByPk(req.params.id);
        
        if(!blogPost) {
            res.status(404).json({message: 'No blog found'})
            return;
        }

        const blog = blogPost.get({ plain: true });
        console.log('blog', blog);

        res.render('edit-blog', { blog, loggedIn: req.session.loggedIn });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

    
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