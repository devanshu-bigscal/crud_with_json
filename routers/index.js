const express=require("express")
const { searchUserById ,getAllUsers,createUser,deleteUserById,updateUserById} = require("../controllers/index")


const router= express()


router.get("/",getAllUsers)
router.post("/",createUser)
router.get("/:id",searchUserById)
router.delete("/:id",deleteUserById)
router.put("/:id",updateUserById)


module.exports=router