var keystone = require('keystone');
var Link = keystone.list('Link');

function linkPage(req, res) {
    res.redirect('/link/type/framework');
}

function linkByType(req, res) {

    var view = new keystone.View(req, res);
	var locals = res.locals;
    var type = req.params.type;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'link';
    locals.site_title = 'Daily Swift Links - SWIFT.HOW';
    locals.meta_description = 'Swift.how collect really helpful swift framework and article link everyday. You can comment on these links. Keep learning!';

    locals.linkTypes = [
        { value: 'framework' },
        { value: 'article' },
        { value: 'collection' }
    ];

    locals.type = type;

    view.on('init', function(next) {
        Link.model.find()
            .where('state', 'published')
            .where('type', type)
            .sort('-created')
            .exec(function(err, links) {
                if(err) return next(err);

                locals.links = links;
                next();
            });
    });

    view.render('link');
}

function linkDetail(req, res, next) {
    var id = req.query.id;
    var view = new keystone.View(req, res);
	var locals = res.locals;

    locals.section = 'link';

    view.on('init', function(next) {
        Link.model.findById(id, function(err, link) {
            if(err) return next(err);

            if(!link) {
              var notfound = new Error();
              notfound.status = 404;
              return next(notfound);
            }

            locals.link = link;
            locals.site_title = 'Link: ' + link.name + ' - SWIFT.HOW';
            locals.meta_description = link.comment || link.description;
            next();
        });
    });

    view.render(function(err, req, res) {
      if(err) {
        return res.render('404');
      }

      res.render('link-detail');
    });
}

function jump(req, res, next) {
    var id = req.params.id;
    var to = req.query.to;

    // redirect
    res.redirect(to);

    Link.model.findById(id, function(err, link) {
        if(err) return next(err);

        if(link) {
          link.hot++;
          link.save(function(err) {
              if(err) return next(err);
          });
        }
    });
}

module.exports.linkPage = linkPage;
module.exports.linkByType = linkByType;
module.exports.linkDetail = linkDetail;
module.exports.jump = jump;
