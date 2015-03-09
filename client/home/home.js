var station = "KTN";

Template.home.rendered = function() {
  Meteor.call('getTrainDetails', station , function (error, result) {
    if (error) {
      console.log("error", error);
    };
    
    console.log(result);
    
    Session.set("homeTrainTime", result.time);
    Session.set("homeTrainDest", result.dest);
    Session.set("homeTrainStatus", result.status);
  });

};

Template.home.helpers({
    Station: function() {
      return station;
    },
    TrainTime: function() {
      return Session.get("homeTrainTime");
    },
    TrainDest: function() {
      return Session.get("homeTrainDest");
    },
    TrainStatus: function() {
      return Session.get("homeTrainStatus");
    }
});
