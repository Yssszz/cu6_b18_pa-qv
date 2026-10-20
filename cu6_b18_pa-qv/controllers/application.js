/*
    INSTRUCTION: setup the controller functions to handle job applications
    - getApplicationsByJob - Retrieve all applications for a specific job (use `populate()` to get job details)
    - createApplication - Create a new application for a job (ensure no duplicate applications for the same email and job)
*/
const Application = require("../models/application");

const getApplicationsByJob = async (req, res) => {
    try {
        const { job } = req.query;
        const filter = job ? { job } : {};
        const applications = await Application.find(filter).populate("job");
        res.json(applications);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createApplication = async (req, res) => {
    try {
        const { job, email } = req.body;
        const existing = await Application.findOne({ job, email });
        if (existing) {
            return res.status(409).json({ message: "You have already appliet for this job" });
        }
        const application = await Application.create(req.body);
        res.status(201).json(application);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getApplicationsByJob, createApplication };
