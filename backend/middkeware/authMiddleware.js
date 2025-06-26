const jwt = require('jsonwebtoken')
//this code defines an express middleware function call protect
//the middleware first attempts to extract a token from the Authorization header of the incoming HTTP request.
// It expects the header to be in the format Bearer <token>, so it splits the header value by a space and takes the second part as the token
//
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Unauthorized'});// If no token is found, it immediately responds with a 401 Unauthorized status and a relevant message.

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);//If a token is present, the middleware tries to verify it using the jsonwebtoken library and a secret key stored in the environment variable 
        console.log(decode)
        req.user = decode;
        next();
        // If verification succeeds, the decoded token payload is attached to the req.user property, making user information available to subsequent middleware or route handlers.
    } catch {
        res.status(401).json({ message:'Invalid token'})

        // If verification fails (for example, if the token is invalid or expired), the middleware catches the error and responds with a 401 status and an "Invalid token" message.
    }
};

module.exports = protect;