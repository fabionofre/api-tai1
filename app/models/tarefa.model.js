const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Tarefa = mongoose.Schema({
    descricao: String,
    prioridade: {
        type: String,
        enum: ['baixa','media','alta']
    },
    feita: Boolean,
    lista: {type: Schema.Types.ObjectId, ref: 'Lista'}
}, {
    timestamps: true
})

module.exports = mongoose.model('Tarefa', Tarefa)