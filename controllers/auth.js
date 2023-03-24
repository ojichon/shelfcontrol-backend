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
  const { username, password, name, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO "Users" (username, password, name, email) VALUES ($1, $2, $3, $4) RETURNING id', [username, hashedPassword, name, email]);
    const userId = result.rows[0].id;
    client.release();
    res.status(201).json({ success: true, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }
}

async function login(req, res) {
  console.log('login function called');
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, password FROM "Users" WHERE email = $1', [email]);
    const user = result.rows[0];
    client.release();

    if (!user) {
      console.log('User not found:', email);
      res.status(401).json({ success: false, message: 'Email or password is incorrect' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Incorrect password for user:', email);
      res.status(401).json({ success: false, message: 'Email or password is incorrect' });
      return;
    }

    console.log('User logged in:', email);
    res.status(200).json({ success: true, userId: user.id });
  } catch (error) {
    console.error('Error in login function:', error);
    res.status(500).json({ success: false, message: 'Failed to login', error: error.message });
  }
}

export { register, login };
