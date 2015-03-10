

Template.home.rendered = function() {
  var station = "BEC";
  
    Session.set("homeTrainTime", "");
    Session.set("homeTrainDest", "");
    Session.set("homeTrainStatus", "Loading");
    Session.set("homeStation", station);
    Session.set("homeDetails", ">");
  
  Meteor.call('getTrainDetails', station , function (error, result) {
    if (error) {
      console.log("error", error);
    };
    
    console.log(result);
    
    Session.set("homeTrainTime", result.time);
    Session.set("homeTrainDest", result.dest);
    Session.set("homeTrainStatus", result.status);
    Session.set("homeDetails", station + " to " + result.dest);
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
    },
    TrainDetails: function() {
      return Session.get("homeDetails");
    }
});
