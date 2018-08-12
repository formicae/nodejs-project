const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cookiePaser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Dldudah12!',
    database:'userinfo',
    port:'3306',
});

app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(cookiePaser());
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/loginResource'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,}));

let visited = 0;
app.get('/', (req, res, next) => {
    console.log(req.cookies);
    const allCookieName = Object.keys(JSON.parse(JSON.stringify(req.cookies)));
    if (visited === 0) {
        for (let i = 0; i < allCookieName.length; i++) {
            res.cookie(allCookieName[i], 'initial-cookie');
        }
    }
    visited += 1;
    fs.readFile('loginResource/login.html', 'utf-8', (err, data) => {
        if (err) next(err);
        res.send(ejs.render(data, {text: `welcome! you visited here ${visited} times!`}));
    });
});

app.get('/user/:id', (req, res, next) => {
    const transferredId = req.params.id;
    const browserCookie = req.cookies[transferredId];
    connection.query("select username, token from info where userid = ?", [transferredId], (err, result) => {
        if (err) next (err);
        if (browserCookie === result[0].token) {
            res.sendFile(__dirname+'/loginResource/userpage.html',{userid:transferredId});
            //// send html file for log out -> if log out, cookie must be re-initialized.
        } else {
            console.log('Wrong cookie @@@@@@ ');
            res.redirect('/');
        }
    });
});

app.post('/', (req, res, next) => {
    const body = req.body;
    const bodyData = {"userid":body.userid,"password":body.password};
    connection.query('select username, userid, password, token from info where userid = ?', body.userid, (err, result) => {
        if (err) { next(err); }
        else {
            if (result.length === 0) {
                console.log('No corresponding User ID ! check again.');
            } else {
                if (body.password === result[0].password) {
                    // const browserToken = req.cookies[body.userid];
                    // console.log('MySQL token : ',token);
                    // console.log('browser token : ', browserToken);
                    res.redirect('/user/' + body.userid);
                } else { console.log(`Wrong password ${body.userid} !`); }
            }
        }
    });
});

const signupRouter = require('./loginResource/signup');
app.use('/', signupRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error occured while reading login.html!');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error occured while loading user page !');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error occured while checking ID / PW !');
});

app.listen(3500, () => {
    console.log('server is running !');
});
