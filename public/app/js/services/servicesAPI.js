app.factory('Api', function($resource, $http, $location){

	// Dados da loja que usuario vai administrar
	var propriedadeAdministrando = {};

	// Pega todas as propriedades do usuario logado
	var _getAllPropriedades = function() {
		return $http.get('/api/propriedades');
	};

	// Ao usuario abrir esta propriedade popula uma variavel
    // Que poderá ser usada a qualquer momento
    var _setPropriedade = function(objPropriedade) {
    	propriedadeAdministrando = objPropriedade;
    	var url = propriedadeAdministrando.dados.nome.replace(/\s/g,'').toLowerCase();
    	$http.get('/app/' + url);
    	$location.url('/' + url);
    };

    // Pega os dados da variavel ja populada
    var _getPropriedade = function() {
    	return propriedadeAdministrando;
    };

    // Quando administrador resolver voltar a ver a lista de suas propriedades
    var _destroyPropriedade = function() {
    	delete propriedadeAdministrando;
    };

	return {
		// Lista todas propriedades do usuario logado
		AllPropriedades: _getAllPropriedades,

		// Responsavel por ações nas lojas
		Lojas: $resource('/api/lojas/:id', {id: '@id'}),

		// Diz qual loja usuario logado deseja administrar
		setAdministrando: _setPropriedade,

		// Pega os dados da loja setada que o usuario logado desja administrar
		getAdministrando: _getPropriedade,

		// Volta para a listagem de todas as pastas
		destroyAdministrando: _destroyPropriedade
	};
});