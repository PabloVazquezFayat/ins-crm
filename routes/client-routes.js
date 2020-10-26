const express = require('express');
const router = express.Router();

const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/client-rules');
const validate = require('../middlewares/validation/validate'); 

const clientCreate = require('../controllers/client-controllers/client-create');
const clientRead = require('../controllers/client-controllers/client-read');
const clientUpdate = require('../controllers/client-controllers/client-update');
const clientDelete = require('../controllers/client-controllers/client-delete');

//USER CREATE
router.post('/client/create', createPermission, createRules, validate, clientCreate);

//USER READ
router.get('/client/read', readPermission, readRules, validate, clientRead);

//USER UPDATE
router.put('/client/update', updatePermission, updateRules, validate, clientUpdate);

//USER DELETE
router.delete('/client/delete', deletePermission, deleteRules, validate, clientDelete);

module.exports = router;