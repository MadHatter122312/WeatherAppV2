'use strict';

let User = require('../models/user');
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;


router.route('/login')
  .post( (req, res) => {
    let userParams = req.body;
    User.findOne({email: userParams.email}, (error, user) => {
      if (error) {
        throw error;
      }
      else if (!user) {
        res.status(500).json({message: 'User not found!'});
      }
      else {
        user.authenticate(userParams.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            let token = jwt.sign(user, secret, {expiresIn: 1444000});

            res.json({
              success: true,
              message: 'Authorization successful',
              user: user._doc,
              token: token
            });
          }
          else {
            return res.status(401).send({message: 'unauthorized access'})
          }
        });
      }
    });
  });

router.route('/new')
  .post( (req, res) => {
    //create new user route

    let user = new User(req.body);
    debugger;
    user.save( (error) => {
      if (error) {
        res.json({
          message: 'Could not create new user because of:' + error,
          success: false
        });
      }
      else {
        res.json({
          user: user,
          success: true
        });
      }
    });
  })

//middleware for token authentication
router.use( (req,res,next) => {
  let token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(401).json({message: 'Token was not authorized'})

      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).json({message: "Token absent, premission denied"})
  }
});

router.route('/:id')
  .get( (req, res) => {
    //gets a user page

  })
  .put( (req, res) => {
    //updates a user
    let userID = req.params.id;
    let newQuery = req.body.newQuery;
    let removeQuery = req.body.removeQuery;
    if (removeQuery) {
    User.findByIdAndUpdate(
      userID,
      {$pull: {queries: removeQuery}},
      {new: true},
      (error, user) => {
        if(error) res.status(400).send({message: error.errmsg});

        else return res.status(202).json(user);
      });
    }

    else if (newQuery) {
      //adds a new query
      User.findByIdAndUpdate(
        userID,
        {$push: {queries: newQuery}},
        {new: true},
        (error, user) => {
          if(error) res.status(400).send({message: error.errmsg});

          else return res.status(202).json(user);
        });
      }
    else {
      res.status(500).json({message: "something went wrong!"});
    }
  })

module.exports = router;
