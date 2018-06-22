const Tarefa = require('../models/tarefa.model.js')
const mongoose = require('mongoose')

exports.create = (req, res) => {

	console.log(req.body)

	const tarefa = new Tarefa({
		_id: new mongoose.Types.ObjectId(),
		descricao: req.body.descricao,
		prioridade:req.body.prioridade,
		feita: req.body.feita,
		lista:req.body.lista
	})

	tarefa.save()
		.then(data => {
			res.send(data)
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Algum erro ocorreu na criação da tarefa!"
			})
		})
}

exports.findAll = (req, res) => {
	Tarefa.find()
		.then(tarefa => {
			res.send(tarefa)
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Algum erro ocorreu ao puxar as tarefas"
			})
		})
}

exports.findOne = (req, res) => {
	Tarefa.findById(req.params.tarefa_id)
		.then(tarefa => {
			if(!tarefa){
                            return res.status(404).send({
                                    message: "Tarefa não encontrada com o id " + req.params.tarefa_id
                            })
                        }
                        res.send(tarefa)
	}).catch(err => {
		if(err.kind === 'ObjectId'){
                    return res.status(404).send({
                        message: "Tarefa não encontrada com o id "+ req.params.tarefa_id
                    })
                }
        })
}

exports.update = (req, res) => {
	tarefa.findByIdAndUpdate(req.params.tarefa_id, {
		descrição: req.body.titulo,
		prioridade:req.body.descricao,
		feita: req.body.feita,
		tarefas:req.body.tarefas
	}, {new: true})
	.then(tarefa => {
		if(!tarefa){
			return res.status(404).send({
				message: "Tarefa não encontrada com o id " + req.params.tarefa_id
			})
		}
		res.send(tarefa)
	}).catch(err => {
		console.log(err)
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Tarefa não encontrada com o id" + req.params.tarefa_id
			})
		}
		return res.status(500).send({
			message: "Erro ao encontrar Tarefa com o id" + req.params.tarefa_id
		})
	})
}

exports.delete = (req, res) => {
	Tarefa.findByIdAndRemove(req.params.tarefa_id)
		.then(tarefa => {
			if(!tarefa){
                            return res.status(404).send({
                                    message: "Tarefa não encontrada com o id"+req.params.tarefa_id
                            })
			}
			res.send({message: "Tarefa deleta com sucesso"})
		}).catch(err => {
			if(err.kind === 'ObjectId' || err.name === 'NotFound'){
				return res.status(404).send({
					message: "Tarefa não encontrada com o id" + req.params.tarefa_id
				})
			}
			return res.status(500).send({
				message: "Não foi possível deletar a tarefa com o id" + req.params.tarefa_id
			})
		})
}