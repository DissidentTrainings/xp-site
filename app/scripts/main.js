/* global async: false */
$(window).ready(function() {
    $.ajax({
        url: 'https://api.github.com/repos/DissidentTrainings/xp-practices-workshop/contents/practices?callback=foo',
        data: {},
        dataType: 'jsonp'
    }).then(function(res) {
        console.log(res.data);
        async.eachSeries(res.data, function(practice, callback) {
            console.log(practice);
            callback();
        });
        // foo
    });
});
