import DataBaseService from '../utils/DataBaseService';
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    const db = new DataBaseService();
    db.call('authors', null, (err, results) => {
      if(err){
        res.statusCode=err.errno
        res.send(err.code);
      } else 
      res.send(results[0])
    });
});
router.get('/:id', function(req, res, next) {
    const db = new DataBaseService();
    db.call('author', req.params.id, (err, results) => {
    if(err){
        res.statusCode=err.errno
        res.send(err.code);
    } else 
    res.send(results[0])
    });
});

router.put('/follow/:userId/:authorId', function(req, res, next) {
  const db = new DataBaseService();
  const params = [
    req.params.userId,
    req.params.authorId,
  ];
  db.call('follow_author', params, (err, results) => {
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
    req.body.picture
  ];
  db.call('add_author', params, (err, results) => {
    if(err){
      res.statusCode=err.errno
      res.send(err.code);
    } else 
    res.send(results[0])
  });
});

router.delete('/:id', function(req, res, next) {
  const db = new DataBaseService();
  db.call('remove_author', req.params.id, (err, results) => {
    if(err){
      res.statusCode=err.errno
      res.send(err.code);
    } else 
    res.send(results[0])
  });
});

router.delete('/unfollow/:userId/:authorId', (req, res, next) => {
  const db = new DataBaseService();
  db.call('unfollow_author', [
    req.params.userId,
    req.params.authorId
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
    db.call('update_author', [
        req.params.id,
        req.body.name,
        req.body.picture
    ], (err, results) => {
        if(err){
        res.statusCode=err.errno
        res.send(err.code);
        } else 
        res.send(results[0])
    });
});
router.get('/followed/:userId', (req, res, next) => {
    const db = new DataBaseService();
    db.call('followed_authors', [
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