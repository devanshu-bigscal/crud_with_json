const fs = require("fs")
const path = require("path")
const multer = require("multer")
const { v4 } = require("uuid")
const Joi = require("joi")
const { string, number } = require("joi")
const fsPath = path.join(process.cwd(), "./data.json")


// multer file uploading

exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const fn = v4() + file.originalname;
        cb(null, fn);
    },
});

exports.docStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./docs")
    },
    filename:function(req,file,cb){
        const fn=v4()+file.originalname
        cb(null,fn)
    }
})

// Get All Users

exports.getAllUsers = (req, res) => {

    try {
        fs.readFile(fsPath, "utf-8", (err, data) => {
            const results = JSON.parse(data)

            return res.json(results)
        })

    } catch (error) {
        console.log(error)
    }

}



// Create User

exports.createUser = (req, res) => {
    try {
        fs.readFile(fsPath, "utf-8", (err, data) => {

            const { body: payload } = req



            const results = JSON.parse(data)

            payload.id = Math.floor(Math.random() * 10000) + "_" + payload.name.split(" ")[0]
            
            console.log(req.file)

            results.push(payload)

            fs.writeFile(fsPath, JSON.stringify(results), (err) => console.log(err))

            return res.json("message : user created successfully")
        })
    } catch (error) {
        console.log(error)
    }
}



// Search User By Id

exports.searchUserById = (req, res) => {

    try {

        fs.readFile(fsPath, "utf8", (err, data) => {

            const results = JSON.parse(data)

            const index = results.indexOf(results.find(item => item.id === req.params.id))

            if (!results[index]) throw new Error("user not found")

            return res.json(results[index])

        })

    } catch (error) {
        console.log(error)
    }
}



// Delete User By Id

exports.deleteUserById = (req, res) => {

    try {

        fs.readFile(fsPath, "utf8", (err, data) => {

            const results = JSON.parse(data)

            const index = results.indexOf(results.find(item => item.id === req.params.id))

            if (!results[index]) throw new Error("user not found")

            results.pop(results[index])

            fs.writeFile(fsPath, JSON.stringify(results), (err) => console.log(err))

            return res.json("message: user deleted successfully")

        })

    } catch (error) {
        console.log(error)
    }
}



// Update User By Id

exports.updateUserById = (req, res) => {

    try {

        fs.readFile(fsPath, "utf8", (err, data) => {

            const { body: payload } = req


            const results = JSON.parse(data)


            const index = results.indexOf(results.find(item => item.id === req.params.id))

            if (!results[index]) throw new Error("user not found")

            results[index] = { ...results[index], ...payload }

            fs.writeFile(fsPath, JSON.stringify(results), (err) => console.log(err))

            return res.json("message : user updated successfully")

        })

    } catch (error) {
        console.log(error)
    }
}





exports.uploadPhotoById = async (req, res, next) => {


    try {

        fs.readFile(fsPath, "utf-8", (err, data) => {

            const { body: payload } = req
            const results = JSON.parse(data)


            const index = results.indexOf(results.find(item => item.id === req.params.id))

            if (!results[index]) throw new Error("user not found")

            payload.profilePic = req.file.filename

            results[index] = { ...results[index], ...payload }

            fs.writeFile(fsPath, JSON.stringify(results), (err) => console.log(err))

            return res.json("message : user updated with photo successfully")
        })
    } catch (error) {
        console.log(error)
    }
}


exports.validateSchema=async(req,res,next)=>{

  const schema=Joi.object({
    name:Joi.string().alphanum().min(3).max(30).required(),
    password:Joi.string().min(6).max(12).required(),
    // .messages({
    //     'string.empty': 'Password field can not be empty',
    //     'string.min': 'Password must of alteast 6 characters long',
    //   }),

    contact:Joi.string().length(10).required(),
    email:Joi.string().email().required()
  })
//   .options({abortEarly:false})
  
  try {
     const value = await schema.validateAsync(req.body)
     
     next()

  } catch (error) {
   const message= error.details.map(e=>e.message.replaceAll("\"",""))
    return res.json({'error':message})
  }

}




exports.uploadDocById = async (req, res, next) => {


    try {

        fs.readFile(fsPath, "utf-8", (err, data) => {

            const { body: payload } = req
            const results = JSON.parse(data)


            const index = results.indexOf(results.find(item => item.id === req.params.id))

            if (!results[index]) throw new Error("user not found")

            payload.docs = req.file.filename

            results[index] = { ...results[index], ...payload }

            fs.writeFile(fsPath, JSON.stringify(results), (err) => console.log(err))

            return res.json("message : user updated with doc successfully")
        })
    } catch (error) {
        console.log(error)
    }
}
