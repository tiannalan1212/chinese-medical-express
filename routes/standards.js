var express = require('express');
var app = express();
var router = express.Router();
const db = require('../db')

router.get('/', function (req, res, next) {
  console.log(req.query)
  db.query(`SELECT * From standardRecipe WHERE name='${req.query.name}'`, (err, rows, fields) => {
    if (err) throw err
    console.log(rows)
    res.send(rows)
  })


  //res.send('respond with a resource');

});

router.post('/addStandardRecipe', (req, res, next) => {


  // console.log('===============', req.body)
  const id = '10001602'
  const name = req.body.name
  const remark = !!req.body.remark ? `"${req.body.remark}"` : "sss"
  const describe = !!req.body.describe ? `"${req.body.describe}"` : "lll"
  // res.send('get')
  db.query(`INSERT INTO standardRecipe ( name, remark ) VALUES ( "${name}", "${remark}" )`, (err, rows, fields) => {
    if (err) throw err
    // console.log(rows)
    res.send("success")
  })
})

module.exports = router;
