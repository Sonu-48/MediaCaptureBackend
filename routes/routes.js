const express = require('express');
const router = express.Router();
const File = require('../models/file')
const upload = require('../utils/multer');
const User = require('../models/users');
const jwt = require('jsonwebtoken')


router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Signup api
router.post('/api/signup', async (req, res) => {
    const { firstname, lastname, email, password, phonenumber } = req.body;
    try {
        //Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: "User already exists" })
        }
        // Create a user
        const createUser = new User({
            firstname,
            lastname,
            email,
            password,
            phonenumber
        });
        const result = await createUser.save();
        if (result) {
            res.status(200).json({ msg: "User registered successfully" })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

// Login api
router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.find({ email, password })
        if (!user) {
            res.status(400).json({ msg: "User not found" })
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
})


//File upload api
router.post('api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ msg: "No file uploaded" })
        }
        // Create a new file document
        const newFile = new File({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            size: req.file.size,
            data: req.file.buffer,
        });
        const result = await newFile.save();
        if (result) {
            res.status(200).json({ msg: "File uploaded successfully" })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// get file api
router.get('api/getfile', async (req, res) => {
    try {
        const file = await File.find();
        if (file.length > 0) {
            res.status(200).send(file);
        }
        else {
            res.status(400).send("No file found")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error")
    }
})

module.exports = router;
