const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookiePaser = require('cookie-parser');
const SECRET_KEY = 'secret';
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookiePaser());
app.use(session({
    key:'youngmo',
    secret:'mo',
    resave:true,
    saveUninitialized:true,
}));
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Dldudah12!',
    database:'userinfo',
    port:'3306',
});

router.get('/signup', (req, res, next) => {
    req.session.prevurl = '/signup';
    res.render('loginResource/signup.html', {title:"Index file haha @"});
});

router.post('/signup', (req, res, next) => {
    const bodyData = {"userid":req.body.userid,"password":req.body.password};
    const token = jwt.sign(bodyData, SECRET_KEY, {algorithm: 'HS256', expiresIn: '10m'});
    connection.query("INSERT INTO info(username, userid, password, token) VALUES ('"+req.body.username+"','"+req.body.userid+"','"+req.body.password+"','"+token+"')", (err, results, fields) => {
        if (err) throw err;
        console.log('data add to MySQL done!');
        res.cookie(req.body.userid,'initial-cookie');
        res.redirect('/');
    });
});

router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error occured while updating MySQL database !');
});

module.exports = router;
