//THE PURPOSE of this file is for quickly and easily setting up the local development
//   database for multiple developers when they join the project, or for resetting the
//   database during development for dev, testing, or other purposes.

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "username" VARCHAR (255),
        "firstname" VARCHAR (255),
        "lastname"  VARCHAR (255),
        "password" VARCHAR (255),
        "is_member" BOOLEAN,
        "is_admin" BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS Messages (
        "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "user_id" INTEGER REFERENCES Users(id)
            ON DELETE CASCADE,
        "title" VARCHAR(255),
        "body" TEXT,
        "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        
    );

    INSERT INTO Users ("username", "firstname", "lastname", "password", "is_member", "is_admin")
    VALUES
        ('ethanwhall', 'Ethan', 'Hall', '12345', FALSE, FALSE),
        ('ering2020', 'Erin', 'Hall', '678910', TRUE, TRUE);

    INSERT INTO Messages ("user_id", "title", "body")
    VALUES
        (1, 'Hello, world!', 'Hi everyone! so glad to be here writing this message!'),
        (2, 'Hi everyone!!', 'This seems like a pretty cool place!');
`;

async function seed() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    client_encoding: "UTF8",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done seeding!");
}

seed();
