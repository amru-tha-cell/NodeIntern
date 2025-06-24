const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/employees.json');
const data = {
    employees: require('../data/employees.json'),
    setEmployee: function (data) {
        this.employees = data;
        //fs.writeFileSync(dataPath, JSON.stringify(data));
    }
};


const createEmployee = (req, res) => {
    const newEmployee = {
        _id: data.employees[data.employees.length - 1]._id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    if (!newEmployee.firstname || !newEmployee.lastname)
        return res.status(400).json({ "message": "First name and last name required" });

    data.setEmployee([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
};


const updateEmployee = (req, res) => {
    const id = parseInt(req.body.id);
    const employee = data.employees.find(emp => emp._id === id);

    if (!employee)
        return res.status(400).json({ "message": `Emp id ${id} not found` });

    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;

    const filterArray = data.employees.filter(emp => emp._id !== id);
    const updateArray = [...filterArray, employee];

    data.setEmployee(updateArray.sort((a, b) => a._id>b._id?1:-1));
    res.json(data.employees);
};


const getAllEmployees = (req, res) => {
    res.json(data.employees);
};


const deleteEmployee = (req, res) => {
    const id = parseInt(req.body.id);
    const employee = data.employees.find(emp => emp._id === id);

    if (!employee)
        return res.status(400).json({ "message": `Emp id ${id} not found` });

    const filterArray = data.employees.filter(emp => emp._id !== id);
    data.setEmployee([...filterArray]);
    res.json(data.employees);
};


const getEmployee = (req, res) => {
    const id = parseInt(req.params.id);
    const employee = data.employees.find(emp => emp._id === id);

    if (!employee)
        return res.status(400).json({ "message": `Emp id ${req.params.id} not found` });

    res.json(employee);
};

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
};
