const express = require('express');
const router = express.Router();

const dataParser = require('../middlewares/asset/data-parser');
const { createPermission, readPermission, updatePermission, deletePermission } = require('../middlewares/permission/permissions');
const { createRules, readRules, readSingleRules, updateRules, deleteRules } = require('../middlewares/validation/asset-rules');
const validate = require('../middlewares/validation/validate'); 

const assetCreate = require('../controllers/asset-controllers/asset-create');
const assetRead = require('../controllers/asset-controllers/asset-read');
const assetReadSingle = require('../controllers/asset-controllers/asset-read-single');
const assetUpdate = require('../controllers/asset-controllers/asset-update');
const assetDelete = require('../controllers/asset-controllers/asset-delete');

const { cacheFile, saveToCloud } = require('../middlewares/asset/asset-upload');
const updateInCloud = require('../middlewares/asset/asset-update');
const deleteInCloud = require('../middlewares/asset/asset-delete');
const rejectDuplicates = require('../middlewares/asset/reject-duplicates');

//ASSET CREATE
router.post('/asset/create', cacheFile.single('asset'), dataParser, createPermission, createRules, validate, rejectDuplicates, saveToCloud, assetCreate);

//ASSET READ
router.get('/asset/read', readPermission, readRules, validate, assetRead);

//ASSET READ SINGLE
router.get('/asset/read/:id', readPermission, readSingleRules, validate, assetReadSingle);

//ASSET UPDATE
router.put('/asset/update', updatePermission, updateRules, validate, updateInCloud, assetUpdate);

//ASSET DELETE
router.delete('/asset/delete', deletePermission, deleteRules, validate, deleteInCloud, assetDelete);

module.exports = router;