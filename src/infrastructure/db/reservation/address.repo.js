const db = require('../mysql');

async function save(data) {
    const [result] = await db.query('INSERT INTO addresses SET ?', data);
    return result.insertId;
}

async function findByUserId(userId) {
    const [rows] = await db.query('SELECT * FROM addresses WHERE user_id = ?', [userId]);
    return rows[0];
}

module.exports = { save, findByUserId };