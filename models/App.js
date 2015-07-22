var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * App Model
 * ==========
 */

var App = new keystone.List('App');

App.add({
    name: { type: Types.Name, required: true },
    description: { type: Types.Text },
    updatedAt: { type: Types.Date, default: Date.now },
    createdAt: { type: Types.Date, default: Date.now }
});

App.defaultSort = '-createdAt';
App.register();
