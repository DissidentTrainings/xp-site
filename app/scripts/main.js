var practices = ['NoBugDatabase', 'AcceptanceTests', 'TestDrivenDevelopment'];

var index = lunr(function () {
    this.field('title', {boost: 10});
    this.field('body');
    this.field('name', {boost:10});
    this.ref('id');
});

var loadPractice =  function(practiceName) {
    return $.ajax({
        url: './practices/'+practiceName+'.md',
        dataType: 'html'
    }).then(function(res) {
        // we need html
        var converter = new Showdown.converter();
        var html = converter.makeHtml(res);
        var indexData = {
            id: practiceName,
            name: practiceName,
            body: res,
            title: html
        };
        index.add(indexData);
        showPractice(html);
    }).fail(function(err) {
        console.log('err', err);
    });
};

var showPractice = function(practiceName) {
    $('.jumbotron').html(practiceName);
};

var addPracticeToModal = function(practice) {
    var result = index.search('AcceptanceTests');
    console.log(practice, lunr);
};

$(window).ready(function() {
    async.each(practices, loadPractice);
});

$('#random').click(function() {
    numberPractices = practices.length-1;
    randomNumber = Math.round(Math.random()*numberPractices);
    console.log(numberPractices, randomNumber);
    loadPractice(practices[randomNumber]);
});





