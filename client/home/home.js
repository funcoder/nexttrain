

Template.home.rendered = function() {
  var station = "BEC";
  Meteor.call('getTrainDetails', station , function (error, result) {
    if (error) {
      console.log("error", error);
    };
    
    console.log(result);
    
    Session.set("homeTrainTime", result.time);
    Session.set("homeTrainDest", result.dest);
    Session.set("homeTrainStatus", result.status);
    Session.set("homeStation", station);
  });

};

Template.home.helpers({
    Station: function() {
      return Session.get("homeStation");
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
