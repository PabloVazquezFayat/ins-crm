const express = require('express');
const router = express.Router();

const {adminPermission} = require('../middlewares/permission/permissions');

const accountValidateCreate = require('../middlewares/validation/account-validators/account-create');
const accountValidateRead = require('../middlewares/validation/account-validators/account-read');
const accountValidateUpdate = require('../middlewares/validation/account-validators/account-update');
const accountValidateDelete = require('../middlewares/validation/account-validators/account-delete');

const accountCreate = require('../controllers/account-controllers/account-create');
const accountRead = require('../controllers/account-controllers/account-read');
const accountUpdate = require('../controllers/account-controllers/account-update');
const accountDelete = require('../controllers/account-controllers/account-delete');

//ACOUNT CREATE
router.post('/account/create', accountValidateCreate.rules, accountValidateCreate.validate, accountCreate);

//ACCOUNT READ
router.get('/account/read/:id', adminPermission, accountValidateRead.rules, accountValidateRead.validate, accountRead);

//ACCOUNT UDPATE
router.put('/account/update', adminPermission, accountValidateUpdate.rules, accountValidateUpdate.validate, accountUpdate);

//ACCOUNT DELETE
router.delete('/account/delete', adminPermission, accountValidateDelete.rules, accountValidateDelete.validate, accountDelete);

module.exports = router;
