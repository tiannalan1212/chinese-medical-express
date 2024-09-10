var express = require('express');
var app = express();
var router = express.Router();
const db = require('../db')
const sql = require('../sql')

router.get('/', function (req, res, next) {
    //console.log(req.query)

    let total = null;

    db.query(sql.count("patient"), (err, rows, fields) => {
        if (err) throw err
        //console.log(rows[0]['COUNT(*)'])
        total = rows[0]['COUNT(*)']
    })

    db.query(sql.select("patient", req.query), (err, rows, fields) => {
        if (err) throw err
        // console.log(rows)
        res.send({ table: rows, total: total })
        //    res.send('success')
    })
});

module.exports = router;
