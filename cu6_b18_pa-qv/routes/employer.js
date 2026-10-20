/*
    INSTRUCTION: setup the routes for the employer entity according to the following requirements:
    - `GET /employers`: List all employers
    - `GET /employers/:id`: Get a specific employer by its id
    - `POST /employers`: Add a new employer
    - `PUT /employers/:id`: Update an employer
    - `DELETE /employers/:id`: Delete an employer
*/
const express = require("express");
const router = express.Router();
const { getEmployers, getEmployer, addNewEmployer, updateEmployer, deleteEmployer } = require("../controllers/employer");

router.get("/", getEmployers);
router.get("/:id", getEmployer);
router.post("/", addNewEmployer);
router.put("/:id", updateEmployer);
router.delete("/:id", deleteEmployer);

module.exports = router;
