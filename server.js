const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const {logger} = require('./middleware/logEvents')
const {errHandler} = require('./middleware/errHandler')
const subdirRouter = require('./routes/subdir')
const homeRouter = require('./routes/homeRouter')
const employeeRouter = require('./routes/api/employeeRouter')
const registerRouter = require('./routes/api/registerRouter')
const authRouter = require('./routes/api/authRouter')
const corsOptions = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT')


app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser())
app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/subdir',express.static(path.join(__dirname,'/public')))

app.use(cors(corsOptions))
app.use(logger)
app.use(require('./middleware/credentials'))
//routes
app.use('/subdir',subdirRouter)
app.use('/',homeRouter)
//api routes
app.use('/api/employee',verifyJWT,employeeRouter)
app.use('/register',registerRouter)
app.use('/auth',authRouter)
app.use('/refresh',require('./routes/api/refreshRouter'))
app.use('/logout',require('./routes/api/logoutRouter'))

app.all(/^\/.*/,(req,res)=>{
    res.status(404)
    if(req.accepts('html'))
        res.sendFile(path.join(__dirname,'views','404.html'))
    else if(req.accepts('json'))
        res.send({error:"404 not found"})
    else
        res.type('txt'),send('404 not found')
})
app.use(errHandler)

app.listen(port,()=>{
    console.log('server running')
})


