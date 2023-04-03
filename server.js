const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");


const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "all_employeesDb"
});

connection.connect(function (error) {
  if (error) throw error;
  else {
    console.table(
      "\n----------My Table--------\n"
    )
    employeeMenu();
  }
});

function employeeMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add Employee',
        'Add Department',
        'Add Role',
        'Exit'
      ]

    }

  ]).then((response) => {
    console.log(response)
    if (response.options === 'View All Employees') {
      viewAllEmployees();
    }
    if (response.options === 'View All Roles') {
      viewAllRoles();
    }
    if (response.options === "View All Departments") {
      viewAllDepartments();
    }
    if (response.options === 'Add Employee') {
      addEmployee();
    }
    if (response.options === 'Add Role') {
      addRole();
    }
    if (response.options === 'Add Department') {
      addDepartment();
    }
    if (response.options === 'Exit') {
      Exit();
    }
  })
};

function viewAllEmployees() {
  connection.query(
    `Select 
    employee.id, 
    employee.first_name, 
    employee.last_name,
    role.title,
    role.salary,
    department.department_name  FROM employee
    LEFT JOIN role
        ON employee.role_id = role.id
        LEFT JOIN department
        ON department.id = role.department_id;`, (err, response) => {
    if (err) throw err;
    console.table(response);
    employeeMenu();
  });
}

function viewAllRoles() {
  connection.query(
    `Select * FROM role;`, (err, response) => {
      if (err) throw err;
      console.table(response);
      employeeMenu();
    });
}

function viewAllDepartments() {
  connection.query(
    `Select * FROM department;`, (err, response) => {
      if (err) throw err;
      console.table(response);
      employeeMenu();
    });
}

function addEmployee() {
  let query = 
  `SELECT 
      role.id, 
      role.title, 
      role.salary FROM role`

connection.query(query,(err, response)=>{
  if(err)throw err;
  const role = response.map(({ id, title, salary }) => ({
    value: id, 
    title: `${title}`, 
    salary: `${salary}`
  }));

  console.table(response);
  employeeRoles(role);
});
}

function employeeRoles(role) {
inquirer
  .prompt([
  {
    type: 'input',
    name: 'firstName',
    message: 'Employee First Name: '
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'Employee Last Name: '
  },
  {
    type: 'list',
    name: 'roleId',
    message: 'Employee Role: ',
    choices: role
  }
]).then((response)=>{
    let query = `INSERT INTO employee SET ?`
    connection.query(query,{
      first_name: response.firstName,
      last_name: response.lastName,
      role_id: response.roleId
    },(err, response)=>{
      if(err) throw err;
      employeeMenu();
  });
});
}

function addDepartment(){
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department_name',
        message: 'Name: '
      }
    ]).then((response)=>{
    let query = `INSERT INTO department SET ?`;
    connection.query(query, {department_name: response.department_name},(err, response)=>{
      if(err) throw err;
      employeeMenu();
    });
  })
};