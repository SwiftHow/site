var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Link Model
 * ==========
 */

var Link = new keystone.List('Link');

Link.add({
    name: { type: Types.Text, required: true },
    raw: { type: Types.Url, required: true, initial: false },
    image: { type: Types.Url },
    description: { type: Types.Textarea },
    comment: { type: Types.Textarea },
    updated: { type: Types.Date, default: Date.now },
    created: { type: Types.Date, default: Date.now },
    type: { type: Types.Select, options: [
        'article',
        'framework',
        'collection'
    ] },
    state: { type: Types.Select, options: [
        'published',
        'draft'
    ] },
    tag: { type: Types.Key, index: true },
    hot: { type: Types.Number, default: 0 }
});

Link.schema.pre('save', function(done) {
	this.updated = Date.now;

	done();
});

Link.defaultSort = '-created';
Link.defaultColumns = 'name, description, type, hot, raw, created';
Link.register();
