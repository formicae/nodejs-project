const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
var path = require ('path');
app.use(express.static(path.join(__dirname + '.../public')));
app.set('views', __dirname + 'views');
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Dldudah12!',
    database:'userinfo',
    port:'3306',
});

app.use(bodyParser.urlencoded({
    extended: false,
}));

app.listen(3000, () => {
    console.log('server is running !');
    connection.connect();
});
app.get('/', (req, res, next) => {
    res.render('login');
});

app.get('/main', (req, res, next) => {
    res.render('main');
});

app.get('/', (req, res, next) => {
    res.render('createid');
});

app.post('/', (req, res, next) => {
    const body = request.body;
    const allInfo = connection.query('select * from info', (err, results, fields) => {
        if (allInfo.includes(body.userid)) {
            console.log('Welcome !')
            app.redirect('/main');
        } else {
            alert('해당 아이디가 없습니다!')
        }
    });

})

// const htmlFileRead = (filename, res) => {
//     fs.readFile(`./${filename}.html`, (err, data) => {
//         if (err) console.log('file read failed : ', err);
//         res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//         res.end(data);
//     });
// };

const errorHandler = function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Error occurred !');
};

// app.use(errorHandler);