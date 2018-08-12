const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const session = require('express-session');
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
app.use(session({
    key:'youngmo',
    secret:'mo',
    resave:true,
    saveUninitialized:true,
}));
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/loginResource'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,}));

const signupRouter = require('./loginResource/signup');
const userpageRouter = require('./loginResource/userpage');
app.use('/', signupRouter);
app.use('/', userpageRouter);
let visited = 0;

const renderPage = (req, res, headtext) => {
    req.session.prevurl = '/';
    res.render('loginResource/login.html',{text:headtext});
};

app.get('/', (req, res, next) => {
    console.log('main session : ', req.session.prevurl);
    if ((visited > 0 && !req.session.prevurl) || req.session.prevurl === '/loggout') {
        renderPage(req, res, 'Log out !!');
    } else if (req.session.prevurl === '/signup') {
        renderPage(req, res, 'Sign up finished! Please log in');
    } else {
        visited += 1;
        renderPage(req, res, `welcome! you visited here ${visited} times!`);
    }
});

app.post('/', (req, res, next) => {
    const body = req.body;
    connection.query('select username, userid, password, token from info where userid = ?', body.userid, (err, result) => {
        if (err) { next(err); }
        else {
            if (result.length === 0) {
                res.render('loginResource/login.html',{text: 'No corresponding User ID ! check again.'})
            } else {
                if (body.password === result[0].password) {
                    res.cookie(body.userid, result[0].token);
                    res.redirect('/user/' + body.userid);
                } else {
                    res.render('loginResource/login.html',{text: `Wrong password ${body.userid} !`})
                }
            }
        }
    });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error occured while reading login.html!');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error occured while checking ID / PW !');
});

app.listen(3500, () => {
    console.log('server is running !');
});
