app.config(function ($routeProvider, $locationProvider) {
    
    $routeProvider
    .when('/', {
        templateUrl: './views/propriedades.html',
        controller: 'propriedadesCtrl',
        resolve: {
            allPropriedades: function (Api){
                return Api.AllPropriedades();
            }
        }
    })

    .when('/:loja', {
        templateUrl: './views/loja.html',
        controller: 'lojaCtrl',
        resolve: {
            dadosPropriedade: function (Api){
                return Api.getAdministrando();
            }
        }
    })

    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({enabled: true});
});