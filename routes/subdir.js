const express = require('express')
const path = require('path')
const subdirRouter = express.Router()
subdirRouter.get(/^\/$|\/index(\.html)?/,(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','subdir','index.html'))
})
subdirRouter.get(/^\/$|\/test(\.html)?/,(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','subdir','index.html'))
})
module.exports = subdirRouter