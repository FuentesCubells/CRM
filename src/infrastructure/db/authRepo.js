const db = require('./mysql');


async function save(data) {
    const [result] = await db.query('INSERT INTO users SET ?', data);
    return result.insertId;
}

async function findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

async function updatePassword(userId, newHashedPassword) {
  const [result] = await db.execute(
    `UPDATE users SET password_hash = ? WHERE id = ?`,
    [newHashedPassword, userId]
  );

  if (result.affectedRows === 0) {
    throw new Error('No se pudo actualizar la contraseña');
  }

  return true;
}


module.exports = { save, findByEmail, updatePassword };