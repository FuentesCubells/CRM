const express = require('express');
const {registerUser, loginUser, changePassword} = require('../../../application/authService');

const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await loginUser(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

router.post('/change-password', async (req, res) => {
    try {
        const user = await changePassword(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
