var Usuario = require('../models/usuario');
var Lojas = require('../models/loja');

module.exports = function(router, passport){

	  ///////////////////////////////////////////////
	 //                  USUARIOS                 //
	///////////////////////////////////////////////

	// CADASTRAR UM NOVO USUARIO
	router.post('/cadastrar', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}));

	// EFETUA O LOGIN APARTIR DE EMAIL E SENHA //
	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/app',
		failureRedirect: '/',
		failureFlash: true
	}));

	// CRIAR NOVO ADMINISTRADOR //
	router.post('/new-adm', isLoggedIn, function(req, res){
		
		var novoAdm         = new Usuario();
		novoAdm.local.email = req.body.email;

		novoAdm.save(function(err, data1){
			if(err){
				throw err;
			}else{

				Lojas.findOne({_id: req.body.id}, function(err, data2){
					
					var lojas = data2;
					lojas.dados.administradores.push({idUsuario: data1._id});

					lojas.save(function(err, data3){
						if(err){
							throw err;
						}else{
							res.json(data3);
						}
					});
				});
			}
		});
	});

	// PEGA DADOS DO USUARIO CRIADO //
	router.get('/logado', isLoggedIn, function(req, res){
		res.json(req.user);
	});

	// ENCERRA SESSÃO NODEJS //
	router.get('/logout', isLoggedIn, function(req, res){
		req.logout();
		res.redirect('/');
	});

	// PEGA DADOS DE UM UNICO USUARIO
	router.get('/usuario/:id', isLoggedIn, function(req, res){
		Usuario.findOne({_id: req.params.id}, function(err, data){
			res.json(data);
		});
	});

	router.post('/administradores', isLoggedIn, function(req, res){
		
		var dadosAdministradores = [];

		for (var i=0; i<req.body.length; i++) {
			Usuario.findOne({_id: req.body[i].idUsuario}, function(err, data){
				dadosAdministradores.push(data);
				return dadosAdministradores;
			});
		}
	});

	  ///////////////////////////////////////////////
	 //                     LOJAS                 //
	///////////////////////////////////////////////

	// CRIAR UMA LOJA //
	router.post('/lojas', isLoggedIn, function(req, res){
		
		var novaLoja               = new Lojas();
		novaLoja.dados.nome 	   = req.body.dados.nome;
		novaLoja.dados.ramo        = req.body.dados.ramo;
		novaLoja.dados.idCriador   = req.body.dados.idCriador;
		novaLoja.dados.dtCadastro  = new Date();

		novaLoja.save(function(err, data){
			if(err){
				throw err;
			}else{
				res.json(data);
			}
		});
	});

	// EDITAR UMA LOJA //
	router.post('/lojas/:id', isLoggedIn, function(req, res){
		Lojas.findOne({_id: req.params.id}, function(err, data){
			
			var lojas               = data;
			lojas.dados.nome 	    = req.body.dados.nome;
			lojas.dados.ramo        = req.body.dados.ramo;
			lojas.dados.idCriador   = req.body.dados.idCriador;
			lojas.dados.dtCadastro  = new Date();

			lojas.save(function(err, data){
				if(err){
					throw err;
				}else{
					res.json(data);
				}
			});
		});
	});

	// LISTAR UMA LOJA //
	router.get('/lojas/:id', function(req, res){
		Lojas.findOne({_id: req.params.id}, function(err, data){
			res.json(data);
		});
	});

	//EXCLUIR UMA LOJA //
	router.delete('/lojas/:id', isLoggedIn, function(req, res){
		Lojas.remove({_id: req.params.id}, function(err){
			res.json({result: err ? 'error' : 'ok'});
		});
	});

	// LISTAR TODAS AS LOJAS  DO USUARIO LOGADO //
	router.get('/lojas-logado', isLoggedIn, function(req, res){
		Lojas.find({'dados.idCriador': req.user._id}, function(err, data){
			res.json(data);
		});
	});

	// LISTAR TODAS AS LOJAS //
	router.get('/lojas', function(req, res){
		Lojas.find({}, function(err, data){
			res.json(data);
		});
	});

	// DELETAR TODAS AS LOJAS
	router.delete('/lojas', isLoggedIn, function(req, res){
		Lojas.remove({}, function(err){
			res.json({result: err ? 'error' : 'ok'});
		});
	});
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};