var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * New Model
 * ==========
 */

var New = new keystone.List('New');

New.add({
    behavior: { type: Types.Select, options: [
        'newLink',
        'newApp'
    ] },
    updatedAt: { type: Types.Datetime, default: Date.now },
    createdAt: { type: Types.Datetime, default: Date.now },
    link: { type: Types.Relationship, ref: 'Link' },
    app: { type: Types.Relationship, ref: 'App' }
});

New.schema.pre('save', function(done) {
	this.updated = Date.now;

	done();
});

New.defaultSort = '-createdAt';
New.defaultColumns = 'behavior, createdAt, link, app';
New.register();
