const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401).json({ sucess: false, message: 'Unauthorized' });
    try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET);
              req.userId = decoded.userId;
                next();
    } catch (error) {
        console.error(error.message);
       return res.sendStatus(403).json({ sucess: false, message: 'Forbidden' });
    }
}

module.exports = verifyToken;
