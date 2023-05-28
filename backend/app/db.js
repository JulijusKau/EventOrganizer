const mysql = require("mysql2");

const mysqlConfigBase = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
};

const eventsConnection = mysql.createConnection({
  ...mysqlConfigBase,
  database: "",
});

eventsConnection.query("CREATE DATABASE IF NOT EXISTS events", function (err) {
  if (err) throw err;
  console.log("Database events created");

  eventsConnection.query("USE events", (err) => {
    if (err) throw err;

    const employeesTableQuery = `
      CREATE TABLE IF NOT EXISTS employees (
        employee_id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        password VARCHAR(100) NOT NULL,
        primary key (employee_id),
        unique key (email)

      )
      `;

    eventsConnection.query(employeesTableQuery, function (err) {
      if (err) throw err;
      console.log("Employees table created");
    });

    const clownsQuery = `
    CREATE TABLE IF NOT EXISTS clowns (
      clown_id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      surname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone_number VARCHAR(100) NOT NULL,
      employee_id INT NOT NULL,
      primary key (clown_id)

    )
    `;

    eventsConnection.query(clownsQuery, function (err) {
      if (err) throw err;
      console.log("Clowns table created");
    });
  });
});

module.exports = {
  eventsConnection,
};
