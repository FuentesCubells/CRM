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
    console.log(rows)
    return rows[0];
}

async function getAllReservations() {
    const [rows] = await db.query('SELECT * FROM reservations');
    return rows;
}

async function updateReservationStatus(reservationId, reservation_code, status) {
    const [result] = await db.query('UPDATE reservations SET status = ? WHERE id = ? AND reservation_code = ?', [status, reservationId, reservation_code]);
    return result.affectedRows > 0;
}

async function changeReservationDates(reservationId, reservation_code, data) {
    const [result] = await db.query('UPDATE reservations SET check_in = ?, check_out = ?, total = ? WHERE id = ? AND reservation_code = ?', [data.check_in, data.check_out, data.total, reservationId, reservation_code]);
    return result.affectedRows > 0;
}

async function getUnavailableDates() {
    const [unavailableDates] = await db.query(`
    SELECT check_in, check_out
    FROM reservations
    WHERE status = 'confirmed'
  `);
    
    return unavailableDates;
}

module.exports = { save, update, erase, getClientReservations, getById, getAllReservations, getUnavailableDates, updateReservationStatus, changeReservationDates };

