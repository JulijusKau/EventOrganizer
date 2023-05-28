const express = require("express");
const { eventsConnection } = require("../db");
const { defaultCallback } = require("../utils/dbUtils");
const { verifyToken } = require("../utils/authenticationUtils");

const router = express.Router();

router.get("/employees", verifyToken, (req, res) => {
  eventsConnection.execute("SELECT * FROM employees", (err, result) =>
    defaultCallback(err, result, res)
  );
});

router.get("/employees/:employee_id", verifyToken, (req, res) => {
  const { employee_id } = req.params;
  eventsConnection.execute(
    "SELECT * FROM employees WHERE employee_id=?",
    [employee_id],
    (err, result) => defaultCallback(err, result, res)
  );
});

module.exports = router;
