const db = require('../mysql');

async function save(data) {
    const [result] = await db.query('INSERT INTO addresses SET ?', data);
    return result.insertId;
}

async function update(user_id, data) {
    const [result] = await db.query('UPDATE addresses SET ? WHERE user_id = ?', [data, user_id]);
    return result.affectedRows > 0;
}

async function erase(user_id) {
    const [result] = await db.query('DELETE FROM addresses WHERE user_id = ?', [user_id]);
    return result.affectedRows > 0;
}

async function findByUserId(userId) {
    const [rows] = await db.query('SELECT * FROM addresses WHERE user_id = ?', [userId]);
    return rows[0];
}

module.exports = { save, update, erase, findByUserId };