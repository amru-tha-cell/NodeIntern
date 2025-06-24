const usersDB = {
    users: require('../data/users.json'),
    setUsers: function (data) {this.users = data}
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const handleLogin =  async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
        return res.status(400).json({"message":"username and password are required"})
    }
    const foundUser = usersDB.users.find(user=>user.username===username)
    if(!foundUser)
        return res.sendStatus(401)
    const roles = Object.values(foundUser.roles)
    const match = await bcrypt.compare(password,foundUser.password)
    if(match){
        const accessToken = jwt.sign(
            {
                "UserInfo":{
                    "username":foundUser.username,
                    "roles":roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'120s'}
        )
        const refreshToken = jwt.sign(
             {'username':foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        const otherUsers = usersDB.users.filter(person=>person.username!==foundUser.username)
        const currentUser = {...foundUser,refreshToken}
        console.log(usersDB.users)
        usersDB.setUsers([...otherUsers,currentUser])
        await fsPromises.writeFile(
            path.join(__dirname,'..','data','users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt',refreshToken,{sameSite:'none',secure:true})
        res.json({accessToken})
    }
    else
        res.sendStatus(401)
}
module.exports = {handleLogin}