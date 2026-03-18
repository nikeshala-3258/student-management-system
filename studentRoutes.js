const express = require('express');
const router = express.Router();

// Temporary test route
router.get('/test', (req, res) => {
    res.json({ message: 'Student routes working!' });
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const db = require('../config/database');
        const [rows] = await db.execute('SELECT * FROM students');
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

// Register new student
router.post('/register', async (req, res) => {
    try {
        const db = require('../config/database');
        const { first_name, last_name, address, date_of_birth, degree_program, email, phone } = req.body;
        
        // Generate student ID
        const year = new Date().getFullYear();
        const studentId = `KDU${year}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        
        // Insert into database
        await db.execute(
            'INSERT INTO students (student_id, first_name, last_name, address, date_of_birth, degree_program, email, phone, enrollment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE())',
            [studentId, first_name, last_name, address, date_of_birth, degree_program, email, phone]
        );
        
        res.json({
            success: true,
            message: 'Student registered successfully',
            studentId: studentId
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;