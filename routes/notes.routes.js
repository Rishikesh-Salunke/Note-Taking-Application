var express = require('express');
var router = express.Router();
const middleware = require('../middleware/jwt.middleware')
const notesController = require('../controllers/node.controller')
// 
// router.post('/login', studentController.loginUser)

router.post('/createnotes',middleware.checkToken,notesController.createnote)
router.put('/update/notee/:id',middleware.checkToken,notesController.updateNote)
router.get('/notes',middleware.checkToken,notesController.getNotes)
router.get('/note/:id',middleware.checkToken,notesController.getNoteByID)
router.delete('/note/:id',middleware.checkToken,notesController.DeleteNote)
// router.get('/note/:id')

module.exports = router;