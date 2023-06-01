const router = require('express').Router();
const path = require('path');
const { BlogComment, BlogPost, User } = require('../../model');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    try { 
        const id = req.params.id;
        const blogs = await BlogPost.findByPk(req.params.id, {
            include: [ { model: BlogComment} ],
        });

        const blogAuthor = await BlogPost.findByPk(req.params.id, {
            include: [ { model: User} ],
        });
        
        const blogComments = await BlogComment.findByPk(req.params.blog_post_id, {
            include: [ { model: BlogPost} ],
        });

        if (!blogs) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        if(!blogAuthor) {
            res.status(404).json({ message: 'No author found with this id!' });
            return;
        }

        const blog = blogs.get({ plain: true });
        const author = blogAuthor.get({ plain: true });
        console.log('blog author', author);
        
        res.render('blog-page', { blog, id, blogComments, author, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
 };   
});

module.exports = router;