const router = require('express').Router();
const path = require('path');
const { BlogComment, BlogPost, User } = require('../../model');

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const { 
            blog_title,
            blog_content
        } = req.body;

        //update the blog post
        const updatedBlogPost = await BlogPost.update(
            {
                blog_title,
                blog_content
            },
            {
                where: {
                    id: id
                }
            }
        );

        //check if rows were updated
        if (updatedBlogPost[0] === 0) {
            res.status(404).json({ message: 'No blog post found with this id' });
            return;
        };

        const blogPost = await BlogPost.findByPk(id);
        res.status(200).json(blogPost);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update blog post' });
    }
});

module.exports = router;