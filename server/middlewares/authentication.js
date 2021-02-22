const authentication = (req, res, next) => {
    if(!req.user) return res.status(401).send('/login');
    next();
};

module.exports = authentication;