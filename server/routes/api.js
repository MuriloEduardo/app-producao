var Usuario = require('../models/usuario');
var Lojas = require('../models/loja');

module.exports = function(router, passport){

	//////////////
	// USUARIO //
	////////////

	// CADASTRAR UM NOVO USUARIO
	// Não precisa estar logado
	router.post('/cadastrar', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/api/cadastrar',
		failureFlash: true
	}));

	router.post('/experimentar', function(req, res){
		var novoUsuario = new Usuario();
		novoUsuario.local.email = req.body.email;
		novoUsuario.local.senha = req.body.senha;

		novoUsuario.save(function(err){
			if(err)
				throw err;
		});
		res.send('success');
	});

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/app',
		failureRedirect: '/api/login',
		failureFlash: true
	}));

	router.get('/logado', isLoggedIn, function(req, res){
		res.json(req.user);
	});

	///////////
	// LOJA //
	/////////

	// CRIAR UMA LOJA //
	router.post('/lojas', isLoggedIn, function(req, res){
		
		var novaLoja               = new Lojas();
		novaLoja.dados.nome 	   = req.body.dados.nome;
		novaLoja.dados.ramo        = req.body.dados.ramo;
		novaLoja.dados.idCriador   = req.body.dados.idCriador;
		novaLoja.dados.dtCadastro  = new Date();
		novaLoja.dados.dtAlteracao = new Date();

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
			lojas.dados.dtAlteracao = new Date();

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