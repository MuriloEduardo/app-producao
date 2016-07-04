app.config(function ($routeProvider, $locationProvider) {
	
	$routeProvider
	.when('/', {
		templateUrl: './views/lojas.html',
		controller: 'lojasCtrl'
	})

	.when('/app/:loja', {
		templateUrl: './views/loja.html',
		controller: ['$routeParams', function($routeParams) {
			var self=this;
			self.loja = $routeParams.loja;
			console.log(self)
		}],
		controllerAs: 'lojaCtrl'
	})

	//.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({enabled: true, requireBase: false});
});