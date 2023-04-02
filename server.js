const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const employeeMenu = require('./public/js/employee');

const connection = mysql.createConnection({ 
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "all_employeesDb"
})

connection.connect(function (error) {
  if (error) throw error;
  else {
  console.table(
    "\n----------All Employees--------\n"
)
  employeeMenu();
}
});



