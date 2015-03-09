Meteor.startup(function () {
  var cheerio = Meteor.npmRequire('cheerio');
  
  Meteor.methods({
    getTrainDetails: function (location) {
      result = Meteor.http.get("http://ojp.nationalrail.co.uk/service/ldbboard/dep/" + location);
      
      $ = cheerio.load(result.content);
      var result = $('#live-departure-board > div.results.trains > div.tbl-cont > table > tbody > tr.firstRow');

      var elements = result.find('td');

      var resp = {"time" : elements.slice(0, 1).text(),
        "dest" : elements.slice(1, 2).text().replace(/\s{2,10}/g, ''),
        "status" : elements.slice(2, 3).text()};
      


      return resp;
    }
  })
});
  
