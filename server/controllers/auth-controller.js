const User = require('../models/user-model');
const passport = require('passport');

const { hash } = require('bcrypt');

const signIn_post = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(401).send('Complete the form please');

    const isUsernameTaken = await User.findOne({ username: username.toLowerCase() });
    if(isUsernameTaken) return res.status(400).send('Username already exists');
    
    const hashPassword = await hash(password, 12);
    const newUser = new User({
        username: username.toLowerCase(),
        password: hashPassword
    });
    await newUser.save();
    res.send('/log-in');
};

const login_post = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).send('Complete the form please');

    passport.authenticate('local', (err, user, message) => {
        if(message) return res.status(400).send(message.message);
        if(user) return req.logIn(user, () => res.send('/'));
    })(req, res);
}


module.exports = {
    signIn_post,
    login_post
};