const router = require('express').Router();
const path = require('path');
const { User } = require('../../model');

router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    
    if(existingUser) {
        res.status(400).json({message: 'User already exists'});
        return;
    }
    //create new user
    const newUser = await User.create({
        first_name,
        last_name,
        email,
        username,
        password,
    });

    // set the login variable to true
        req.session.loggedIn = true;
    // set the user_id variable to the if of created user
        req.session.user_id = newUser.id;
    // set the username variable to the username of created user
        req.session.username = newUser.username;

        //save the session
        req.session.save(() => {
            res.redirect('/');
        }); 
    } catch (err) {
        if(err.name === 'SequelizeValidationError') {
            const validationError = err.errors.map((error) => error.message);
            return res.status(400).json({message: 'Validation error', errors: validationError});
        }
        res.status(500).json(err);
    }
});

module.exports = router;