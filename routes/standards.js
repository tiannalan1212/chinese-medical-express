var express = require('express');
var app = express();
var router = express.Router();
const db = require('../db')

router.get('/', function (req, res, next) {
  console.log(req.query)
  const _name = !!req.query.name ? req.query.name : ''
  const select = _name ? `SELECT * FROM standardRecipe WHERE name='${_name}'` : `SELECT * FROM standardRecipe`
  db.query(select, (err, rows, fields) => {
    if (err) throw err
    console.log(rows)
    res.send(rows)
  })


  //res.send('respond with a resource');

});

router.post('/addStandardRecipe', (req, res, next) => {

  const name = req.body.name
  const remark = !!req.body.remark ? req.body.remark : ""
  const standard_describe = !!req.body.standard_describe ? req.body.standard_describe : ""

  db.query(`INSERT INTO standardRecipe ( name, remark, standard_describe ) VALUES ( "${name}", "${remark}", "${standard_describe}" )`, (err, rows, fields) => {
    if (err) throw err
    // console.log(rows)
    res.send("success")
  })
})

module.exports = router;
