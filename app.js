require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const connString = 'mongodb+srv://Admin1:Admin1@cluster0.l21peun.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const fs = require('fs');
const cert = fs.readFileSync('Keys/certificate.pem');
const options= {
    servers:{sslCA:cert}};
const hsts = require('./middleware/hsts');
const { error } = require('console');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//DB
mongoose.connect(connString)
.then(()=>{
    console.log('Connected :-)');
})
.catch(()=>{
    console.log('Not Connected :-(');

},options);

//Middleware (CORS)
app.use(
    cors({
      origin: 'http://localhost:4200',
      optionsSuccessStatus: 200
    })
  );
// Use Helmet middleware for security headers
app.use(helmet());
// Use Morgan middleware for request logging
app.use(morgan('combined'));
//express
app.use(express.json());
app.use(hsts);

//Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/user'));
app.use('/api/BulletinBoards',require('./routes/BulletinBoard'));

https.createServer(
    {
        key: fs.readFileSync('Keys/privatekey.pem'),
        cert: fs.readFileSync('Keys/certificate.pem')
    },app).listen(3000);


module.exports = app;
