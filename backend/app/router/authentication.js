const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { eventsConnection } = require("../db");
const { defaultCallback } = require("../utils/dbUtils");
const { verifyToken } = require("../utils/authenticationUtils");

const router = express.Router();

router.post("/register", (req, res) => {
  const { body } = req;
  const { email, name, surname, password } = body;

  const hashedPassword = bcrypt.hashSync(password, 12);

  eventsConnection.execute(
    "INSERT INTO employees (email, name, surname, password) VALUES (?, ?, ?, ?)",
    [email, name, surname, hashedPassword],
    (err, result) => defaultCallback(err, result, res)
  );
});

router.post("/login", (req, res) => {
  const { body } = req;
  const { email, password } = body;

  const incorrectCredentialsResponse = () =>
    res.json({
      message: "Incorrect email or password",
    });

  if (!email || !password) {
    incorrectCredentialsResponse();
    return;
  }

  eventsConnection.execute(
    "SELECT * FROM employees WHERE email=?",
    [email],
    (err, result) => {
      if (result.length === 0) {
        incorrectCredentialsResponse();
      } else {
        const employee = result[0];
        const isPasswordCorrect = bcrypt.compareSync(
          password,
          employee.password
        );

        const { employee_id, email } = employee;

        if (isPasswordCorrect) {
          const token = jwt.sign(
            { employee_id, email },
            process.env.JWT_SECRET
          );
          res.json({
            message: "Successfully logged in!",
            token,
          });
        } else {
          incorrectCredentialsResponse();
        }
      }
    }
  );
});

router.get("/token/verify", verifyToken, (req, res) => {
  res.json(res.locals.user);
});
module.exports = router;
