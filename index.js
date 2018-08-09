const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/loginResource'));
app.use(bodyParser.urlencoded({extended: false,}));

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Dldudah12!',
    database:'userinfo',
    port:'3306',
});

app.get('/', (req, res, next) => {
    res.render(__dirname + '/loginResource/login.html');
});
app.post('/', (req, res, next) => {
    const body = req.body;
    const importData = connection.query('select * from info', (err, data) => {
        console.log(data);
        // console.log(allInfo.username, allInfo.userid, allInfo.password);
    });

});

const signupRouter = require('./loginResource/signup');
app.use('/', signupRouter);


app.listen(3500, () => {
    console.log('server is running !');
});
