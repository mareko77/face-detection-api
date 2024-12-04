const express = require('express');
//const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host : 'dpg-ct76s5rtq21c73bju5o0-a',
    user : 'smartbrain_zave_user',
    password : 'lH8nGC9uVUDELKBin7Z9I8hzhhvgX8MI',
    database : 'smartbrain_zave'
  }
});

const app = express();


app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3002, ()=> {
  console.log('app is running on port 3002');
})
