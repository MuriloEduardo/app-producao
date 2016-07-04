module.exports = function(router){
	router.get('/app/*', isLoggedIn, function(req, res){
		res.render('./../app/index.ejs', {user: req.user});
	});
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};