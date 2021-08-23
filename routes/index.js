var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var session = require("express-session");

// Models
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  if (!req.session.email || req.session.email == 0) {
    res.render('login', { title: 'Login' });
  } else {
    res.redirect('/');
  }
});

router.post('/login', function(req, res, next) {
  // console.log(req.body);
  username = req.body.username;
  password = req.body.password;

  global.res = res;

  User.find({'username': username }).then((res) => {
    // console.log(res.pass_hashed);

    if (res.length) {
      user = res[0];
      pass_hashed = user.pass_hashed;
      
      if (bcrypt.compareSync(password, pass_hashed)) {
        req.session.email = user.email;
        global.res.send('<script>location.href = "' + DOMAIN + '"</script>');
      } else {
        // Password is wrong
      }
    } else  {
      // User doesn't exists
    }
    
  });

  res.render('login', { title: 'Login' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });

  // Hashing the password
  // try {
  //   bcrypt.genSalt(10, function(err, salt) {
  //       bcrypt.hash(password, salt, function(err, hash) {
  //           console.log(hash);
  //       });
  //   });

  // } catch (e) {
  //   console.log(e);
  // }
});

router.get('/logout', function(req, res, next) {
  req.session.email = 0;
  res.redirect('/');
});

module.exports = router;
