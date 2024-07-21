// Import Express
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const apiRoutes = require('./Api.js');

const app = express();
const PORT = 3000;

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'mysql-295b70c4-dbdev.b.aivencloud.com',
  port: '13399',
  user: 'dbuser',
  password: 'pw2db123!',
  database: 'teste',
});

// Test the MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection back to the pool
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'sua_chave_secreta_aqui',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Cookie enviado apenas através de conexões seguras (HTTPS)
}));

// Middleware to parse request bodies
app.use(express.json());

app.use(express.static("public"));
app.use('/api', apiRoutes(pool));

// Define a GET route for the root path
function isAuthenticated(req, res, next) {
  if (req.session.user) next()
  else next('route')
}

app.get('/', isAuthenticated, function (req, res) {
  // this is only called when there is an authentication user due to isAuthenticated
  res.send('hello, ' + escapeHtml(req.session.user) + '!' +
    ' <a href="/logout">Logout</a>')
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  //res.send("Hello world not about");
});

app.get('/faq.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'faq.html'));
  //res.send("Hello world not about");
});

app.get('/404.html', (req, res) => {
  res.sendFile(path.join(__dirname, '404.html'));
  //res.send("Hello world not about");
});

app.get('/html.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html.html'));
  //res.send("Hello world not about");
});

app.get('/PoliticaSeguranca.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'PoliticaSeguranca.html'));
  //res.send("Hello world not about");
});

app.get('/procura.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'procura.html'));
  //res.send("Hello world not about");
});

app.get('/restaurarsenha.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'restaurarsenha.html'));
  //res.send("Hello world not about");
});

app.get('/signin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'signin.html'));
  //res.send("Hello world not about");
});

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/suporte.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'suporte.html'));
  //res.send("Hello world not about");
});

/*app.post('/dados', (req, res) => {
  //console.log(post.user);
  pool.query(
    'SELECT * FROM ecr, devices, users WHERE user.id = devices.user_id AND ecr.device_id = devices.id',
    [username, password],
    function (err, rows, results, fields) {
      console.log(rows[0].mid);
      if (err) {
        console.error(err);
      } else if (results.length == 0) {
        return res.status(401).send('Credenciais inválidas');
      } else {
        //console.log(rows[0].id);
        req.session.user = { id: rows[0].id, user: rows[0].user };
        res.send('Login bem-sucedido');
      }
    }
  );
});*/

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
