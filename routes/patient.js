var express = require('express');
var app = express();
var router = express.Router();
const db = require('../db')
const sql = require('../sql')

router.get('/', function (req, res, next) {
    //console.log(req.query)

    db.query(sql.select("patient", req.query), (err, rows, fields) => {
        if (err) throw err
       // console.log(rows)
        res.send(rows)
    })
});

module.exports = router;
