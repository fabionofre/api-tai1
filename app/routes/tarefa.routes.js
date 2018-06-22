module.exports = (app) => {
    const tarefa = require('../controllers/tarefa.controller.js')

    app.post('/tarefa', tarefa.create)

    app.get('/tarefa', tarefa.findAll)

    app.get('/tarefa/:tarefa_id', tarefa.findOne)

    app.put('/tarefa/:tarefa_id', tarefa.update)

    app.delete('/tarefa/:tarefa_id', tarefa.delete)

}