var express = require('express');
var router = express.Router();
const models = require("../models");

/* GET home page. */
router.get('/', function (req, res, next) {
  models.Todos.findAll().then(function (items) {
    // items.forEach(function(params){
    //   console.log(params.dataValues)
    // })
    //console.log(items);
    let _incomplete = []
    let _complete = []
    items.forEach(function (params) {
      if (params.complete === true) {
        _complete.push(params.dataValues)
      } else {
        _incomplete.push(params.dataValues)
      }
    })
    res.render('index', { todo_items: _incomplete, completed_items: _complete })
  })
});

router.post('/', function (req, res, next) {
  const todo = models.Todos.build({
    todo: req.body.input_todo_box,
    complete: false
  });

  todo.save().then(function (newTodo) {
    console.log(newTodo);
    res.redirect('/')
  })

});
router.post('/markcomplete/:id', function (req, res, next) {
  let thisId = req.params.id
  models.Todos.update({
    complete: true
  }, {
      where: {
        id: thisId
      }
    }).then(
    res.redirect('/')
    )
});
  
router.post('/deleteall', function (req, res, next) {
  models.Todos.destroy({
      where: {
        complete: true
      }
    }).then(function(items){
      res.redirect('/')
    })
});

module.exports = router;
