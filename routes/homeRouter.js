const express = require('express')
const homeRouter = express.Router()
const path = require('path')

homeRouter.get(/^\/$|\/index(\.html)?/,(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})
homeRouter.get(/^\/new-page(\.html)?/,(req,res)=>{
   res.sendFile(path.join(__dirname,'..','views','new-page.html'))
})
homeRouter.get(/^\/old-page(\.html)?/,(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','new-page.html'))
})
module.exports = homeRouter