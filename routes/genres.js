import DataBaseService from '../utils/DataBaseService';
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    const db = new DataBaseService();
    db.call('genres', null, (err, results) => {
      if(err){
        res.statusCode=err.errno
        res.send(err.code);
      } else 
      res.send(results[0])
    });
});
router.get('/:id', function(req, res, next) {
    const db = new DataBaseService();
    db.call('genre', req.params.id, (err, results) => {
    if(err){
        res.statusCode=err.errno
        res.send(err.code);
    } else 
    res.send(results[0])
    });
});

router.put('/fav/:userId/:genreId', function(req, res, next) {
  const db = new DataBaseService();
  const params = [
    req.params.userId,
    req.params.genreId,
  ];
  db.call('fav_genre', params, (err, results) => {
    if(err){
      res.statusCode=err.errno
      res.send(err.code);
    } else 
    res.send(results[0])
  });
});

router.put('/', (req, res, next) => {
  const db = new DataBaseService();
  const params = [
    req.body.name,
    req.body.art
  ];
  db.call('add_genre', params, (err, results) => {
    if(err){
      res.statusCode=err.errno
      res.send(err.code);
    } else 
    res.send(results[0])
  });
});

router.delete('/:id', function(req, res, next) {
  const db = new DataBaseService();
  db.call('remove_genre', req.params.id, (err, results) => {
    if(err){
      res.statusCode=err.errno
      res.send(err.code);
    } else 
    res.send(results[0])
  });
});

router.delete('/unfav/:userId/:genreId', (req, res, next) => {
  const db = new DataBaseService();
  db.call('unfav_genre', [
    req.params.userId,
    req.params.genreId
  ], (err, results) => {
    if(err){
      res.statusCode=err.errno
      res.send(err.code);
    } else 
    res.send(results[0])
  });
});

router.post('/:id', (req, res, next) => {
    const db = new DataBaseService();
    db.call('update_genre', [
        req.params.id,
        req.body.name,
        req.body.art
    ], (err, results) => {
        if(err){
        res.statusCode=err.errno
        res.send(err.code);
        } else 
        res.send(results[0])
    });
});
router.get('/fav/:userId', (req, res, next) => {
    const db = new DataBaseService();
    db.call('fav_genres', [
      req.params.userId,
    ], (err, results) => {
      if(err){
        res.statusCode=err.errno
        res.send(err.code);
      } else 
      res.send(results[0])
    });
  });
  
module.exports = router;