const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? 'Error details are hidden in production' : err.stack,
    });
};

module.exports = { errorHandler };