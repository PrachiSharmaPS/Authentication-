const express = require("express")
const userController = require("./userController")
const router = express.Router()

router.post('/register',userController.createUser)
router.post('/login',userController.loginUser)



module.exports = router