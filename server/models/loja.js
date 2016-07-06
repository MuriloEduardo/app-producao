var mongoose = require('mongoose');

var lojaSchema = mongoose.Schema({
	dados: {
		nome: String,
		ramo: String,
		idCriador: String,
		administradores: [
			{
				idUsuario: String,
				permissoes: String
			}
		],
		cpfCriador: String,
		cnpj: String,
		dtCadastro: String
	}
});

module.exports = mongoose.model('Loja', lojaSchema);