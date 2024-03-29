const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',      // Enter your creds from postgreSQL
  connection: {
    host : '127.0.0.1', //localhost
    user : 'postgres', //add your user name for the database here
    password : '', //add your correct password in here
    database : 'face_recognition' //add your database name you created here
  }
});

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => { res.send('successfully mounted up') })

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db)} )

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
  console.log('app is running on port 3000')
})
