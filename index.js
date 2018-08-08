const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const path = require ('path');
app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(bodyParser.urlencoded({extended: false,}));
const loginRouter = require('./loginResource/login');

app.use('/', loginRouter);

router.get('/example', (req, res, next) => {
    res.render('example.html',)
    console.log('second server');
    next();
});

app.listen(3000, () => {
    console.log('server is running !');
});
