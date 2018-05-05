const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Lista = mongoose.Schema({
    titulo: String,
    descricao: String,
    prioridade: {
        type: String,
        enum: ['baixa','media','alta']
    },
    feita: Boolean,
    tarefas: [{type: Schema.Types.ObjectId, ref: 'Tarefa'}]
}, {
    timestamps: true
})

module.exports = mongoose.model('Lista', Lista)