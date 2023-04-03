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
              'View Employees By Department',
              'Add Employee',
              'Remove Employee',
              'Update Employee Role',
              'Add Role',
              'Add Department',
              'Exit'
          ]

      }

  ]).then((response) => {
    console.log(response)
      if (response.options === 'View All Employees') {
        console.log(response)
          viewAllEmployees();
      }
      if (response === 'View All Roles') {
          viewAllRoles();
      }
      if (response === "View All Departments") {
          viewAllDepartments();
      }
      if (response === 'View Employees By Department') {
          viewEmployeesByDepartment();
      }
      if (response === 'Add Employee') {
          addEmployee();
      }
      if (response === 'Remove Employee') {
          removeEmployee();
      }
      if (response === 'Update Employee Role') {
          updateEmployeeRole();
      }
      if (response === 'Add Role') {
          addRole();
      }
      if (response === 'Add Department') {
          addDepartment();
      }
      if (response === 'Exit') {
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
        ON department.id = role.department_id
        LEFT JOIN employee manager
        ON manager.id = employee.manager_id;`, (err, response) => {
    if (err) throw err;
    console.table(response);
    employeeMenu();
  });
}