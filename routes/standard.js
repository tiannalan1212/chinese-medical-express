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

    const name = req.body.name
    const remark = !!req.body.remark ? req.body.remark : ""
    const standard_describe = !!req.body.standard_describe ? req.body.standard_describe : ""

    db.query(`INSERT INTO standard ( name, remark, standard_describe ) VALUES ( "${name}", "${remark}", "${standard_describe}" )`, (err, rows, fields) => {
        if (err) throw err
        // console.log(rows)
        res.send("success")
    })
})

// 编辑标准方剂
router.put('/updateStandard', (req, res, next) => {

    const id = req.body.id
    const name = req.body.name
    const remark = !!req.body.remark ? req.body.remark : ""
    const standard_describe = !!req.body.standard_describe ? req.body.standard_describe : ""
ç
    db.query(`UPDATE standard SET name = "${name}", remark = "${remark}", standard_describe = "${standard_describe}" WHERE id = "${id}"`, (err, rows, fields) => {
        if (err) throw err
        // console.log(rows)
        res.send("success")
    })
})

module.exports = router;
