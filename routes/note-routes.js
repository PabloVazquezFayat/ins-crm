const express = require('express');
const router = express.Router();

const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/note-rules');
const validate = require('../middlewares/validation/validate'); 

const noteCreate = require('../controllers/note-controllers/note-create');
const noteRead = require('../controllers/note-controllers/note-read');
const noteReadSingle = require('../controllers/note-controllers/note-read-single');
const noteUpdate = require('../controllers/note-controllers/note-update');
const noteDelete = require('../controllers/note-controllers/note-delete');

//USER CREATE
router.post('/note/create', createPermission, createRules, validate, noteCreate);

//USER READ
router.get('/note/read', readPermission, readRules, validate, noteRead);

//USER READ SINGLE
router.get('/note/read/:id', readPermission, readRules, validate, noteReadSingle);

//USER UPDATE
router.put('/note/update', updatePermission, updateRules, validate, noteUpdate);

//USER DELETE
router.delete('/note/delete', deletePermission, deleteRules, validate, noteDelete);

module.exports = router;