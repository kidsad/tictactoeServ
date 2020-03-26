const router = require('express').Router();
const controller = require('./game');


router.get('/getField', (req, res) => {
  res.send(200, controller.getField());
});

router.post('/move', (req, res) => {
  controller.makeMove(req.body.x, req.body.y);
  res.send(200, 'OK');
});

module.exports = router;