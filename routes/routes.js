var passport = require('passport');
var Account = require('../models/account');

module.exports = function (app) {

  app.use(require('body-parser').urlencoded({ extended: true }));

  app.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  /*app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('profile', { user: req.user });
  });*/

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }
    });
    passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/login'} );
    res.redirect('/index');
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}) );

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

}