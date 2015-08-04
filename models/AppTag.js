var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * App Model
 * ==========
 */

var AppTag = new keystone.List('AppTag');

AppTag.add({
    name: { type: Types.Text, required: true }
});

AppTag.register();
