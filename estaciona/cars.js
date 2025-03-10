const express = require('express');
const router = express.Router();
const pool = require('../db');

// criar registro
router.post('/', async (req, res) => {
  try {
    const { model, license_plate } = req.body;
    const [result] = await pool.query(
      'INSERT INTO cars (model, license_plate) VALUES (?, ?)',
      [model, license_plate]
    );
    res.status(201).json({ id: result.insertId, model, license_plate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cars');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// atualizar registro
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { exit_time, status } = req.body;
    await pool.query(
      'UPDATE cars SET exit_time = ?, status = ? WHERE id = ?',
      [exit_time, status, id]
    );
    res.json({ message: 'Carro atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar registro
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM cars WHERE id = ?', [id]);
    res.json({ message: 'Carro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;