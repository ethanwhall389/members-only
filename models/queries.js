const pool = require("./pool");

async function getAllMessages() {
  const query = {
    text: `
            SELECT * FROM Messages;
        `,
  };
  const { rows } = await pool.query(query);
  return rows;
}

async function getMessageById(id) {
  const query = {
    text: `
      SELECT * FROM Messages
      WHERE id = $1;
    `,
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
}

module.exports = {
  getAllMessages,
  getMessageById,
};
