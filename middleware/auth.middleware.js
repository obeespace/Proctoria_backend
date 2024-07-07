// middleware.js

// Logging Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// Authentication Middleware (Example)
const authenticate = (req, res, next) => {
    // Here you can add logic to check if a user is authenticated
    // For example, check if a valid token is present in headers
    const token = req.headers['authorization'];
    if (token) {
        // Verify token and proceed
        // If valid, call next()
        // If invalid, return an error response
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export { logger, authenticate };
