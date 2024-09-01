const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    // Get the token from the header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Split the Authorization header to extract the token
    const token = authHeader.split(' ')[1];

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'your_jwt_secret');
        console.log(decoded.userId);
        
        req.body = decoded.userId; // Add the user ID to the request object
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

