var station = "BEC";
  
Template.work.rendered = function() {
  Meteor.call('getTrainDetails', station , function (error, result) {
    if (error) {
      console.log("error", error);
    };
    
    console.log(result);
    
    Session.set("workTrainTime", result.time);
    Session.set("workTrainDest", result.dest);
    Session.set("workTrainStatus", result.status);
  });

};

Template.work.helpers({
    Station: function() {
      return station;
    },
    TrainTime: function() {
      return Session.get("workTrainTime");
    },
    TrainDest: function() {
      return Session.get("workTrainDest");
    },
    TrainStatus: function() {
      return Session.get("trainStatus");
    }
});