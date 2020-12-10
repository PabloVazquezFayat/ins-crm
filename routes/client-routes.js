const express = require('express');
const router = express.Router();

//MIDDLEWARES
const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/client-rules');
const validate = require('../middlewares/validation/validate'); 
const auth = require('../middlewares/auth/auth');

//CONTROLLERS
const clientCreate = require('../controllers/client-controllers/client-create');
const clientRead = require('../controllers/client-controllers/client-read');
const clientUpdate = require('../controllers/client-controllers/client-update');
const clientDelete = require('../controllers/client-controllers/client-delete');

//USER CREATE
router.post('/client/create', auth, createPermission, createRules, validate, clientCreate);

//USER READ
router.get('/client/read', auth, readPermission, readRules, validate, clientRead);

//USER READ SINGLE
router.get('/client/read/:id', auth, readPermission, readRules, validate, clientRead);

//USER UPDATE
router.put('/client/update', auth, updatePermission, updateRules, validate, clientUpdate);

//USER DELETE
router.delete('/client/delete', auth, deletePermission, deleteRules, validate, clientDelete);

module.exports = router;