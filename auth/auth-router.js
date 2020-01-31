const bc = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = require('../database/secrets.js');
const Users = require('./authModel.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bc.hashSync(req.body.password, 8);
  console.log(user)
  user.password = hash;
  
  Users.insert(user)
    .then(newUser => {
      console.log(newUser);
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message : "We ran into an issue saving new user."})
    })
  // implement registration
});

router.post('/login', (req, res) => {
  let{username, password} = req.body;

  Users.findBy({username})
    .first()
    .then(user => {
      if(user && bc.compareSync(password, user.password)){
        const token = generateToken(user);

        req.session.user = user;
        res.status(200).json({message: `Hello ${user.username}!`, token})
      } else {
        res.status(401).json({message: "missing a header"})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: `Sorry we ran into an issue: ${err}`})
    })
  // implement login
});

function generateToken(user){
  const payload = {
      subject: user.id,
      username: user.username
  };
  const options = {
      expiresIn: '3m'
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
