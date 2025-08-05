const db = require('../mysql');

async function save(data) {
    const [result] = await db.query('INSERT INTO reservations SET ?', data);
    return result.insertId;
}

async function getClientReservations(clientId) {
    const [rows] = await db.query('SELECT * FROM reservations WHERE user_id = ?', [clientId]);
    return rows;
}

async function getById(id) {
    const [rows] = await db.query('SELECT * FROM reservations WHERE id = ?', [id]);
    return rows[0];
}

module.exports = { save, getClientReservations, getById };

