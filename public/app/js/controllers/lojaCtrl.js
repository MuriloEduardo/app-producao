app.controller('lojaCtrl', function($scope, $rootScope, dadosPropriedade, Api, $location){
	$scope.dadosPropriedade = dadosPropriedade;

	$scope.voltar = function() {
		Api.destroyAdministrando();
		$location.path('/');
	}
});