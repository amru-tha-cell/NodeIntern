const {logEvents} = require('./logEvents')
const errHandler =(err,req,res,next)=>{
    logEvents(`${err.name}:${err.message}`,'errLog.txt')
    console.error(err.stack)
    res.status(500).send(err.messaga)
}
module.exports = {errHandler};