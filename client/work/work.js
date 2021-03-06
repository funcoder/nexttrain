
  
Template.work.rendered = function() {
  var station = "KTN";
  
  Session.set("workTrainTime", "");
  Session.set("workTrainDest", "");
  Session.set("workTrainStatus", "Loading");
  Session.set("workStation", station);  
  Session.set("workDetails", ">")
  
  Meteor.call('getTrainDetails', station , function (error, result) {
    if (error) {
      console.log("error", error);
    };
    
    console.log(result);
    
    Session.set("workTrainTime", result.time);
    Session.set("workTrainDest", result.dest);
    Session.set("workTrainStatus", result.status);
    Session.set("workStation", station);
    Session.set("workDetails", station + " to " + result.dest);
  });

};

Template.work.helpers({
    Station: function() {
      return Session.get("workStation");
    },
    TrainTime: function() {
      return Session.get("workTrainTime");
    },
    TrainDest: function() {
      return Session.get("workTrainDest");
    },
    TrainStatus: function() {
      return Session.get("workTrainStatus");
    },
    TrainDetails: function() {
      return Session.get("workDetails");
    }
});