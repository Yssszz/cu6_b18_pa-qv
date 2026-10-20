/*
    INSTRUCTION: setup the employer controller with the following functions:
    - getEmployers - Retrieve all employers
    - getEmployer - Retrieve a specific employer
    - addNewEmployer - Add a new employer
    - updateEmployer - Update an employer
    - deleteEmployer - Delete an employer
*/
const Employer = require("../models/employer");

const getEmployers = async (req, res) => {
    try {
        const employers = await Employer.find();
        res.json(employers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getEmployer = async (req, res) => {
    try {
        const employer = await Employer.findById(req.params.id);
        if (!employer) return res.status(404).json({ message: "Employer not found" });
        res.json(employer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const addNewEmployer = async (req, res) => {
    try {
        const employer = await Employer.create(req.body);
        res.status(201).json(employer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateEmployer = async (req, res) => {
    try {
        const employer = await Employer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!employer) return res.status(404).json({ message: "Employer not found" });
        res.json(employer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteEmployer = async (req, res) => {
    try {
        const employer = await Employer.findByIdAndDelete(req.params.id);
        if (!employer) return res.status(404).json({ message: "Employer not found" });
        res.json({ message: "Employer deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getEmployers, getEmployer, addNewEmployer, updateEmployer, deleteEmployer };
