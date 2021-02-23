const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalStrategy = require('./config/passport-config');
const authRoutes = require('./routes/auth-routes');
const productsRoutes = require('./routes/products-routes');
require('dotenv').config();

const PORT = process.env.PORT || '8080';
const app = express();
const db = process.env.DB;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session(session()));
passportLocalStrategy(passport);


mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => app.listen(PORT), console.log(`server listening on ${PORT}`))
    .catch((err) => console.log(err));


app.use('/auth', authRoutes);
app.use('/products', productsRoutes);