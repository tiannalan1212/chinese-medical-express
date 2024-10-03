var express = require('express');
var router = express.Router();

const db = require('../db.js')
const sql = require('../sql')


// 处方列表
router.get('/getList', function (req, res, next) {
    //console.log(req.query)
  
    let total = null;
  
    db.query(sql.count("recipe"), (err, rows, fields) => {
        if (err) throw err
        //console.log(rows[0]['COUNT(*)'])
        total = rows[0]['COUNT(*)']
    })
  
    db.query(sql.select("recipe", req.query), (err, rows, fields) => {
        if (err) throw err
        // console.log(rows)
        res.send({ table: rows, total: total })
        //    res.send('success')
    })
  });

  // 标准方剂详情
router.get('/getRecipe', function (req, res, next) {
    //console.log(req.query)
    db.query(sql.select("recipe", req.query), (err, rows, fields) => {
        if (err) throw err
        res.send(rows)
    })
  })
  
  // 新增标准方剂
  router.post('/addRecipe', (req, res, next) => {
  
      const name = req.body.name
      const remark = !!req.body.remark ? req.body.remark : ""
      const standard_describe = !!req.body.standard_describe ? req.body.standard_describe : ""
  
      db.query(`INSERT INTO recipe ( name, remark, standard_describe ) VALUES ( "${name}", "${remark}", "${standard_describe}" )`, (err, rows, fields) => {
          if (err) throw err
          // console.log(rows)
          res.send("success")
      })
  })
  
  // 编辑标准方剂
  router.put('/updateRecipe', (req, res, next) => {
  
      const id = req.body.id
      const narrative = !!req.body.narrative ? req.body.narrative : ""
      const diagnosis = !!req.body.diagnosis ? req.body.diagnosis : ""
      const recipe_content = !!req.body.recipe_content ? req.body.recipe_content : ""
      const num = !!req.body.num ? req.body.num : ""
      const note = !!req.body.note ? req.body.note : ""
  
      db.query(`UPDATE recipe SET narrative = "${narrative}", diagnosis = "${diagnosis}", recipe_content = "${recipe_content}", num = ${num}, note="${note}" WHERE id = "${id}"`, (err, rows, fields) => {
          if (err) throw err
          // console.log(rows)
          res.send("success")
      })
  })

module.exports = router;
