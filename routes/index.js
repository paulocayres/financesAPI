var express = require('express');
var router = express.Router();

/*
// Funcionalidade de autenticação de usuário.
router.post("/token", function(req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
    var user = users.find(function(u) {
      return u.email === email && u.password === password;
    });
    if (user) {
      var payload = {id: user.id};
      var token = jwt.encode(payload, cfg.jwtSecret);
      res.json({token: token});
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});


//Solicita id do usuário autenticado.
router.get("/user", auth.authenticate(), function(req, res) {
  res.json(users[req.user.id]);
});*/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

/* POST ONE Agenda. */
router.post('/agendas', function(req, res, next) {
  var db = require('../db');
  var Agenda = db.Mongoose.model('agendas', db.AgendaSchema, 'agendas');
  //var newAgenda = new Agenda({name: req.body.name, email: req.body.email});


  Agenda.create(req.body, function(err, agenda){
    if (err) {
      res.status(500).json({error: err.message});
      res.end();
      return;
    }
    res.json(agenda);
    res.end();

  });

});


/* Put - Altera uma agenda existente*/
router.put('/agendas/:id', function(req, res, next) {
  console.log(req.params.id);
  console.log(req.body);
  var db = require('../db');
  var Agenda = db.Mongoose.model('agendas', db.AgendaSchema, 'agendas');


  Agenda.findByIdAndUpdate(req.body._id, req.body, function(err, agenda) {


    if (err) {
      console.log('Erro');
    } else {
      res.json(agenda);
      res.send();
      res.end();
    }
  });
});

/* GET all agendas.*/
router.get('/agendas', function(req, res, next) {
  var db = require('../db');
  var Agenda = db.Mongoose.model('agendas', db.AgendaSchema, 'agendas');

  Agenda.find({}).lean().exec(function(e, docs) {
    res.json(docs);
    res.end();
  });
});

/* GET ONE Agenda. */
router.get('/agendas/:id', function(req, res, next) {
  var db = require('../db');
  var Agenda = db.Mongoose.model('agendas', db.AgendaSchema, 'agendas');
  Agenda.find({_id: req.params.id}).lean().exec(function(e, docs) {
    res.json(docs);
    res.end();
  });
});

/* GET Agenda Count. */
router.get('/count', function(req, res, next) {
  var db = require('../db');
  var Agenda = db.Mongoose.model('agendas', db.AgendaSchema, 'agendas');
  Agenda.count({}).exec(function(e, docs) {
    res.json(docs);
    res.end();
  });
});


/* GET agendas pagination. */
router.post('/agendas', function(req, res, next) {
  var db = require('../db');
  console.log(req.body);

  var max = Number(req.body.max);
  // var max = 10;
  // var page = 0;
  if (req.body.page == null) {
    page = 0;
  } else {
    var page = Number(req.body.page);
  }

  if (req.body.max == null) {
    max = 10;
  } else {
    var max = Number(req.body.max);
  }

  var Agenda = db.Mongoose.model('agendas', db.AgendaSchema, 'agendas');
  Agenda.find({})
      .limit(max)
      .skip(page * max)
      //.lean()
      .exec(function(e, docs) {
        res.json(docs);
        res.end();
      });
});


router.delete('/agendas/:id', function(req, res, next) {
  var db = require('../db');
  var Agenda = db.Mongoose.model('agendas', db.AgendaSchema, 'agendas');
  Agenda.find({_id: req.params.id}).remove(function(err) {
    if (err) {
      res.status(500).json({error: err.message});
      res.end();
      return;
    }
    res.json({success: true});
    res.end();
  });
});




module.exports = router;
