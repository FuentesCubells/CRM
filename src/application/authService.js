const Auth = require('../domain/auth');
const authRepo = require('../infrastructure/db/authRepo');
const bcrypt = require('bcryptjs');

async function registerUser(data) {

    const hashedPassword = await hashPassword(data.password);
    if (!hashedPassword) {
        throw new Error('Error hashing password');
    }
    data.password = hashedPassword;

    const auth = new Auth(data);
    return await authRepo.save(auth);
}

async function loginUser(data) {

    const { username, password } = data;
    const user = await authRepo.findByEmail(username);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    return {username: user.email, id: user.id, role: user.role};
}

async function changePassword(data) {
    const { userId, username, password, newPassword } = data;

    if (!userId || !username || !password || !newPassword) {
        throw new Error('Faltan datos obligatorios');
    }

    const user = await authRepo.findByEmail(username);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    if (user.id !== userId) {
        throw new Error('Datos de usuario no coinciden');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    const newHashedPassword = await hashPassword(newPassword);
    if (!newHashedPassword) {
        throw new Error('Error al hashear la nueva contraseña');
    }

    await authRepo.updatePassword(user.id, newHashedPassword);
    return { message: 'Contraseña actualizada correctamente' };
}


async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}


module.exports = { registerUser, loginUser, changePassword };