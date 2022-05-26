const errorMiddleware = (error, res) => {
    return res.status(404).render('404');
};

module.exports = { errorMiddleware };
