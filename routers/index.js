const express=require("express")
const multer=require("multer")
const { searchUserById ,getAllUsers,createUser,deleteUserById,updateUserById, uploadPhotoById,storage,validateSchema} = require("../controllers/index")
const upload = multer({ storage: storage ,fileFilter:(req,file,cb)=>{
    file.size=parseInt(req.headers["content-length"]) // 3e6 - 3mb
    if(file.size<=3000000 && (file.mimetype==="image/jpeg" || file.mimetype==="image/jpg" || file.mimetype==="image/png")){
         cb(null,true)
    }
    else{
        cb(null,false)
        return cb(new Error("File extension must of image type with size limit less than 3mb "))
    }

}});

const router= express()


router.get("/",getAllUsers)
router.post("/",validateSchema,upload.single("profilePic"),createUser)
router.get("/:id",searchUserById)
router.delete("/:id",deleteUserById)

router.put("/:id",updateUserById)
router.post("/photo/:id",upload.single("profilePic"),uploadPhotoById)
router.post("/doc/:id",)

module.exports=router