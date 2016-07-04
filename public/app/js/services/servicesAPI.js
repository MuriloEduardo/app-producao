app.factory('Api', function($resource, $http){
	
	var _getUsuario = function() {
        return $http.get('/api/logado');
    };

	return {
		Usuario: _getUsuario,
		Lojas: $resource('/api/lojas/:id', {id: '@id'})
	};
});