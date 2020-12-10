const express = require('express');
const router = express.Router();

//MIDDLEWARES
const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/claim-rules');
const validate = require('../middlewares/validation/validate'); 
const auth = require('../middlewares/auth/auth');

//CONTROLLERS
const claimCreate = require('../controllers/claim-controllers/claim-create');
const claimRead = require('../controllers/claim-controllers/claim-read');
const claimReadSingle = require('../controllers/claim-controllers/claim-read-single');
const claimUpdate = require('../controllers/claim-controllers/claim-update');
const claimDelete = require('../controllers/claim-controllers/claim-delete');

//USER CREATE
router.post('/claim', auth, createPermission, createRules, validate, claimCreate);

//USER READ
router.get('/claim', auth, readPermission, readRules, validate, claimRead);

//USER READ SINGLE
router.get('/claim/:id', auth, readPermission, readRules, validate, claimReadSingle);

//USER UPDATE
router.put('/claim', auth, updatePermission, updateRules, validate, claimUpdate);

//USER DELETE
router.delete('/claim', auth, deletePermission, deleteRules, validate, claimDelete);

module.exports = router;