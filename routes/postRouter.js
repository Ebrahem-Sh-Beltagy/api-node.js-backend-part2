const router = require("express").Router()
const postController = require("../controllers/postController")
const upload  =require("../middleware/uploadFile")
const auth = require("../middleware/auth")

router.post("/addPost",auth, postController.addPost )
router.get("/myPosts",auth, postController.myPosts )
router.get("/showAllPost", postController.showAllPost)
router.get("/showSinglePost/:id", postController.showSinglePost)
router.get("/deletePost/:id", postController.deletePost)
// router.get("/deletePost", postController.delete)
router.post('/profileImg',auth, upload.single('avatar'), postController.profileImg )
module.exports = router