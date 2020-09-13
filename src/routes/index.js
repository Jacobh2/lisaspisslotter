var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const won = req.query.won === "true";
  console.log("User won:", won);
  res.render('index', { title: 'Lisas Pisslotter', won: won ? "Wooohoo! You won!": "" });
});

module.exports = router;
