var express = require('express');

var router = express.Router();
const db = require('../db')
const sql = require('../sql')

// 药品列表
router.get('/getList', function (req, res, next) {
    //console.log(req.query)

    let total = null;

    db.query(sql.count("medical", {...req.query}), (err, rows, fields) => {
        if (err) throw err
        //console.log(rows[0]['COUNT(*)'])
        total = rows[0]['COUNT(*)']
    })

    db.query(sql.select("medical", {...req.query}), (err, rows, fields) => {
        if (err) throw err
        // console.log(rows)
        res.send({ table: rows, total: total })
        //    res.send('success')
    })
});

// 药品详情
router.get('/getMedical', function (req, res, next) {
    //console.log(req.query)
    db.query(sql.select("medical", {...req.query}), (err, rows, fields) => {
        if (err) throw err
        res.send(rows)
    })
})

// 新增药品
router.post('/addMedical', (req, res, next) => {

    db.query(sql.select("medical", { name: req.body.name }), (err, rows, fields) => {
        //console.log(rows)

        if (rows.length > 0) {
            res.status(501).send({error:'重复添加'})
        } else {
            db.query(sql.add("medical", req.body), (err, rows, fields) => {
                if (err) throw err
                res.send("success")
            })
        }
    })
})

// 编辑药品
router.post('/updateMedical', function (req, res, next) {
    //console.log(req.body)

    db.query(sql.update("medical", req.body), (err, rows, fields) => {
        if (err) throw err
        res.send("success")
    })
})
module.exports = router;
