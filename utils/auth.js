const auth = (req, res, next) => {
    // if user is not logged in redirect to login page
    if(!req.session.loggedIn) {
        res.redirect('/login');
    // id the user is logged in continue with the request to the restricted route
    } else {
        next();
    }
};

module.exports = auth;