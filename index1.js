function addEmployees() {
  inquirer.prompt(employeeQuestions)
  .then(answersObj=>{

      connection.query(`
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  SELECT "${answersObj.firstname}", "${answersObj.lastname}", role.id, employee.id
  FROM role
  JOIN employee ON employee.role_id = role.id
  WHERE role.title = "${answersObj.employeerole}" AND CONCAT(employee.first_name,' ', employee.last_name) = "${answersObj.manager}"`, 
  function (err) {
  if (err) throw err
  console.log("Employee Added");
  
  runQuestion();
    })
  })
}


function addRoles() {
  inquirer.prompt(roleQuestions)
  .then(answersObj=>{
//SELECT is giving the values to title, salary, and role
  connection.query(`INSERT INTO role (title, salary, department_id)
  SELECT “${answersObj.title}“, ${answersObj.salary}, department.id
  FROM department
  WHERE department.name = “${answersObj.deptrole}“`,
  function (err){
    if(err) throw err;
    console.log('Role Added');
    runQuestion()
  })
  })
}


function addDepartment()
 {
  inquirer.prompt(departmentQuestions)
  .then(answersObj=>{
    connection.query(`INSERT INTO department(name) values(“${answersObj.dept}“)`, function (err){
      if(err) throw err;
      console.log('Department Added');
  runQuestion();
    })
  })
}