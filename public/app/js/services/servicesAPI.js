app.factory('Api', function($resource, $http){

	// Dados da loja que usuario vai administrar
	var propriedadeAdministrando = {
		_id: undefined,
		dados: {
			dtAlteracao: undefined,
			dtCadastro: undefined,
			idCriador: undefined,
			nome: undefined,
			ramo: undefined
		}
	}

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

	return {
		Usuario: _getUsuario,
		AllPropriedades: _getAllPropriedades,
		Lojas: $resource('/api/lojas/:id', {id: '@id'}),
		setAdministrando: _setPropriedade,
		getAdministrando: _getPropriedade,
		destroyAdministrando: _destroyPropriedade,
	};
});