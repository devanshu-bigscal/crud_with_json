const express=require("express")
const multer=require("multer")
const { searchUserById ,getAllUsers,createUser,deleteUserById,updateUserById, uploadPhotoById,storage} = require("../controllers/index")
const upload = multer({ storage: storage });

const router= express()


router.get("/",getAllUsers)
router.post("/",createUser)
router.get("/:id",searchUserById)
router.delete("/:id",deleteUserById)
router.put("/:id",updateUserById)
router.post("/photo/:id",upload.single("profilePic"),uploadPhotoById)

module.exports=router