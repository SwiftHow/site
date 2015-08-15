var keystone = require('keystone');
var request = require('request');
var async = require('async');

var access_token = '';
var refresh_token = '';
var will_expired = 0;
var token_type = '';

function getNewToken(callback) {
    var url = 'https://swift.how/ghost/api/v0.1/authentication/token';
    var form = {
        grant_type: 'password',
        username: process.env.BLOG_USERNAME,
        password: process.env.BLOG_SECRET,
        client_id: 'ghost-admin'
    };
    request.post({ url: url, form: form}, function(err, r, body) {

        if (!err && r.statusCode == 200) {
            var info = JSON.parse(body);

            access_token = info.access_token;
            refresh_token = info.refresh_token;
            will_expired = Date.now() + info.expires_in;
            token_type = info.token_type;

            return callback(null);
        }

        callback({ error: 'auth failed.' });
    });
}

function refreshToken(callback) {
    var url = 'https://blog.swift.how/ghost/api/v0.1/authentication/token';
    var form = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: 'ghost-admin'
    };
    request.post({ url: url, form: form}, function(err, r, body) {

        if (!err && r.statusCode == 200) {
            var info = JSON.parse(body);

            access_token = info.access_token;
            will_expired = Date.now() + info.expires_in;
            token_type = info.token_type;

            return callback(null);
        }

        callback({ error: 'auth failed.' });
    });
}

function authBlog(callback) {

    // if no access_token
    if (!access_token) {
        return getNewToken(callback);
    }

    // if access_token expired
    if (Date.now() >= will_expired) {
        refreshToken(callback);
    } else {
        callback(null);
    }
}

exports = module.exports = function(req, res) {

    authBlog(function(err) {
        if(err) return res.status(500).json(err);

        var options = {
            url: 'https://blog.swift.how/ghost/api/v0.1/posts?limit=1',
            headers: {
                Authorization: token_type + ' ' + access_token
            }
        };

        request.get(options, function(err, r, body) {
            if (!err && r.statusCode == 200) {
                var info = JSON.parse(body);

                return res.json(info);
            }

            res.status(500).json({ error: 'can not get post info.' });
        });
    });
};
