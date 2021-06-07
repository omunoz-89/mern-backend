// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;

// Models
const {User} = require('../models')

// controllers
const test = async (req, res) => {
    res.json({ message: 'User endpoint OK!'});
}
const signup = async (req, res) => {
    console.log('----- INSIDE OF SIGNUP -----')
    console.log('req.body =>', req.body)
    const {name, email, password} = req.body;

    try {
        //see if user exist in the database by email
        const user = await User.findOne({email})

        //if a user exist return 400 error
        if(user) {
            return res.status(400).json({message: 'Email already exists!'})
        } else {
            console.log('Create new user')
            let saltRounds = 12;
            let salt = await bcrypt.genSalt(saltRounds);
            let hash = await bcrypt.hash(password, salt);

            const newUser = new User({
                name,
                email,
                password: hash
            });

            const savedNewUser = await newUser.save()

            res.json(savedNewUser);
        }

    } catch (error) {
        console.log('Error inside of /api/users/signup');
        console.log(error);
        return.res.status(400).json({ message: 'Error occurred. Please try again....'})
    }
}

// routes
router.get('/test', test);

// POST api/users/signup (Public)
router.post('/signup', signup);

// POST api/users/login (Public)
// router.post('/login', login);

// GET api/users/current (Private)
// router.get('/profile', passport.authenticate('jwt', { session: false }), profile);
// router.get('/all-users', fetchUsers);

module.exports = router; 