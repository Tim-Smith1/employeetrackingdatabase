const question = [
    {
       type: 'list',
     message: 'What would you like to do?',
     choices: ["View All Employees", "View All Roles", "View All Departments", "Update Employee Role", "Add Employee", "Add Role", "Add Department", "Quit", "Want to try again?"],
     name: 'option' 
    },

]

const departmentQuestions = [
  {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'department',
  },
] 
module.exports = question;