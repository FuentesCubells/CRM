const db = require('../mysql');

async function save(data) {
    const [result] = await db.query('INSERT INTO reservations SET ?', data);
    return result.insertId;
}

async function update(reservation_id, user_id, data) {
    const [result] = await db.query('UPDATE reservations SET ? WHERE id = ? AND user_id = ?', [data, reservation_id, user_id]);
    return result.affectedRows > 0;
}

async function erase(reservation_id, user_id) {
    const [result] = await db.query('DELETE FROM reservations WHERE id = ? AND user_id = ?', [reservation_id, user_id]);
    return result.affectedRows > 0;
}

async function getClientReservations(clientId) {
    const [rows] = await db.query('SELECT * FROM reservations WHERE user_id = ?', [clientId]);
    return rows;
}

async function getById(user_id, reservationId, reservation_code) {
    const [rows] = await db.query('SELECT * FROM reservations WHERE id = ? AND user_id = ? AND reservation_code = ?', [reservationId, user_id, reservation_code]);
    return rows[0];
}

async function getAllReservations() {
    const [rows] = await db.query('SELECT * FROM reservations');
    return rows;
}

module.exports = { save, update, erase, getClientReservations, getById, getAllReservations };

