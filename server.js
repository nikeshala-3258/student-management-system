const express = require('express');
const app = express();

// SIMPLE TEST ROUTES
app.get('/test', (req, res) => {
    res.send('✅ Test route is working on port 5001!');
});

app.get('/add-test', (req, res) => {
    res.send('✅ Add test route is working on port 5001!');
});

app.get('/view-students', (req, res) => {
    res.send('✅ View students route is working on port 5001!');
});

app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Server is Running on Port 5001!</h1>
        <ul>
            <li><a href="/test">Test Route</a></li>
            <li><a href="/add-test">Add Test Student</a></li>
            <li><a href="/view-students">View Students</a></li>
        </ul>
    `);
});

// USING PORT 5001 INSTEAD OF 5000
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📍 Test: http://localhost:${PORT}/test`);
    console.log(`📍 Add test: http://localhost:${PORT}/add-test`);
    console.log(`📍 View: http://localhost:${PORT}/view-students`);
});