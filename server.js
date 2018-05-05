const express = require('express')
const bodyParser = require('body-parser')
// Banco de dados
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./app/routes/lista.routes.js')(app)

mongoose.Promise = global.Promise;

// Conectando com o banco
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Conectado com sucesso!");    
}).catch(err => {
    console.log('Não conectado...')
    process.exit();
})

app.get('/', (req, res) => {
    res.json({"message": "xD"})
})

app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000")
})