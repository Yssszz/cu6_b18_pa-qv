/*
    INSTRUCTION: setup the job controller with the following functions:
    - getJobs - Retrieve all jobs (use `populate()` to get employer details)
    - getJob - Retrieve a specific job (use `populate()` to get employer details)
    - addNewJob - Add a new job
    - updateJob - Update a job
    - deleteJob - Delete a job
*/
const Job = require("../models/job");

const getJobs = async (req, res) => {
    try {
        const { title, location, category, employer, sortBy = "postedDate", order = "desc" } = req.query;
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);

        const filter = {};
        if (title) filter.title = { $regex: title, $options: "i" };
        if (location) filter.location = { $regex: location, $options: "i" };
        if (category) filter.category = category;
        if (employer) filter.employer = employer;

        const total = await Job.countDocuments(filter);
        const jobs = await Job.find(filter)
            .populate("employer")
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({ total, page, limit, totalPages: Math.ceil(total / limit), data: jobs });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("employer");
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const addNewJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json({ message: "Job deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getJobs, getJob, addNewJob, updateJob, deleteJob };
