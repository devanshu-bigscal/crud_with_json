const express = require("express")

const app =express()

const indexRoute= require("./routers/index.js")

app.use(express.json())

app.use("/",indexRoute)

const port =3000
app.listen(port,()=>console.log(`Server running at port : ${port}`))