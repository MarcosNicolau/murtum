const LocalStrategy = require( 'passport-local' ).Strategy;
const User = require('../models/user-model');
const { compare } = require('bcrypt');


const passportLocalStrategy = passport => {
    passport.use(new LocalStrategy(async (username, password, done) => {
        const user = await User.findOne({ username });
        if(!user) return done(null, false, { message: 'Incorrect Fields.' });
        const isPasswordCorrect= await compare(password, user.password);
        if(!isPasswordCorrect) return done(null, false, { message: `Incorrect Fields.` });

        return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
  
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = passportLocalStrategy;