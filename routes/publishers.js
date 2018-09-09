import DataBaseService from '../utils/DataBaseService';
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    const db = new DataBaseService();
    db.call('publishers', null, (err, results) => {
      if(err){
        res.statusCode=err.errno
        res.send(err.code);
      } else 
      res.send(results[0])
    });
});
router.get('/:id', function(req, res, next) {
    const db = new DataBaseService();
    db.call('publisher', req.params.id, (err, results) => {
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
    req.body.logo
  ];
  db.call('add_publisher', params, (err, results) => {
    if(err){
      res.statusCode=err.errno
      res.send(err.code);
    } else 
    res.send(results[0])
  });
});

router.delete('/:id', function(req, res, next) {
  const db = new DataBaseService();
  db.call('remove_publisher', req.params.id, (err, results) => {
    if(err){
      res.statusCode=err.errno
      res.send(err.code);
    } else 
    res.send(results[0])
  });
});


router.post('/:id', (req, res, next) => {
    const db = new DataBaseService();
    db.call('update_publisher', [
        req.params.id,
        req.body.name,
        req.body.logo
    ], (err, results) => {
        if(err){
        res.statusCode=err.errno
        res.send(err.code);
        } else 
        res.send(results[0])
    });
});

  
module.exports = router;