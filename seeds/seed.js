const sequelize = require('../config/connection');
const { User, BlogPost, BlogComment } = require('../model');

// require seed files
const userData = require('../seeds/userSeedData.json');
const blogPostData = require('../seeds/blogPostSeedData.json');
//const blogCommentData = require('./blogCommentSeeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true 
    });

    await BlogPost.bulkCreate(blogPostData, {
        individualHooks: true,
        returning: true 
    });

    // await BlogComment.bulkCreate(blogCommentData, {
    //     individualHooks: true,
    //     returning: true
    // });
    
    process.exit(0);
};

seedDatabase();



