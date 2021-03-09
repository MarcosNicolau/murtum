const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const passportLocalStrategy = require('./config/passport-config');
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/my-products-routes');
const cartRoutes = require('./routes/cart-routes');
const productsRoutes = require('./routes/products-routes');
const paymentRoutes = require('./routes/payment-routes');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();
const db = process.env.MONGODB_URI || process.env.DB;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session(session()));
passportLocalStrategy(passport);


mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => app.listen(PORT), console.log(`server listening on ${PORT}`))
.catch((err) => console.log(err));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

app.use('/my-products', userRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/payment', paymentRoutes);