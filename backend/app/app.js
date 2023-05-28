const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = 5000;

const employeesRouter = require("./router/employees");
const clownsRouter = require("./router/clowns");
const authenticationRouter = require("./router/authentication");

const app = express();

app.use(cors());
app.use(express.json());
app.use(employeesRouter);
app.use(clownsRouter);
app.use(authenticationRouter);

app.listen(port, () => {
  console.log(`Congratulations your Server is running on port: ${port}`);
});
