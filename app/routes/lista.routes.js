module.exports = (app) => {
    const lista = require('../controllers/lista.controller.js')

    app.post('/lista', lista.create)

    app.get('/lista', lista.findAll)

    app.get('/lista/:lista_id', lista.findOne)

    app.put('/lista/:lista_id', lista.update)

    app.delete('/lista/:lista_id', lista.delete)

}