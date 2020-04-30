import {Meteor} from "meteor/meteor";

Meteor.startup(() => {

  if (Meteor.isClient) {
    Router.plugin('reywood:iron-router-ga');
  }

  Meteor.call("getPickedRate", function (error, results) {
    if (error) {
      console.log(error);
    }
    else {
      let sum = 0;
      results.forEach(function (element) {
        sum+=element.count;
        localStorage.setItem('pickRate_' + element._id.counter, element.count);
      });
      let average = sum/results.length;
      localStorage.setItem('average_picked' , average);
    }
  });

});
