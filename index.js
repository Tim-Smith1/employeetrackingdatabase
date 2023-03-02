const mysql = require('mysql2');
const question = require('./questions');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        // MySQL username,
        user: 'root',
        password: 'rootroot',
        database: 'employee_db'

    },
    console.log(`Connected to the classlist_db database.`)
);

init();
function init(){
    initialQ();
};


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
      // First, get the list of employees from the database
      db.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
    
        // Then, map the results to an array of employee names and ids
        const employeeList = results.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
    
        // Finally, prompt the user to select an employee and a new role
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
    
            // Update the employee's role in the database
            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
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

function addEmployee() {
        inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
          })
          .then(({ name }) => {
            db.query('INSERT INTO department SET ?', { name }, (err, results) => {
              if (err) throw err;
              console.log(`${results.affectedRows} department added.`);
              startApp();
            });
          })
};

function addRole() {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?'
    })
    .then(({ title }) => {
        db.query('INSERT INTO role SET?', { title }, (err, results) => {
            if (err) throw err;
            console.log(`${results.affectedRows} role added.`);
            startApp();
        });
    })
};

// function addDepartment() {
//     inquirer.prompt
//     (deparmentQuestions)
//    .then(ans =>{
//     connection.query(`INSERT INTO department (name) VALUES ('${ans.name}')`, function(err) {
//         if (err) throw err;
//         console.log(`${ans.name} department added.`)})})};
   


function initialQ () {
inquirer.prompt(question)
.then(ans=>{
    console.log(ans);
    // ans.option === "want to try again" ? initialQ() : process.exit();
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
        case "Add a Employee":
            addEmployee();
            break;
        case "Add a Role":
            addRole();
            break;
        case "Add a Department":
            addDepartment();
            break;

        default:
            break;
    }
})
}





// function addEmployee() {
// inquirer.prompt({
//     type: 'input',
//     name: 'name',
//     message: 'What is the name of the department?'
//   }).then(({ name }) => {
//     db.query('INSERT INTO department SET ?', { name }, (err, results) => {
//       if (err) throw err;
//       console.log(`${results.affectedRows} department added.`);
//       startApp();
//     });
//   })
// };

//inquirer.prompt({
    //     type: 'input',
    //     name: 'name',
    //     message: 'What is the name of the department?'
    //   }).then(({ name }) => {
      
    //     // Build the SQL insert statement
    //     const sql = 'INSERT INTO department SET ?';
        
    //     // Execute the insert statement with the provided parameters
    //     connection.query(sql, { name }, (error, results, fields) => {
    //       if (error) {
    //         // Display an error message to the user if the insert statement fails
    //         console.error(error);
    //         console.log('Failed to add department');
    //       } else {
    //         // Display a success message to the user if the insert statement succeeds
    //         console.log(`Added department ${name}`);
    //       }
          
    //       // Close the database connection
    //       connection.end();
    //     });
    //   });
    // }
// inquirer.prompt({
//     type: 'input',
//     name: 'name',
//     message: 'What is the name of the department?'
//   }).then(({ name }) => {
//     db.query('INSERT INTO department SET ?', { name }, (err, results) => {
//       if (err) throw err;
//       console.log(`${results.affectedRows} department added.`);
//       startApp();
//     });
//   });
// }