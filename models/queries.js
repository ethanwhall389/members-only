const pool = require("./pool");

async function queryDB(param) {
  const query = {
    text: `
            SQL QUERY;
        `,
    values: [param],
  };
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  queryDB,
};
