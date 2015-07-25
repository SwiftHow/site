$(function() {
    function renderArticle(post) {
        $('#article-loading').remove();

        var media = '';
        if (post.image) {
            media = '<div class="mdl-card__media">' +
                '<img src="' + post.image + '">' +
            '</div>';
        }

        var content = media +
            '<div class="mdl-card__title">' +
                '<h4 class="mdl-card__title-text">' + post.title + '</h4>' +
            '</div>' +
            '<div class="mdl-card__supporting-text">' +
                '<span class="mdl-typography--font-light mdl-typography--subhead">' + post.markdown + '</span>' +
            '</div>' +
            '<div class="mdl-card__actions">' +
                '<a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="https://blog.swift.how' + post.url + '">' +
                    'Make the switch' +
                    '<i class="material-icons">chevron_right</i>' +
                '</a>' +
            '</div>';

        $('#article').replaceWith(content);
    }

    // fetch data from another domain with JSONP
    $.getJSON('/latest-post', function(remoteData) {
        if (remoteData && remoteData.posts && remoteData.posts.length) {
            var post = remoteData.posts[0];

            renderArticle(post);
        }
    });
});
