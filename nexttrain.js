if (Meteor.isClient) {
  Meteor.call('getTrainDetails', function (error, result) {
    if (error) {
      console.log("error", error);
    };
    
    console.log(result);
    
    Session.set("trainTime", result.time);
    Session.set("trainDest", result.dest);
    Session.set("trainStatus", result.status);
  });
  
  Template.details.helpers({
    trainTime: function() {
      return Session.get("trainTime");
    },
    trainDest: function() {
      return Session.get("trainDest");
    },
    trainStatus: function() {
      return Session.get("trainStatus");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var cheerio = Meteor.npmRequire('cheerio');
    
    Meteor.methods({
      getTrainDetails: function () {
        result = Meteor.http.get("http://ojp.nationalrail.co.uk/service/ldbboard/dep/KTN");
        
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
  
}
