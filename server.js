const express = require('express');
const { Pool } = require('pg');
const app = express();

// Serve static frontend files
app.use(express.static('public'));

// Parse JSON body
app.use(express.json());



const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

app.get('/', async(req, res) => {
    await pool.query('INSERT INTO hits DEFAULT VALUES');
    const result = await pool.query('SELECT COUNT(*) FROM hits');
    res.json({total_hits:
        result.rows[0].count });
    });


// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB error' });
    }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const { title } = req.body;
        const result = await pool.query(
            'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
            [title]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB error' });
    }
});

// Mark task as completed
app.put('/api/tasks/:id/complete', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'UPDATE tasks SET completed = TRUE WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB error' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'DB error' });
    }
});

   
app.listen(3000, '0.0.0.0', () => {
  console.log("Node app running on port 3000");
});