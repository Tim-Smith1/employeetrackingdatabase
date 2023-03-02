
INSERT INTO department (name) 
VALUES ('Account'), 
       ('IT'), 
       ('Creative');


INSERT INTO role (title, salary, department_id)
VALUES ('Administrator', 90000.00, 2),
       ('Account Manager', 70000.00, 1),
       ('Present Giver', 80000.00, 3);
-- ('John', 'Doe', 3, null),
--needed 1 employee for manager_id to work.
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES ('Huckleberry', 'Finn', 2, 14),
       ('Santa', 'Clause', 1, 14);







INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES (uiFirstname, uiLastname, uiRoleId, uiManagerId);


-- testing
UPDATE employee SET role_id = 1 WHERE role_id = 2;