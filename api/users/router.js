const express = require('express');
const User = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    console.log('get endpoint');
})

router.post('/', async (req, res, next) => {
    console.log('post endpoint');
})

router.delete('/:user_id', async (req, res, next) => {
    console.log('delete endpoint');
})

module.exports = router;