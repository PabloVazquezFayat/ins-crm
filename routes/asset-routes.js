const express = require('express');
const router = express.Router();

const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/claim-rules');
const validate = require('../middlewares/validation/validate'); 

const assetCreate = require('../controllers/asset-controllers/asset-create');
const assetRead = require('../controllers/asset-controllers/asset-read');
const assetReadSingle = require('../controllers/asset-controllers/asset-read-single');
const assetUpdate = require('../controllers/asset-controllers/asset-update');
const assetDelete = require('../controllers/asset-controllers/asset-delete');

//USER CREATE
router.post('/asset/create', createPermission, createRules, validate,assetCreate);

//USER READ
router.get('/asset/read', readPermission, readRules, validate, assetRead);;

//USER READ SINGLE
router.get('/asset/read/:id', readPermission, readRules, validate, assetReadSingle);

//USER UPDATE
router.put('/asset/update', updatePermission, updateRules, validate, assetUpdate);

//USER DELETE
router.delete('/asset/delete', deletePermission, deleteRules, validate, assetDelete);

module.exports = router;