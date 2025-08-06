const db = require('../mysql');

async function save(data) {
    const [result] = await db.query('INSERT INTO reservations SET ?', data);
    return result.insertId;
}

async function update(reservation_id, user_id, data) {
    const [result] = await db.query('UPDATE reservations SET ? WHERE id = ? AND user_id = ?', [data, reservation_id, user_id]);
    return result.affectedRows > 0;
}

async function getClientReservations(clientId) {
    const [rows] = await db.query('SELECT * FROM reservations WHERE user_id = ?', [clientId]);
    return rows;
}

async function getById(user_id, reservationId) {
    const [rows] = await db.query('SELECT * FROM reservations WHERE id = ? AND user_id = ?', [reservationId, user_id]);
    return rows[0];
}

module.exports = { save, update, getClientReservations, getById };

