const router = require('express').Router();
var bcypt = require('bcryptjs');
const { User } = require('../../model');

router.post('/', async (req, res) => {
    try {

        const { username, password } = req.body;
        console.log(username, password);
        
        const userData = await User.findOne({ where: { username: username } });
        if(!userData) {
            res.status(400).json({message: 'Incorrect username or password, please try again'});
            return;
        }
        const validPassword = await bcypt.compare(password, userData.password);
        if(!validPassword) {
            res.status(400).json({message: 'Incorrect username or password, please try again'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.status(200).json({user: userData, message: 'You are now logged in!'});
        }
        );
        
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;