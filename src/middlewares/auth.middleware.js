const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({ error: 'Token no proporcionado o formato incorrecto' });
    // }

    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // user info now available in req.user
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

function createToken(res, user) {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000 
    });
    return token;
}

function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }
    next();
}
function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado: se requiere rol de administrador' });
    }
    next();
}

module.exports = { authMiddleware, createToken, requireAuth, requireAdmin };
