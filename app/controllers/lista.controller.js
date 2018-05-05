const Lista = require('../models/lista.model.js')
const mongoose = require('mongoose')

exports.create = (req, res) => {

    console.log(req.body)

    const lista = new Lista({
        _id: new mongoose.Types.ObjectId(),
        titulo: req.body.titulo, 
        descricao: req.body.descricao,
        prioridade: req.body.prioridade,
        feita: req.body.feita,
        tarefas: req.body.tarefas
    })

    lista.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro ocorreu na criação da lista!"
            })
        })

}

exports.findAll = (req, res) => {
    Lista.find()
        .then(listas => {
            res.send(listas)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro ocorreu ao puxar as listas"
            })
        })
}

exports.findOne = (req, res) => {
    Lista.findById(req.params.lista_id)
        .then(lista => {
            if(!lista) {
                return res.status(404).send({
                    message: "Lista não encontrada com o id " + req.params.lista_id
                })            
            }
            res.send(lista)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lista não encontrada com o id " + req.params.lista_id
                })                
            }
            return res.status(500).send({
                message: "Error em contrar Lista com o id " + req.params.lista_id
            })
        })
}

exports.update = (req, res) => {
    Lista.findByIdAndUpdate(req.params.lista_id, {
        titulo: req.body.titulo, 
        descricao: req.body.descricao,
        prioridade: req.body.prioridade,
        feita: req.body.feita,
        tarefas: req.body.tarefas
    }, {new: true})
    .then(lista => {
        if(!lista) {
            return res.status(404).send({
                message: "Lista não encontrada com o id " + req.params.lista_id
            })
        }
        res.send(lista)
    }).catch(err => {
        console.log(err)
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lista não encontrada com o id " + req.params.lista_id
            })               
        }
        return res.status(500).send({
            message: "Error ao encontrar Lista com o id " + req.params.lista_id
        })
    })
}

exports.delete = (req, res) => {
    Lista.findByIdAndRemove(req.params.lista_id)
        .then(lista => {
            if(!lista) {
                return res.status(404).send({
                    message: "Lista não encontrada com o id " + req.params.lista_id
                })
            }
            res.send({message: "Lista deletada com sucesso!"})
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Lista não encontrada com o id " + req.params.lista_id
                })             
            }
            return res.status(500).send({
                message: "Não foi possível deletar a lista com o id " + req.params.lista_id
            })
        })
}