const express = require('express');
const router = express.Router();

//MIDDLEWARES
const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/policy-rules');
const validate = require('../middlewares/validation/validate'); 
const auth = require('../middlewares/auth/auth');

//CONTROLLERS
const policyCreate = require('../controllers/policy-controllers/policy-create');
const policyRead = require('../controllers/policy-controllers/policy-read');
const policyUpdate = require('../controllers/policy-controllers/policy-update');
const policyDelete = require('../controllers/policy-controllers/policy-delete');

//USER CREATE
router.post('/policy/create', auth, createPermission, createRules, validate, policyCreate);

//USER READ
router.get('/policy/read', auth, readPermission, readRules, validate, policyRead);

//USER READ SINGLE
router.get('/policy/read/:id', auth, readPermission, readRules, validate, policyRead);

//USER UPDATE
router.put('/policy/update', auth, updatePermission, updateRules, validate, policyUpdate);

//USER DELETE
router.delete('/policy/delete', auth, deletePermission, deleteRules, validate, policyDelete);

module.exports = router;