const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '*Batman3',
  database: 'etracker_db'
});

function startApp() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        'Exit'
      ]
    }
  ]).then(({ action }) => {
    switch (action) {
      case 'View all departments':
        db.query('SELECT * FROM department', (err, results) => {
          if (err) throw err;
          console.table(results);
          startApp();
        });
        break;
      case 'View all roles':
        db.query('SELECT * FROM roles', (err, results) => {
          if (err) throw err;
          console.table(results);
          startApp();
        });
        break;
      case 'View all employees':
        db.query('SELECT * FROM employees', (err, results) => {
          if (err) throw err;
          console.table(results);
          startApp();
        });
        break;
      case 'Add a department':
        inquirer.prompt({
          type: 'input',
          name: 'name',
          message: 'What is the name of the department?'
        }).then(({ name }) => {
          db.query('INSERT INTO department SET ?', { name }, (err, results) => {
            if (err) throw err;
            console.log(`${results.affectedRows} department added.`);
            startApp();
          });
        });
        break;
      case 'Add a role':
        // similar to add department
        break;
      case 'Add an employee':
        // similar to add department
        break;
      case 'Update employee role':
        // similar to view all employees, but with inquirer prompt to select employee and role to update
        break;
      case 'Exit':
        db.end();
        break;
    }
  });
}

db.connect((err) => {
  if (err) throw err;
  console.log(`Connected to the etracker_db database.`);
  startApp();
});