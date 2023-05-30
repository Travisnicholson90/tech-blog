const router = require('express').Router();
const { BlogPost, User, BlogComment } = require('../../model');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const { blogTitle, blogContent } = req.body;
        
        const blog = {
            blog_title: blogTitle,
            blog_content: blogContent,
        };

        console.log(blog);     

        const newBlogPost = await BlogPost.create({
            blog_title: blogTitle,
            blog_content: blogContent,
            user_id: req.session.user_id,
            blog_post_id: req.session.user_id,
        });
    
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    
});

module.exports = router;