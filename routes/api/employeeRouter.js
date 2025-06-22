const express = require('express')
const employeeRouter = express.Router()
const path = require('path')
const {getAllEmployees,updateEmployee,createEmployee,deleteEmployee,getEmployee}=require('../../controllers/empController') 
const verifyJWT = require('../../middleware/verifyJWT')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const data ={
    employees:require('../../data/employees.json')
}


employeeRouter.route('/')
.get(getAllEmployees)
.post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createEmployee)
.put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),updateEmployee)
.delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)

employeeRouter.route("/:id")
    .get(getEmployee)

module.exports = employeeRouter