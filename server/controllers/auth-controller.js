const User = require('../models/user-model');
const passport = require('passport');
const { hash } = require('bcrypt');

const isUserConnected_get = (req, res) => {
    const user = req.user;
    if(!user) return res.status(401).send('/login');
    res.send({ username: user.username, id: user._id });
}

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
        if(user) return req.logIn(user, err => {
            if(err) return console.log(err);
            res.send('/');
        });
    })(req, res);
}


module.exports = {
    isUserConnected_get,
    signIn_post,
    login_post
};