const express = require('express');
const router = express.Router();

const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/claim-rules');
const validate = require('../middlewares/validation/validate'); 

const claimCreate = require('../controllers/claim-controllers/claim-create');
const claimRead = require('../controllers/claim-controllers/claim-read');
const claimReadSingle = require('../controllers/claim-controllers/claim-read-single');
const claimUpdate = require('../controllers/claim-controllers/claim-update');
const claimDelete = require('../controllers/claim-controllers/claim-delete');

//USER CREATE
router.post('/claim/create', createPermission, createRules, validate, claimCreate);

//USER READ
router.get('/claim/read', readPermission, readRules, validate, claimRead);

//USER READ SINGLE
router.get('/claim/read/:id', readPermission, readRules, validate, claimReadSingle);

//USER UPDATE
router.put('/claim/update', updatePermission, updateRules, validate, claimUpdate);

//USER DELETE
router.delete('/claim/delete', deletePermission, deleteRules, validate, claimDelete);

module.exports = router;