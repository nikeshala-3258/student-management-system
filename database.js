const mysql = require('mysql2');
require('dotenv').config();

// Create connection to MySQL using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'student_management',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:');
        console.error('Error details:', err.message);
        console.error('Please check:');
        console.error('1. MySQL Workbench is running');
        console.error('2. Your .env file has correct credentials');
        console.error('3. Database "student_management" exists');
    } else {
        console.log('✅ Connected to MySQL database successfully!');
        connection.release();
    }
});

module.exports = pool.promise();