const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado o formato incorrecto' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // user info now available in req.user
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

function createToken(user) {
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    return token;
}

function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }
    next();
}

module.exports = { authMiddleware, requireAuth, createToken };
