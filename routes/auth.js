const express = require('express');
const User = require("../models/User");
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

authRouter.post('/signup', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, existingUser) => {
        if (err) {
            res.status(500);
            // console.log('test1')
            return next(err);
        } else if (existingUser !== null) {
            res.status(400);
            return next(new Error('That username already exists, please try again.'));
        }
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) { 
                res.status(500)
                if (err.name === 'ValidationError'){
                    return next(new Error('Please fill out both fields.'))
                } else {
                    return next(err);
                }
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            return res.status(201).send({ success: true, user: user.withoutPassword(), token });
        });
    });
});

authRouter.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err){
            res.status(500)
            return next(err);
        } if (!user) {
            res.status(403)
            return next(new Error("Username or password are incorrect."))
        }
        user.checkPassword(req.body.password, (err, match) => {
            if (err) {
                res.status(500)
                return next(err);
            } if (!match) {
                res.status(401)
                return next(new Error("Username or password are incorrect."))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            return res.send({ token, user: user.withoutPassword(), success: true })
        })
    });
});

module.exports = authRouter;