const BlogPost = require('./blogPost');
const User = require('./user');
const BlogComment = require('./blogComment');

// Create table associations
User.hasMany(BlogPost, {
    foreignKey: 'blog_user_id',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

// Create the association
BlogPost.hasMany(BlogComment, {
    foreignKey: 'blog_post_id',
    onDelete: 'CASCADE'
});

BlogComment.belongsTo(BlogPost, {
    foreignKey: 'blog_post_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    BlogPost,
    BlogComment
};
