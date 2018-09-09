import DataBaseService from '../utils/DataBaseService';
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  const db = new DataBaseService();
  db.call('users', null, (err, results) => {
    if(err){
      res.statusCode=400,
      res.send('Bad Request');
    } else 
    res.send(results[0])
  });
});

router.put('/', function(req, res, next) {
  const db = new DataBaseService();
  const params = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.avatar
  ];
  db.call('sign_up', params, (err, results) => {
    if(err){
      res.statusCode=400,
      res.send(err);
    } else 
    res.send(results[0])
  });
});

router.post('/auth', (req, res, next) => {
  const db = new DataBaseService();
  const params = [
    req.body.email,
    req.body.password
  ];
  console.log(req.body.password);
  console.log(req.body.email);
  db.call('auth', params, (err, results) => {
    if(err){
      res.statusCode=400,
      res.send(err);
    } else 
    res.send(results[0])
  });
});

router.get('/:id', function(req, res, next) {
  const db = new DataBaseService();
  db.call('user', req.params.id, (err, results) => {
    if(err){
      res.statusCode=400,
      res.send(err);
    } else 
    res.send(results[0])
  });
});

router.post('/:id', (req, res, next) => {
  const db = new DataBaseService();
  db.call('update_user', [
    req.params.id,
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.avatar
  ], (err, results) => {
    if(err){
      res.statusCode=400,
      res.send(err);
    } else 
    res.send(results[0])
  });
});
module.exports = router;