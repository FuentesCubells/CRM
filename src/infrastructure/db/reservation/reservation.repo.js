const db = require('../mysql');

async function save(data) {
    const [result] = await db.query('INSERT INTO reservations SET ?', data);
    return result.insertId;
}

module.exports = { save };

