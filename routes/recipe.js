var express = require('express');
var router = express.Router();

const db = require('../db.js')
const sql = require('../sql')


// 处方列表
router.get('/getList', function (req, res, next) {
    //console.log(req.query)
  
    let total = null;
  
    db.query(sql.count("recipe", req.query), (err, rows, fields) => {
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

  // 处方详情
router.get('/getRecipe', function (req, res, next) {
    //console.log(req.query)
    db.query(sql.select("recipe", req.query), (err, rows, fields) => {
        if (err) throw err
        res.send(rows)
    })
  })
  
  // 新增处方
    router.post('/addRecipe', (req, res, next) => {

        db.query(sql.add("recipe", req.body), (err, rows, fields) => {
            if (err) throw err
            res.send("success")
        })

    })
  
  // 编辑处方
  router.put('/updateRecipe', function (req, res, next) {
    //console.log(req.body)

    db.query(sql.update("recipe", req.body), (err, rows, fields) => {
        if (err) throw err
        res.send("success")
    })
})

module.exports = router;
