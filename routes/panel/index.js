var express = require('express');
var router = express.Router();

/* GET create question page. */
router.get('/', function(req, res, next) {
  res.render('panel', { title: 'Bili大冲浪后台管理系统' });
});

module.exports = router;
