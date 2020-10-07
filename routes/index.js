const express = require('express');
const router = express.Router();

const accountCreate = require('../controllers/account-controllers/account-create');
const accountRead = require('../controllers/account-controllers/account-read');
const accountUpdate = require('../controllers/account-controllers/account-update');
const accountDelete = require('../controllers/account-controllers/account-delete');

const accountValidateCreate = require('../middlewares/validation/account-validators/account-create');
const accountValidateRead = require('../middlewares/validation/account-validators/account-read');
const accountValidateUpdate = require('../middlewares/validation/account-validators/account-update');
const accountValidateDelete = require('../middlewares/validation/account-validators/account-delete');

const userCreate = require('../controllers/user-controllers/user-create');
const userRead = require('../controllers/user-controllers/user-read');
const userUpdate = require('../controllers/user-controllers/user-update');
const userDelete = require('../controllers/user-controllers/user-delete');

//ACCOUNT ROUTES
//ACOUNT CREATE
router.post('/account/create', accountValidateCreate.rules, accountValidateCreate.validate, accountCreate);

//ACCOUNT READ
router.get('/account/read/:id', accountValidateRead.rules, accountValidateRead.validate, accountRead);

//ACCOUNT UDPATE
router.put('/account/update', accountValidateUpdate.rules, accountValidateUpdate.validate, accountUpdate);

//ACCOUNT DELETE
router.delete('/account/delete', accountValidateDelete.rules, accountValidateDelete.validate, accountDelete);


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
