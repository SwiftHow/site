/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function(req, res, next) {
	res.status(404).render('404');
});

keystone.set('500', function(req, res, next) {
	res.status(500).render('500');
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);
	app.all('/contact', routes.views.contact);
	app.get('/link', routes.views.link.linkPage);
	app.get('/link/type/:type', routes.views.link.linkByType);
	app.get('/link/:year/:month/:day/:name', routes.views.link.linkDetail);
	app.get('/link/:id', routes.views.link.linkDetail);
	app.get('/link/jump/:id', routes.views.link.jump);
	app.get('/news', routes.views.news);

	app.get('/latest-post', routes.api.ghost);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
