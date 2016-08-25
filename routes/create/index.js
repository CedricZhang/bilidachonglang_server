var express = require('express');
var router = express.Router();

/* GET create question page. */
router.get('/', function(req, res, next) {
  res.render('create/', { title: '创建问题' });
});

module.exports = router;
