const mysql = require("mysql2/promise");

export const pool = mysql.createConnection({
  host: process.env.NEXT_DB_HOST,
  port: process.env.NEXT_DB_PORT,
  user: process.env.NEXT_DB_USER,
  password: process.env.NEXT_DB_PASSWORD,
  database: process.env.NEXT_DB_NAME,
  enableCleartextPlugin: true,
  ssl: false,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

export default pool;
