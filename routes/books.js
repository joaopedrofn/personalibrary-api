import DataBaseService from '../utils/DataBaseService';
var express = require('express');
var router = express.Router();


router.get('/:isbn', function(req, res, next) {
  const db = new DataBaseService();
  db.call('book', req.params.isbn, (err, results) => {
    if(err){
      res.statusCode=400,
      res.send(err);
    } else 
    res.send(results[0])
  });
});

router.get('/', function(req, res, next) {
  const db = new DataBaseService();
  db.call('books', null, (err, results) => {
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
    req.body.isbn,
    req.body.title,
    req.body.subtitle,
    req.body.cover,
    req.body.year,
    req.body.publisher,
    req.body.author,
    req.body.genres
  ];
  db.call('add_book', params, (err, results) => {
    if(err){
      res.statusCode=400,
      res.send(err);
    } else 
    res.send(results[0])
  });
});
router.get('/read/:userId', (req, res, next) => {
    const db = new DataBaseService();
    db.call('read_books', req.params.userId, (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.get('/wished/:userId', (req, res, next) => {
    const db = new DataBaseService();
    db.call('wished_books', req.params.userId, (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/wish/:userId/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('wish_book', [req.params.userId, req.params.isbn], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/start/:userId/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('start_book', [req.params.userId, req.params.isbn], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/start_date/:userId/:isbn/:date', (req, res, next) => {
    const db = new DataBaseService();
    db.call('start_book_custom', [req.params.userId, req.params.isbn, req.params.date], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/finish/:userId/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('finish_book', [req.params.userId, req.params.isbn], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/finish_date/:userId/:isbn/:date', (req, res, next) => {
    const db = new DataBaseService();
    db.call('finish_book_custom', [req.params.userId, req.params.isbn, req.params.date], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/acquire/:userId/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('acquire_book', [req.params.userId, req.params.isbn], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/fav/:userId/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('fav_book', [req.params.userId, req.params.isbn], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.delete('/remove/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('remove_book', req.params.isbn, (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/abandon/:userId/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('abandon_book', [req.params.userId, req.params.isbn], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/abandon_date/:userId/:isbn/:date', (req, res, next) => {
    const db = new DataBaseService();
    db.call('abandon_book', [req.params.userId, req.params.isbn, req.params.date], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/read_pages/:userId/:isbn/:pages', (req, res, next) => {
    const db = new DataBaseService();
    db.call('read_book_pages', [
        req.params.userId, 
        req.params.isbn, 
        req.params.pages
    ], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.put('/genre/:genreId/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('add_genre_book', [
        req.params.isbn, 
        req.params.genreId, 
    ], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.delete('/genre/:genreId/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('remove_genre_book', [
        req.params.isbn, 
        req.params.genreId, 
    ], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.get('/:action/:userId', (req, res, next) => {
    const db = new DataBaseService();
    db.call(`${req.params.action}_books`, [
        req.params.userId
    ], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.post('/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call('update_book', [
        req.params.isbn,
        req.body.title,
        req.body.subtitle,
        req.body.cover,
        req.body.year,
        req.body.publisher,
        req.body.author,
    ], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});
router.delete('/:action/:userId/:isbn', (req, res, next) => {
    const db = new DataBaseService();
    db.call(`${req.params.action}_book`, [
        req.params.userId,
        req.params.isbn
    ], (err, results) => {
        if(err){
          res.statusCode=400,
          res.send(err);
        } else 
        res.send(results[0])
      });
});

module.exports = router;