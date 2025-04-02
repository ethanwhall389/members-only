const { text } = require("express");
const pool = require("./pool");

async function getAllMessages() {
  const query = {
    text: `
            SELECT firstname, lastname, messages.id, user_id, title, body, timestamp FROM Messages
            INNER JOIN Users
              ON Messages.user_id = Users.id
            ORDER BY Timestamp ASC;
        `,
  };
  const { rows } = await pool.query(query);
  return rows;
}

async function getMessageAuthorId(messageId) {
  const query = {
    text: `
            SELECT user_id FROM Messages
            WHERE messages.id = $1
        `,
    values: [messageId],
  };
  const { rows } = await pool.query(query);
  return rows[0].user_id;
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

async function deleteMessageById(id) {
  const query = {
    text: `
      DELETE FROM Messages
      WHERE id = $1;
    `,
    values: [id],
  };
  await pool.query(query);
}

async function createMessage(title, body, userId) {
  const query = {
    text: `
      INSERT INTO Messages ("user_id", "title", "body")
      VALUES ($1, $2, $3);
    `,
    values: [userId, title, body],
  };
  await pool.query(query);
}

async function updateMessageById(title, body, id) {
  const query = {
    text: `
      UPDATE Messages
      SET title = $1, body = $2
      WHERE id = $3;
    `,
    values: [title, body, id],
  };
  await pool.query(query);
}

async function userExistsUsername(username) {
  const query = {
    text: `
      SELECT EXISTS (
        SELECT 1 FROM Users
        WHERE username = $1  
      );
    `,
    values: [username],
  };
  const { rows } = await pool.query(query);
  return rows[0];
}

async function getUserByUsername(username) {
  const query = {
    text: `
      SELECT * FROM Users
      WHERE "username" = $1;
    `,
    values: [username],
  };
  const { rows } = await pool.query(query);
  return rows[0];
}

async function getUserById(id) {
  const query = {
    text: `
      SELECT * FROM Users
      WHERE "id" = $1;
    `,
    values: [id],
  };
  const { rows } = await pool.query(query);
  return rows[0];
}

async function createUser(firstName, lastName, username, password, isAdmin) {
  const query = {
    text: `
      INSERT INTO Users ("firstname", "lastname", "username", "password", "is_admin", "is_member")
      VALUES ($1, $2, $3, $4, $5, FALSE);
    `,
    values: [firstName, lastName, username, password, isAdmin ? true : false],
  };
  await pool.query(query);
}

async function updateUserClubStatus(isMember, id) {
  console.log(`UserId: ${id}`);
  const query = {
    text: `
      UPDATE Users
      SET "is_member" = $1
      WHERE id = $2;
    `,
    values: [isMember, id],
  };
  await pool.query(query);
}

async function getClubById(id) {
  const query = {
    text: `
      SELECT * FROM Clubs
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
  deleteMessageById,
  createMessage,
  updateMessageById,
  createUser,
  userExistsUsername,
  getUserByUsername,
  getUserById,
  getClubById,
  updateUserClubStatus,
  getMessageAuthorId,
};
