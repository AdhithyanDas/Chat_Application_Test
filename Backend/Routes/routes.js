const express = require('express')

const userController = require('../Controllers/userController')
const chatRoomController = require('../Controllers/chatRoomController')

const jwtMiddle = require('../Middleware/jwtMiddleware')

const router = express.Router()

router.post('/reg', userController.userRegistration)
router.post('/log', userController.userLogin)

router.post('/addroom', jwtMiddle, chatRoomController.createRoom)
router.get('/getrooms', jwtMiddle, chatRoomController.getAllRooms)
router.put('/updateroom', jwtMiddle, chatRoomController.updateRoom)
router.delete('/deleteroom/:id', jwtMiddle, chatRoomController.deleteRoom)
router.post('/joinroom', jwtMiddle, chatRoomController.joinRoom)

module.exports = router