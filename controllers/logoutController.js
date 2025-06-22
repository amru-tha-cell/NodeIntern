const usersDB = {
    users: require('../data/users.json'),
    setUsers: function (data) {this.users = data}
};
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async(req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) res.sendStatus(204)
    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(user=>user.refreshToken===refreshToken)
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true,sameSite:'none',secure:true})
        res.sendStatus(204)
    }
    const otherUsers = usersDB.users.filter(person=>person.refreshToken!==refreshToken);
    const currentUser = {...foundUser,refreshToken:""}
    usersDB.setUsers([...otherUsers,currentUser])
    await fsPromises.writeFile(
        path.join(__dirname,'..','data','users.json'),
        JSON.stringify(usersDB.users)
    )
}
module.exports = {handleLogout}