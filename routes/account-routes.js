const express = require('express');
const router = express.Router();

//MIDDLEWARES
const {adminPermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/account-rules');
const validate = require('../middlewares/validation/validate');
const auth = require('../middlewares/auth/auth');
const login = require('../middlewares/auth/login');

//CONTROLLERS
const accountCreate = require('../controllers/account-controllers/account-create');
const accountRead = require('../controllers/account-controllers/account-read');
const accountUpdate = require('../controllers/account-controllers/account-update');
const accountDelete = require('../controllers/account-controllers/account-delete');

//ACOUNT CREATE
router.post('/account', createRules, validate, accountCreate, login);

//ACCOUNT READ
router.get('/account', auth, adminPermission, readRules, validate, accountRead);

//ACCOUNT UDPATE
router.put('/account', auth, adminPermission, updateRules, validate, accountUpdate);

//ACCOUNT DELETE
router.delete('/account', auth, adminPermission, deleteRules, validate, accountDelete);

module.exports = router;
