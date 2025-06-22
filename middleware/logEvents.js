const {format} = require('date-fns')
const {v4:uuid} = require('uuid')
const path = require('path')
const express = require('express')
const app = express()
const fs = require('fs')
const fsPromises = fs.promises

const logEvents = async(message,fileName) =>{
    const dateTime = format(new Date(),"dd:MM:yyyy\tHH:mm:ss")
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',fileName),`${logItem}\n`)
    } catch (error) {
        console.log(error.message)
    }
}
const logger = app.use((req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt')
    console.log(req.method,req.url)
    next()
})
module.exports = {logEvents,logger}