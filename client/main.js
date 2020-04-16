import {Meteor} from "meteor/meteor";

Meteor.startup(() => {
  Meteor.call("getPickedRate", function (error, results) {
    if (error) {
      console.log(error);
    }
    else {
      results.forEach(function (element) {
        localStorage.setItem('pickRate_' + element._id.counter, element.count);
      });
    }
  });

});
