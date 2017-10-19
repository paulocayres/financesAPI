var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var users = [
  {id: 1, name: "Paulo", email: "paulo.cayres@gmail.com", password: "pccr0976"},
  {id: 2, name: "Christine", email: "christine.smm@gmail.com", password: "209098"}
  ];
  

module.exports = router;
