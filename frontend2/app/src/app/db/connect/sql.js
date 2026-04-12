'use server'; 

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1', // The Proxy's default local address
  port: 3306,        // Ensure this matches the Proxy's listener port
  user: process.env.NEXT_DATABASE_USER,
  password: process.env.NEXT_DATABASE_PASSWORD,
  database: 'bakery',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL through Proxy!');
    connection.release();
  } catch (error) {
    console.error('Error connecting to MySQL through Proxy:', error);
  }
}

export default testConnection;