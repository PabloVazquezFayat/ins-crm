const express = require('express');
const router = express.Router();

const accountCreate = require('../controllers/account-controllers/account-create');
const accountRead = require('../controllers/account-controllers/account-read');
const accountUpdate = require('../controllers/account-controllers/account-update');
const accountDelete = require('../controllers/account-controllers/account-delete');

const {accountValidationRules, validate} = require('../middlewares/validation/account-validators/account-create');

const userCreate = require('../controllers/user-controllers/user-create');
const userRead = require('../controllers/user-controllers/user-read');
const userUpdate = require('../controllers/user-controllers/user-update');
const userDelete = require('../controllers/user-controllers/user-delete');



//ACCOUNT ROUTES
//ACOUNT CREATE
router.post('/account/create', accountCreate);

//ACCOUNT READ
router.get('/account/read/:id', accountRead);

//ACCOUNT UDPATE
router.put('/account/update', accountUpdate);

//ACCOUNT DELETE
router.delete('/account/delete', accountDelete);


//USER ROUTES
//USER CREATE
router.post('/user/create', userCreate);

//USER READ
router.get('/user/read/:id', userRead);

// //USER UPDATE
// router.put('/user/update', userUpdate);

// //USER DELETE
// router.delete('/user/delete', userDelete);

module.exports = router;
