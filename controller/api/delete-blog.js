const router = require('express').Router();
const path = require('path');
const { BlogPost, User } = require('../../model');
const withAuth = require('../../utils/auth');
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const blogData = await BlogPost.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;