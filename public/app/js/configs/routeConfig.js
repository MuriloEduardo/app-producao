app.config(function ($routeProvider, $locationProvider) {
    
    $routeProvider
    .when('/', {
        templateUrl: './views/lojas.html',
        controller: 'lojasCtrl',
        resolve: {
            allPropriedades: function (Api){
                return Api.AllPropriedades();
            },
            Usuario: function(Api){
                return Api.Usuario();
            }
        }
    })

    .when('/:loja', {
        templateUrl: './views/loja.html',
        controller: 'lojaCtrl',
        resolve: {
            dadosPropriedade: function (Api){
                return Api.getAdministrando();
            },
            dadosAdministradores: function(Api){
                return Api.getDadosAdministradores();
            }
        }
    })

    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({enabled: true});
});