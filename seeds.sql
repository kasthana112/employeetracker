INSERT INTO department (name) 
VALUES  
    ('HR'),
    ('Marketing'),
    ('Sales'),
    ('Administration'),
    ('Legal');


INSERT INTO role (title, salary, department_id)
VALUES 
    ('CFO', 100000, 1),
    ('Manager', 80000, 1),
    ('Assistant', 70000, 1),
    ('Sales', 65000, 3),
    ('HR Administrator', 60000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('cynthia', 'guzman', 1, null),
    ('tim', 'smith', 2, null),
    ('ahmad', 'bustani', 3, null),
    ('jack', 'kelly', 4, null),
    ('bob', 'smith', 5, null);
