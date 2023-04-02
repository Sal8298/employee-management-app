//Dependancies
const consoleTable = require("console.table");
const mysql = require("mysql2");
const inquirer = require("inquirer");


module.exports = function employeeMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'View Employees By Department',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Add Role',
                'Add Department',
                'Exit'
            ]

        }

    ]).then((res) => {
        console.log(res.options);
        const { choices } = answer;
        if (choices === 'View All Employees') {
            viewAllEmployees();
        }
        if (choices === 'View All Roles') {
            viewAllRoles();
        }
        if (choices === "View All Departments") {
            viewAllDepartments();
        }
        if (choices === 'View Employees By Department') {
            viewEmployeesByDepartment();
        }
        if (choices === 'Add Employee') {
            addEmployee();
        }
        if (choices === 'Remove Employee') {
            removeEmployee();
        }
        if (choices === 'Update Employee Role') {
            updateEmployeeRole();
        }
        if (choices === 'Add Role') {
            addRole();
        }
        if (choices === 'Add Department') {
            addDepartment();
        }
        if (choices === 'Exit') {
            Exit();
        }
    }).catch((error) => {
        if (error) throw error;
    });
};

