const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Dldudah12!',
    database:'comicbook',
    port:'3306',
});

const app = express();
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.listen(3000, () => {
    console.log('server is running !');
    connection.connect();
});

app.get('/', (request, response) => {
    fs.readFile('bookList.html', 'utf-8', (err, data)  => {
        if (err) throw err;
        connection.query('select * from books', (error, results, fields) => {
            if (error) throw error;
            response.send(ejs.render(data, {
                data:results,
            }));
        });
    });
});

app.get('/create', (req, res) => {
    fs.readFile('insertNewBook.html', (err, data) => {
        if (err) throw err;
        res.end(data);
    });
});

app.post('/create', (req,res) => {
    const body = req.body;
    // console.log('req body : ', body);
    connection.query('select * from books', (err, results, fields) => {
        results.forEach(user = (data, index) => {
            console.log(data.number);
            if (data.name === 'one-piece') {
                console.log('found !!', data.name, data.writer);
            }
        })
        console.log('all data : ',results);
    })
    connection.query('insert into books (genre, name, writer, releasedate) value (?,?,?,?) ',[body.genre, body.name, body.writer, body.releasedate], () => {
        res.redirect('/');
    });
});