// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

var mongoName = process.env.MONGO_DB_NAME || 'swift-how';
var mongoPath = 'mongodb://localhost/' + mongoName;
console.log(process);
if (process.env.MONGO_PORT_27017_TCP_ADDR && process.env.MONGO_PORT_27017_TCP_PORT) {
	var path = process.env.MONGO_PORT_27017_TCP_ADDR + ":" + process.env.MONGO_PORT_27017_TCP_PORT;
	mongoPath = 'mongodb://' + mongoPath + '/' + mongoName;
}

keystone.init({

	'name': 'Swift How',
	'brand': 'Swift How',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.png',
	'views': 'templates/views',
	'view engine': 'hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,

	'auto update': true,
	'mongo': mongoPath,

	'session': false,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'your-cookie-secret',
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'links': 'links',
	'apps': 'apps',
	'users': ['users', 'enquiries']
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
