var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Link Model
 * ==========
 */

var Link = new keystone.List('Link');

Link.add({
    name: { type: Types.Text, required: true },
    raw: { type: Types.Url },
    image: { type: Types.Url },
    description: { type: Types.Textarea },
    comment: { type: Types.Textarea },
    updated: { type: Types.Datetime, default: Date.now },
    created: { type: Types.Datetime, default: Date.now },
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

    if (this.isNew) {
        var New = keystone.list('New');
        New.model({
            behavior: 'newLink',
            link: this.id
        }).save(done);
    } else {
        done();
    }
});

// Provide access to Keystone
Link.schema.virtual('urlName').get(function() {
    return this.name.toLowerCase().replace(/\s+/g,'-');
});

Link.defaultSort = '-created';
Link.defaultColumns = 'name, type, state, hot, raw, created';
Link.register();
