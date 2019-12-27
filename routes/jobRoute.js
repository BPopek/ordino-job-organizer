const express = require('express');
const jobRouter = express.Router();
const Job = require("../models/Job")

jobRouter.get('/', (req, res, next) => {
    Job.find({ user: req.user._id }, (err, jobs) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(jobs);
    });
});

jobRouter.post('/', (req, res, next) => {
    const job = new Job(req.body);
    job.user = req.user._id;
    job.save(function (err, newJob) {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(newJob);
    });
});

jobRouter.get('/:jobId', (req, res, next) => {
    Job.findOne({ _id: req.params.jobId, user: req.user._id },
        (err, job) => {
            if (err) {
                res.status(500);
                return next (err);
            } else if (!job) {
                res.status(404)
                return next(new Error("No job listing found."));
            }
            return res.send(job);
        }
    );
});

jobRouter.put('/:jobId', (req, res, next) => {
    Job.findOneAndUpdate(
        { _id: req.params.jobId, user: req.user._id },
        req.body,
        { new: true },
        (err, job) => {
            if (err) {
                console.log("Error");
                res.status(500);
                return next(err);
            }
            return res.send(job);
        }
    );
})

jobRouter.delete('/:jobId', (req, res, next) => {
    Job.findOneAndRemove({ _id: req.params.jobId, user: req.user._id }, (err, job) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.send(job);
    });
});

module.exports = jobRouter;