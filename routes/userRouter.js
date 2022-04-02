const userController = require("../controllers/userController")
const router = require("express").Router()
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")
const upload  =require("../middleware/uploadFile")

// router.get("/user", (req, res)=>{
//     res.send("hellow in the page user router")
// })
router.post("/register", userController.register)
router.post("/login", userController.login)
router.post('/loginAdmin', userController.loginAdmin)
router.get("/showAllUser", userController.showAllUser)
router.get("/showSingleUser/:id", userController.showSingleUser)
router.delete("/deletedUser/:id", userController.deletedUser)
router.get("/editUser/:id", userController.editUser)
router.post("/logOut", auth, userController.logOut )
router.post("/changePassword", userController.changePassword )
router.post("/logOutAll", auth, userController.logOutAll )
router.get("/profile", auth, userController.profile )
// router.post('/profileImg', userController.profileImg)
router.post('/profileImg',auth, upload.single('avatar'), userController.profileImg )

module.exports = router