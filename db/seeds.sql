
USE all_employeesDb;

INSERT INTO department (department_name)
VALUES 
("Sales"), 
("Accounting"), 
("Computing"), 
("HR");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Head", 120000, 1), 
("Salesperson", 70000, 1), 
("Accountant", 120000, 2), 
("CSR", 150000, 2),
("Software Engineer", 200000, 3),  
("Hardware Inspector", 140000, 3), 
("HR Director", 300000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Salahuddin", "Imdad", 1, 1), 
("Garrett", "Winter", 2, 1), 
("Krister", "Merlin", 3, 1),
("Migi", "Montenegro", 4, 1), 
("Nick", "Mamberger", 5, 2), 
("First", "Mook", 6, 2), 
("Second", "Mook", 7, 2);