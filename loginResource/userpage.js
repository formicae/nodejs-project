const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const session = require('express-session');
const cookiePaser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
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

router.get('/user/:id', (req, res, next) => {
    req.session.prevurl = `/user/${req.params.id}`;
    console.log('prev url',req.session);
    const transferredId = req.params.id;
    const browserCookie = req.cookies[transferredId];
    connection.query("select username, token from info where userid = ?", [transferredId], (err, result) => {
        if (err) next (err);
        if (browserCookie === result[0].token) {
            res.render('loginResource/userpage.html',{userid:transferredId});
        } else {
            console.log('Wrong cookie @@@@@@ ');
            req.session.save(function(error){
                res.redirect('/');
            });
        }
    });
});

router.get('/loggout', (req, res, next) => {
    req.session.prevurl = '/loggout';
    console.log('log out session : ',req.session);
    const allCookieName = Object.keys(JSON.parse(JSON.stringify(req.cookies)));
    allCookieName.forEach(cookie => {
        res.cookie(cookie, 'initial-cookie');
    });
    req.session.save(function(error){
        res.redirect('/');
    });
});

router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error occured while loading user page !');
});

module.exports = router;

