const express = require('express');
const router = express.Router();

//MIDDLEWARES
const {createPermission, readPermission, updatePermission, deletePermission} = require('../middlewares/permission/permissions');
const {createRules, readRules, updateRules, deleteRules} = require('../middlewares/validation/note-rules');
const validate = require('../middlewares/validation/validate'); 
const auth = require('../middlewares/auth/auth');

//CONTROLLERS
const noteCreate = require('../controllers/note-controllers/note-create');
const noteRead = require('../controllers/note-controllers/note-read');
const noteReadSingle = require('../controllers/note-controllers/note-read-single');
const noteUpdate = require('../controllers/note-controllers/note-update');
const noteDelete = require('../controllers/note-controllers/note-delete');

//USER CREATE
router.post('/note', auth, createPermission, createRules, validate, noteCreate);

//USER READ
router.get('/note', auth, readPermission, readRules, validate, noteRead);

//USER READ SINGLE
router.get('/note/:id', auth, readPermission, readRules, validate, noteReadSingle);

//USER UPDATE
router.put('/note', auth, updatePermission, updateRules, validate, noteUpdate);

//USER DELETE
router.delete('/note', auth, deletePermission, deleteRules, validate, noteDelete);

module.exports = router;