const express = require('express');
const router = express.Router();
const User = require('../model/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js');

router.post('/register', async (req, res) => {
    let { username, name, email, password  } = req.body;

    try {
        
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        user = new User({username, name, email, password  });

        await user.save();
        const payload = { userId: user.id };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '100h' });

        res.status(201).json({ msg: 'User registered successfully' , token:token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
console.log(email);

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        
        const payload = { userId: user.id };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '100h' });

        res.json({ token });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ msg: 'Server error', error: error.message });

    }
});

router.get('/user', auth, async (req, res) => {
    try {
        const id = req.body
        console.log(id);
        
        const user = await User.findById(id).select('-password'); // Exclude password from the returned user
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).json({ msg: 'Server error' });
    }
});
module.exports = router;
