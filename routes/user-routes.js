const express = require('express');
const router = express.Router();

const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');

const userCreate = require('../controllers/user-controllers/user-create');
const userRead = require('../controllers/user-controllers/user-read');
const userUpdate = require('../controllers/user-controllers/user-update');
const userDelete = require('../controllers/user-controllers/user-delete');

//USER CREATE
router.post('/user/create', createPermission, userCreate);

//USER READ
router.get('/user/read/:id', readPermission, userRead);

//USER UPDATE
//router.put('/user/update', updatePermission, userUpdate);

//USER DELETE
//router.delete('/user/delete', deletePermission, userDelete);