const express = require('express');
const router = express.Router();

const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/policy-rules');
const validate = require('../middlewares/validation/validate'); 

const policyCreate = require('../controllers/policy-controllers/policy-create');
const policyRead = require('../controllers/policy-controllers/policy-read');
const policyUpdate = require('../controllers/policy-controllers/policy-update');
const policyDelete = require('../controllers/policy-controllers/policy-delete');

//USER CREATE
router.post('/policy/create', createPermission, createRules, validate, policyCreate);

//USER READ
router.get('/policy/read', readPermission, readRules, validate, policyRead);

//USER READ SINGLE
router.get('/policy/read/:id', readPermission, readRules, validate, policyRead);

//USER UPDATE
router.put('/policy/update', updatePermission, updateRules, validate, policyUpdate);

//USER DELETE
router.delete('/policy/delete', deletePermission, deleteRules, validate, policyDelete);

module.exports = router;