import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(401).json({
            success: false,
            msg: 'Access denied. No token provided.'
        });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error(error.message);
        return res.sendStatus(403).json({ success: false, msg: 'Forbidden' });
    }
}

export default verifyToken;
