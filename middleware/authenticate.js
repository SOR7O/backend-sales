require("dotenv").config();
const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    const token = req.header('x-access-token');
    console.log(token);
    if (!token) return res.status(401).json({message: 'Access denied'});    
    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        next();
    } catch (error) {
        res.status(400).json({message: "Unauthorized"});
    }
}

module.exports={
    authMiddleware
}