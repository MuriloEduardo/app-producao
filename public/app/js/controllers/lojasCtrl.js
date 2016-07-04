app.controller('lojasCtrl', function($scope, Api, $window, $rootScope){

	// Pega lojas e representações deste usuario
	var lojaManipulacao = {
		dados: {
			nome: undefined,
			ramo: undefined,
			idCriador: undefined
		}
	}

	// Monta objeto de lojas do usuario logado
	$scope.lojasBD = [];

	// Id do usuario logado
	var idUserLogado = undefined;

	// Pega objeto de usuario logado
	Api.Usuario().success(function(data){

		console.log(data)
		
		idUserLogado = data._id;

		Api.Lojas.query({}, function(data){
			for (var i=0; i<data.length; i++) {
				if(data[i].dados['idCriador'] === idUserLogado){
					$scope.lojasBD.push(data[i]);
				}
			}
		});
	}).error(function(err){
		console.log(err)
	})

	$scope.novaLoja = function(dados) {

		lojaManipulacao.dados.nome      = dados.nome;
		lojaManipulacao.dados.ramo      = dados.ramo;
		lojaManipulacao.dados.idCriador = idUserLogado;

		Api.Lojas.save({}, lojaManipulacao, function(data){
			if(data){
				console.log(data)
			}
		});
	}

	$scope.openLoja = function(obj) {
		$window.location.href = obj.dados.nome.replace( /\s/g, '' ).toLowerCase() + '/';
		$rootScope.loja = obj._id;
	}
});