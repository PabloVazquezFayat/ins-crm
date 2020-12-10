const express = require('express');
const router = express.Router();

//MIDDLEWARES
const {adminPermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/user-rules');
const validate = require('../middlewares/validation/validate'); 
const auth = require('../middlewares/auth/auth');
const login = require('../middlewares/auth/login');

//CONTROLLERS
const userCreate = require('../controllers/user-controllers/user-create');
const userRead = require('../controllers/user-controllers/user-read');
const userUpdate = require('../controllers/user-controllers/user-update');
const userDelete = require('../controllers/user-controllers/user-delete');

//USER CREATE
router.post('/user', auth, adminPermission, createRules, validate, userCreate);

//USER READ
router.get('/user', auth, adminPermission, readRules, validate, userRead);

//USER UPDATE
router.put('/user', auth, adminPermission, updateRules, validate, userUpdate);

//USER DELETE
router.delete('/user', auth, adminPermission, deleteRules, validate, userDelete);

//USER LOGIN
router.post('/user/login', login);

module.exports = router;