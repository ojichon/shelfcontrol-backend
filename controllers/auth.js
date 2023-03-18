const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "shelfcontrol",
  password: "",
  port: "5432",
});

async function register(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, hashedPassword]);
    const userId = result.rows[0].id;
    client.release();
    return { success: true, userId };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to register user' };
  }
}

async function login(username, password) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, password FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    client.release();

    if (!user) {
      return { success: false, message: 'Username or password is incorrect' };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { success: false, message: 'Username or password is incorrect' };
    }

    return { success: true, userId: user.id };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to login' };
  }
}

module.exports = { register, login };
