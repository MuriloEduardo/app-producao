app.controller('propriedadesCtrl', function($scope, Api, allPropriedades){

	// Monta objeto de lojas do usuario logado
	$scope.lojasBD = allPropriedades.data;

	$scope.novaLoja = function(dados) {

		Api.Lojas.save({}, dados, function(data){
			if(data){
				$scope.lojasBD.push(data);
			}
		});
	}

	$scope.openLoja = function(obj) {
		Api.setAdministrando(obj);
	}
});