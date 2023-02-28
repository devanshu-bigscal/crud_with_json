const fs= require("fs")
const path=require("path")

const fsPath=path.join(process.cwd(),"./data.json")



// Get All Users

exports.getAllUsers=(req,res)=>{

    try {
        fs.readFile(fsPath,"utf-8",(err,data)=>{
        
            const results =JSON.parse(data)

    
            return res.json(results)
        })
    
    } catch (error) {
        console.log(error)
    }

}



// Create User

exports.createUser=(req,res)=>{
     

    try {
        fs.readFile(fsPath,"utf-8",(err,data)=>{

            const {body:payload}= req
    
            const results=JSON.parse(data)
    
           payload.id=Math.floor(Math.random()*10000)+"_"+payload.name.split(" ")[0]
    
           results.push(payload)
    
           fs.writeFile(fsPath,JSON.stringify(results),(err)=>console.log(err))

          return res.json("message : user created successfully")
        })
    } catch (error) {
        console.log(error)
    }
}



// Search User By Id

exports.searchUserById=(req,res)=>{

    try {
        
        fs.readFile(fsPath,"utf8",(err,data)=>{
         
            const results= JSON.parse(data)

            const index=results.indexOf(results.find(item=>item.id===req.params.id))
                
            if(!results[index]) throw new Error("user not found")

            return res.json(results[index])

        })

    } catch (error) {
        console.log(error)
    }
}



// Delete User By Id

exports.deleteUserById=(req,res)=>{

    try {
        
        fs.readFile(fsPath,"utf8",(err,data)=>{
         
            const results= JSON.parse(data)

            const index=results.indexOf(results.find(item=>item.id===req.params.id))
                
            if(!results[index]) throw new Error("user not found")

            results.pop(results[index])

            fs.writeFile(fsPath,JSON.stringify(results),(err)=>console.log(err))

            return res.json("message: user deleted successfully")

        })

    } catch (error) {
        console.log(error)
    }
}



// Update User By Id

exports.updateUserById=(req,res)=>{

    try {
        
        fs.readFile(fsPath,"utf8",(err,data)=>{

            const {body:payload}= req

         
            const results= JSON.parse(data)
            

            const index=results.indexOf(results.find(item=>item.id===req.params.id))
                
            if(!results[index]) throw new Error("user not found")

            results[index]={...results[index],...payload}

            fs.writeFile(fsPath,JSON.stringify(results),(err)=>console.log(err))

            return res.json("message : user updated successfully")

        })

    } catch (error) {
        console.log(error)
    }
}

