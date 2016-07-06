app.controller('lojasCtrl', function($scope, Api, $location, allPropriedades, Usuario){

	// Pega lojas e representações deste usuario
	var lojaManipulacao = {
		dados: {
			nome: undefined,
			ramo: undefined,
			idCriador: undefined
		}
	}

	// Monta objeto de lojas do usuario logado
	$scope.lojasBD = allPropriedades.data;

	$scope.novaLoja = function(dados) {

		lojaManipulacao.dados.idCriador = Usuario.data._id;
		lojaManipulacao.dados.nome      = dados.nome;
		lojaManipulacao.dados.ramo      = dados.ramo;

		Api.Lojas.save({}, lojaManipulacao, function(data){
			if(data){
				$scope.lojasBD.push(data);
			}
		});
	}

	$scope.openLoja = function(obj) {
		Api.setAdministrando(obj);
		$location.path('/' + obj.dados.nome.replace( /\s/g, '' ).toLowerCase());
	}
});