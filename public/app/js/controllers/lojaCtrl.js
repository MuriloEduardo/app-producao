app.controller('lojaCtrl', function($scope, $rootScope, dadosPropriedade, Api, $location){

	// Conecta-se com o namespace do _id da loja
	var socket = io('/' + dadosPropriedade._id);
	
	// parametro para passagem de dados
	var message = 'Se juntou ao time';

	// Envia evento para Socket
	socket.emit('entrou loja', message);

	// Recebe evento do Servidor
	socket.on('entrou loja', function (data) {
		console.log('sdfsdfsdfsd-asd09friwiew09riw0e9ri0we9riw09eirw0dsfodskfkspodkfoskdfposkdpfokspfoksdpfoskfposkdfposkdfposkfpoksdpfokspdfkspokdfsdfsd')
	});

	$scope.dadosPropriedade = dadosPropriedade;

	$scope.voltar = function() {
		Api.destroyAdministrando();
		$location.path('/');
	}

	$scope.newAdm = function(dados) {
		
		dados = {
			id: dadosPropriedade._id,
			email: dados.email
		}

		Api.newAdm(dados).success(function(data){
    		console.log(data);
    	});
	}
});