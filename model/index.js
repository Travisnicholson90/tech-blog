const BlogPost = require('./blogPost');
const User = require('./user');

// Create table associations
User.hasMany(BlogPost, {
    foreignKey: 'blog_user_id',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'blog_user_id',
});

module.exports = {
    User,
    BlogPost
};
