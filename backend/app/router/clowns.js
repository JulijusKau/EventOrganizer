const express = require("express");
const { eventsConnection } = require("../db");
const { defaultCallback } = require("../utils/dbUtils");
const { verifyToken } = require("../utils/authenticationUtils");

const router = express.Router();

router.get("/clowns", verifyToken, (req, res) => {
  const { limit } = req.query;

  eventsConnection.execute(
    `SELECT * FROM clowns LIMIT ${limit}`,
    (err, result) => defaultCallback(err, result, res)
  );
});

router.get("/specificClowns/:employee_id", verifyToken, (req, res) => {
  const { employee_id } = req.params;

  eventsConnection.execute(
    `SELECT * FROM clowns WHERE employee_id=?`,
    [employee_id],
    (err, result) => defaultCallback(err, result, res)
  );
});

router.delete("/clowns/:clown_id", verifyToken, (req, res) => {
  const { clown_id } = req.params;

  eventsConnection.execute(
    "DELETE FROM clowns WHERE clown_id=?",
    [clown_id],
    (err, result) => defaultCallback(err, result, res)
  );
});

router.post("/clowns", verifyToken, (req, res) => {
  const {
    body: { name, surname, email, phone_number, employee_id },
  } = req;

  eventsConnection.execute(
    "INSERT INTO clowns (name, surname, email, phone_number, employee_id) VALUES (?, ?, ?, ?, ?)",
    [name, surname, email, phone_number, employee_id],
    (err, result) => defaultCallback(err, result, res)
  );
});

router.put("/clowns/:clown_id", verifyToken, (req, res) => {
  const { body } = req;
  const { clown_id } = req.params;

  eventsConnection.execute(
    "UPDATE clowns SET name=?, surname=?, email=?, phone_number=? WHERE clown_id=?",
    [body.name, body.surname, body.email, body.phone_number, clown_id],
    (err, result) => defaultCallback(err, result, res)
  );
});

module.exports = router;
