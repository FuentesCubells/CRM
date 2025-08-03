const db = require('./mysql');

async function save(data) {
  const [result] = await db.execute(
    `INSERT INTO reservations 
     (first_name, email, phone, check_in, check_out, rate_per_night, room_id,
      address, country, city, state, zip, adults, children, created_at, total_price)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      data.first_name,
      data.email,
      data.phone,
      data.check_in,
      data.check_out,
      data.rate_per_night,
      data.room_id,
      data.address,
      data.country,
      data.city,
      data.state,
      data.zip,
      data.adults,
      data.children,
      data.created_at,
      data.total_price
    ]
  );
  return { id: result.insertId };
}

async function update(id, updatedFields) {
  const keys = Object.keys(updatedFields);
  const values = Object.values(updatedFields);

  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const sql = `UPDATE reservations SET ${setClause} WHERE id = ?`;

  await db.execute(sql, [...values, id]);
}

async function erase(id) {
  await db.execute(`DELETE FROM reservations WHERE id = ?`, [id]);
}

async function getAll(){
    const [result] = await db.execute('SELECT * FROM `reservations`');
    return result;
}

async function getById(id){
    const [result] = await db.execute( `SELECT * FROM reservations WHERE id = ?`, [id])
    return result;
}

module.exports = { getById, getAll, save, update, erase };
