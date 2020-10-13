const express = require('express');
const router = express.Router();

const {adminPermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/user-rules');
const validate = require('../middlewares/validation/validate'); 

const userCreate = require('../controllers/user-controllers/user-create');
const userRead = require('../controllers/user-controllers/user-read');
const userUpdate = require('../controllers/user-controllers/user-update');
const userDelete = require('../controllers/user-controllers/user-delete');

//USER CREATE
router.post('/user/create', adminPermission, createRules, validate, userCreate);

//USER READ
router.get('/user/read', adminPermission, readRules, validate, userRead);

//USER UPDATE
router.put('/user/update', adminPermission, updateRules, validate, userUpdate);

//USER DELETE
router.delete('/user/delete', adminPermission, deleteRules, validate, userDelete);

module.exports = router;