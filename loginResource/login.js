const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login', {title:"Index file haha @"});
});

module.exports = router;