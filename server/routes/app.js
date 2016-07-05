module.exports = function(router, io){

	router.get('/app', isLoggedIn, function(req, res){
		res.render('./../app/index.ejs', {user: req.user});
	});

	router.get('/app/:loja', isLoggedIn, function(req, res){

		var namespace = io.of('/' + req.params.loja);

		namespace.on('connection', function (socket) {
			// Transmitir a todos que usuario entrou na propriedade
			socket.on('entrou loja', function (data) {
				socket.broadcast.emit('entrou loja', {
					message: data
				});
			});
		});
	});
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};