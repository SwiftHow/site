var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Timeline Model
 * ==========
 */

var Timeline = new keystone.List('Timeline');

Timeline.add({
    summary: { type: Types.Text },
    description: { type: Types.Text },
    updatedAt: { type: Types.Datetime, default: Date.now },
    createdAt: { type: Types.Datetime, default: Date.now },
    links: { type: Types.Url, many: true }
});

Timeline.schema.pre('save', function(done) {
	this.updated = Date.now;

	done();
});

Timeline.defaultSort = '-createdAt';
Timeline.defaultColumns = 'summary, description, createdAt, links';
Timeline.register();
