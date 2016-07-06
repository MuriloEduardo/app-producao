app.factory('Api', function($resource, $http){

	// Dados da loja que usuario vai administrar
	var propriedadeAdministrando = {
		_id: undefined,
		dados: {
			dtAlteracao: undefined,
			dtCadastro: undefined,
			idCriador: undefined,
			nome: undefined,
			ramo: undefined,
			administradores: {
				idUsuario: undefined
			}
		}
	}

	// Pega todas as propriedades do usuario logado
	var _getAllPropriedades = function() {
		return $http.get('/api/lojas-logado');
	}

	// Ao fazer requisição para ca, retorna qual usuario esta logado
	var _getUsuario = function() {
        return $http.get('/api/logado');
    };

    // Ao usuario abrir esta propriedade popula uma variavel
    // Que poderá ser usada a qualquer momento
    var _setPropriedade = function(objPropriedade) {
    	propriedadeAdministrando = objPropriedade;
    };

    // Pega os dados da variavel ja populada
    var _getPropriedade = function() {
    	return propriedadeAdministrando;
    };

    // Quando administrador resolver voltar a ver a lista de suas propriedades
    var _destroyPropriedade = function() {
    	delete propriedadeAdministrando;
    }

    // Novo administrador
    var _newAdm = function(dados) {
    	return $http.post('/api/new-adm', dados);
    }

    // Dados dos administradores
    var _dadosAdministradores = function() {
    	$http.post('/api/administradores', propriedadeAdministrando.dados.administradores).success(function(data){
    		console.log(data)
    	});
    }

	return {
		// Pega dados do usuario logado
		Usuario: _getUsuario,

		// Cria um novo administrador dentro de uma propriedade
		newAdm: _newAdm,

		// Lista todas propriedades do usuario logado
		AllPropriedades: _getAllPropriedades,

		// Responsavel por ações nas lojas
		Lojas: $resource('/api/lojas/:id', {id: '@id'}),
		
		// Diz qual loja usuario logado deseja administrar
		setAdministrando: _setPropriedade,

		// Pega os dados da loja setada que o usuario logado desja administrar
		getAdministrando: _getPropriedade,

		// Volta para a listagem de todas as pastas
		destroyAdministrando: _destroyPropriedade,

		getDadosAdministradores: _dadosAdministradores
	};
});