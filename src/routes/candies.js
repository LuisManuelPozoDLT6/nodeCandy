const { request } = require('express');
const express = require('express');
const { route } = require('.');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) =>{
    let listcandies = await pool.query('SELECT * FROM candies');
    res.json({
        status: 200,
        message: 'Se ha listado correctamente',
        listcandies: listcandies
    });
});

router.get('/:id', async (req, res) => {
    const{id} = req.params;
    let candy = await pool.query('SELECT * FROM candies WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado correctamente",
        candy: candy
    });
});

router.post('/create', async (req, res) =>{
    
    const {name, price, expiration, isSalad, date_created} = req.body;
    const candy = {
        name, price, expiration, isSalad, date_created, date_registered: Date(), status: 1
    };
    await pool.query('INSERT INTO candies set ?', [candy]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente", 
        candy: candy
    });
});

router.post('/update/:id', async (req, res) =>{
    const {id} = req.params;
    const {name, price, expiration, isSalad} = req.body;

    const candy = {name, price, expiration, isSalad};
    await pool.query('UPDATE candies SET ? WHERE id = ?', [candy, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        candy: candy
    });
});

router.post('/delete/:id', (req, res) =>{
    const {id} = req.params;
    pool.query('UPDATE candies SET status = 0 WHERE id= ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});

module.exports = router;