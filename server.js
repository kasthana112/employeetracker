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
     ]}])
    }
    startApp();
    function viewDepartments() {
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
        
      function View:
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
        inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the role?'
      }).then(({ name }) => {
        db.query('INSERT INTO role SET ?', { name }, (err, results) => {
          if (err) throw err;
          console.log(`${results.affectedRows} role added.`);
          startApp();
        })});

        break;
      case 'Add an employee':
        inquirer.prompt({
          type: 'input',
          name: 'first name, last name, role id, manager id',
          message: 'What is the name of the employee?'
        }).then(({ name }) => {
          db.query('INSERT INTO role SET ?', { name }, (err, results) => {
            if (err) throw err;
            console.log(`${results.affectedRows} employee added.`);
            startApp();
          })});

        break;
      case 'Update employee role':
        inquirer.prompt({
          db.query('SELECT * FROM employees', (err, results) => {
            if (err) throw err;
            console.table(results);
            startApp();
          }),
        })
          
        break;
        case 'Exit':
          db.end();
          console.log('Goodbye!');
          process.exit();
  