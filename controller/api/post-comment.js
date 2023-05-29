const router = require('express').Router();
const path = require('path');
const { BlogComment, BlogPost, User } = require('../../model');
const withAuth = require('../../utils/auth');

router.post('/comments/:id', withAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, username } = req.body;

        console.log(comment, username, id);

        // Find associated blog post
        const blogPost = await BlogPost.findByPk(id);

        if (!blogPost) {
            res.status(404).json({ message: 'Blog post not found' });
            return;
        }

        const postComment = await BlogComment.create({
            comment,
            username,
            blog_post_id: blogPost.id, // Set the correct blog_post_id value from the associated blog post
        });

        res.status(200).json(postComment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;
