const express = require('express');
const router = express.Router();

const {adminPermission} = require('../middlewares/permission/permissions');

const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/account-rules');
const validate = require('../middlewares/validation/validate');

const accountCreate = require('../controllers/account-controllers/account-create');
const accountRead = require('../controllers/account-controllers/account-read');
const accountUpdate = require('../controllers/account-controllers/account-update');
const accountDelete = require('../controllers/account-controllers/account-delete');

//ACOUNT CREATE
router.post('/account/create', createRules, validate, accountCreate);

//ACCOUNT READ
router.get('/account/read', adminPermission, readRules, validate, accountRead);

//ACCOUNT UDPATE
router.put('/account/update', adminPermission, updateRules, validate, accountUpdate);

//ACCOUNT DELETE
router.delete('/account/delete', adminPermission, deleteRules, validate, accountDelete);

module.exports = router;
