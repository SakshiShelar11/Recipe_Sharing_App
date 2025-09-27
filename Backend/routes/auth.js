const express = require('express');
const router = express.Router();

// Simple auth routes that will be handled in server.js
router.get('/', (req, res) => {
    res.json({ message: 'Auth routes' });
});

module.exports = router;