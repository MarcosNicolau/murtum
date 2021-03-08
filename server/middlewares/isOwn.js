const isOwn = (req, res, next) => {
    if(req.user.id !== req.body.id) return res.status(401).send('/');
    next();
};

module.exports = isOwn;