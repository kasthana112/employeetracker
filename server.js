const mysql = require('mysql2');
const question = require('./questions');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'etracker_db'

    },
    console.log(`Connected to the classlist_db database.`)
);

init();
function init(){
    initialQ();
}


function allEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    initialQ();
    })
};

function allRoles() {
    db.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    initialQ();
    })
};

function allDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        initialQ();
    })
};
function updateEmployeeRole() {
    db.query("SELECT * FROM employee", (err, results) => {
      if (err) throw err;

      const employeeList = results.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
        inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee's role do you want to update?",
            name: "employeeId",
            choices: employeeList,
          },
          {
            type: "input",
            message: "Enter the new role ID:",
            name: "newRoleId",
          },
        ])
        .then((answers) => {
          const { employeeId, newRoleId } = answers;
          db.query(
            `UPDATE employee SET role_id = ? WHERE id = ?`,
            [newRoleId, employeeId],
            (err, results) => {
              if (err) throw err;
              console.log(`Employee's role updated successfully!`);
              initialQ();
            }
          );
        });
    });
  }
  function addEmp() {
    let managerList = [];
    let roleList = [];
    db.query(
      "SELECT * FROM employee where manager_id is null;",
      (err, results) => {
        if (err) throw err;
        managerList = results.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
        db.query("select * from role;", (err, results) => {
          if (err) throw err;
          roleList = results.map((role) => ({
            name: role.title,
            value: role.id,
          }));
  
          inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "Enter employee first name:",
              },
              {
                type: "input",
                name: "last_name",
                message: "Enter employee last name:",
              },
              {
                type: "list",
                name: "role_id",
                message: "Enter employee role ID:",
                choices: roleList,
              },
              {
                type: "list",
                name: "manager_id",
                message: "Enter employee manager ID:",
                choices: managerList,
              },
            ])
            .then((answers) => {
              const { first_name, last_name, role_id, manager_id } = answers;
              const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
              db.query(
                sql,
                [first_name, last_name, role_id, manager_id],
                (error, results, fields) => {
                  if (error) console.error(error);
                  return;
                }
              );
              console.log("Employee added successfully!");
              initialQ();
            });
        });
      }
    );
  }
  
  function addDept() {
    inquirer
      .prompt({
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      })
      .then(({ name }) => {
        
        const sql = "INSERT INTO department SET ?";
  
        db.query(sql, { name }, (error, results, fields) => {
          if (error) {
            console.error(error);
            console.log("Failed to add department");
          } else {
            
            console.log(`Added department ${name}`);
            initialQ();
          }
        });
      });
  }
  function addRole() {
    let departmentList = [];
  
    db.query("SELECT * FROM department ;", (err, results) => {
      if (err) throw err;
      departmentList = results.map((department) => ({
        name: `${department.name} department`,
        value: department.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary?",
          },
          {
            type: "list",
            name: "department",
            choices: departmentList,
            message: "What is the department?",
          }
         ] )
        .then(({ title, salary, department }) => {
          const sql =
            "insert into role(title,salary,department_id)values (?,?,?);";
          db.query(sql, [title, salary, department], (error, results, fields) => {
            if (error) {
              
              console.error(error);
              console.log("Failed to add role");
            } else {
              
              console.log(`Added role ${title}}`);
              initialQ();
            }
          });
        });
    });
  }
function initialQ () {
inquirer.prompt(question)
.then(ans=>{
    console.log(ans);
    switch (ans.option) {
        case "Want to try again?":
            initialQ()
            break;
        case "View All Employees":
            allEmployees();
            break;
        case "View All Roles":
            allRoles();
            break; 
        case "View All Departments":
            allDepartments();
            break;   
        case "Update Employee Role":
            updateEmployeeRole();
            break;    
        case "Add Employee":
            addEmp();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Department":
            addDept();
            break;

        default:
            break;
    }
})
}