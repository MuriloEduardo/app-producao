var mongoose = require('mongoose');

var lojaSchema = mongoose.Schema({
	dados: {
		nome: String,
		ramo: String,
		idCriador: String,
		cpfCriador: String,
		cnpj: String,
		dtCadastro: String,
		dtAlteracao: String
	}
});

module.exports = mongoose.model('Loja', lojaSchema);