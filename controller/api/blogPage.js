const router = require('express').Router();
const path = require('path');
const { BlogComment, BlogPost } = require('../../model');


router.get('/:id', async (req, res) => {
    try { 
        const id = req.params.id;
        const blogs = await BlogPost.findByPk(req.params.id, {
            include: [ { model: BlogComment} ],
        });

        const blogComments = await BlogComment.findByPk(req.params.blog_post_id, {
            include: [ { model: BlogPost} ],
        });

        if (!blogs) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }
        const blog = blogs.get({ plain: true });
        
        
        console.log('blog comments', blogComments);
        console.log('blog', blog);
        console.log('blog id', id);
        res.render('blog-page', { blog, id, blogComments });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
 };   
});

module.exports = router;