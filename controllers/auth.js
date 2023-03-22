import pkg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shelfcontrol',
  password: '',
  port: 5432,
});

async function register(req, res) {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, hashedPassword]);
    const userId = result.rows[0].id;
    client.release();
    res.status(201).json({ success: true, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, password FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    client.release();

    if (!user) {
      res.status(401).json({ success: false, message: 'Username or password is incorrect' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Username or password is incorrect' });
      return;
    }

    res.status(200).json({ success: true, userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
}

export { register, login };
