const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false,
}));

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Dldudah12!',
    database:'userinfo',
    port:'3306',
});

router.get('/signup', (req, res, next) => {
    res.render('loginResource/signup', {title:"Index file haha @"});
});
router.post('/signup', (req, res, next) => {
    const body = req.body;
    const value = [body.username, body.userid, body.password, body.pwhintquestion, body.pwhintanswer]
    console.log(value);
    connection.query('INSERT INTO info VALUES (?,?,?,?,?)', [value], (err, results, fields) => {
        console.log('Data added !!');
    });
});
module.exports = router;