require("dotenv").config();
const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    console.log("INTENT");
    const token = req.header('x-access-token');


    // if()
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.secretKey);

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.log("expired");
            res.status(401).json({ message: "Unauthorized. Cookie expired", type: "expired" });

            // return attemptRenewal()

        }
        res.status(401).json({"type": "error", error:error})
    }
}
module.exports = {
    authMiddleware
}