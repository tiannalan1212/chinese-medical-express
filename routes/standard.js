var express = require('express');

var router = express.Router();
const db = require('../db')
const sql = require('../sql')

// 标准方剂列表
router.get('/getList', function (req, res, next) {
  //console.log(req.query)

  let total = null;

  db.query(sql.count("standard"), (err, rows, fields) => {
      if (err) throw err
      //console.log(rows[0]['COUNT(*)'])
      total = rows[0]['COUNT(*)']
  })

  db.query(sql.select("standard", req.query), (err, rows, fields) => {
      if (err) throw err
      // console.log(rows)
      res.send({ table: rows, total: total })
      //    res.send('success')
  })
});

// 标准方剂详情
router.get('/getStandard', function (req, res, next) {
  //console.log(req.query)
  db.query(sql.select("standard", req.query), (err, rows, fields) => {
      if (err) throw err
      res.send(rows)
  })
})

// 新增标准方剂
router.post('/addStandard', (req, res, next) => {

    db.query(sql.add("standard", req.body), (err, rows, fields) => {
        if (err) throw err
        res.send("success")
    })

})

// 编辑标准方剂
router.put('/updateStandard', function (req, res, next) {
    //console.log(req.body)

    db.query(sql.update("standard", req.body), (err, rows, fields) => {
        if (err) throw err
        res.send("success")
    })
})
module.exports = router;
