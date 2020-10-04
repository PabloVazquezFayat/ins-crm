const express = require('express');
const router = express.Router();

const accountCreate = require('../controllers/account-controllers/account-create');
const accountRead = require('../controllers/account-controllers/account-read');

//GET ACOUNT CREATE
router.post('/account/create', accountCreate);

//GET ACCOUNT READ
router.get('/account/read/:id', accountRead);

module.exports = router;
