import mysql from 'mysql';

const pool = mysql.createPool({
  host: '192.168.50.89',
  user: 'happybonding_user',
  password: 'HappyBonding@123',
  database: 'happybonding',
  connectionLimit: 10
});

export default pool; 