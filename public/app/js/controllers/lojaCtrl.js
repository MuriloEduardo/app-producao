app.controller('lojaCtrl', function($scope, $rootScope, dadosPropriedade, Api, $location, $http){

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
		dados.propriedade = dadosPropriedade._id;
    	$http.post('/api/new-adm', dados).success(function (data, status, headers, config) {
    		if(data.err){
    			// Email ja existe
    		}else{
    			// Criado
    		}
        });
	}
});