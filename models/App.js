var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * App Model
 * ==========
 */

var App = new keystone.List('App');

App.add({
    name: { type: Types.Text, required: true },
    slogan: { type: Types.Text },
    description: { type: Types.Markdown },
    updatedAt: { type: Types.Date, default: Date.now },
    createdAt: { type: Types.Date, default: Date.now },
    icon: { type: Types.Url },
    screenshots: { type: Types.TextArray },
    cover: { type: Types.Url },
    download: { type: Types.Url },
    tag: { type: Types.Key, index: true },
    state: { type: Types.Select, options: [
        'published',
        'draft'
    ] },
    hot: { type: Types.Number, default: 0 }
});

App.defaultSort = '-createdAt';
App.defaultColumns = 'name, slogan, description, state, hot, download, createdAt';
App.register();
