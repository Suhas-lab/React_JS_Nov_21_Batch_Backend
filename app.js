const express = require("express");
const mysql = require("mysql");
var cors = require('cors');
var bodyParser = require('body-parser');
const { loginValidation } = require("./app/validation");
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync();
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manifold_db'
});

connection.connect((err) =>{
    if(err){
        console.log("Error in connection establish")
    }else{
        console.log("We are connected with mysql database")
    }
});

app.get('/userdetails', (req, res) =>{
    let sqlQry = 'SELECT * FROM user_login';
    connection.query(sqlQry, (err, result)=>{
        if(err){
            res.status(500).send({error: "Something going wrond"})
        }else{
            res.status(200).send(result)
        }
    })
});

app.post('/login', loginValidation, (req, res, next) =>{
    let userQuery = `SELECT * FROM users WHERE email = "${req.body.email}";`
    connection.query(userQuery, (err, result) =>{
        console.log("err =>", err);
        console.log("result =>", result);

        if (err) {
            throw err;
            return res.status(400).send({
              msg: err
            });
          }
          if (!result.length) {
            return res.status(401).send({
              msg: 'Email or password is incorrect!'
            });
          }
          console.log("req.body.password => ", req.body.password);
          console.log("result[0]['password'] =>", result[0]['password']);
        
        bcrypt.hash(result[0]['password'], salt, function(err, hash){
            if(err) throw err;
            bcrypt.compare(req.body.password, hash, function(err, iMatch) {
              if (err) { throw (err); }
              console.log("iMatch =>", iMatch); 
              if(iMatch){
                const token = jwt.sign({id:result[0]['id']},'the-super-strong-secrect',{ expiresIn: '1h' });
                connection.query(
                  `UPDATE users SET last_login = now() WHERE id = ${result[0]['id']}`
                );
                return res.status(200).send({
                  msg: 'Logged in!',
                  token,
                  user: result[0]
                });
              }
            });
        });
    })
});

app.post('/doregister', (req, res) =>{
    let regQry = 'INSERT INTO user_login (username_email, password) VALUES (?)';
    let values = [req.body.username_email, req.body.password];
    connection.query(regQry, [values], (err, result) =>{
        if(err){
            res.status(400).send({error: "Something went wrong"})
        }else{
            res.status(200).send("User register successfully");
        }
    })
})

app.listen('4000', ()=>{
    console.log("Server has been started")
})