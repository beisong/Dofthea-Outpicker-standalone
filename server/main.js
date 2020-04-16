import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  if (Heroes.find().count() === 0) {
    Meteor.call("initHeroes", function (error, results) {
      if (error) {
        console.log(error);
      }
    });
  }

  if (BanPick.find().count() === 0) {
    Meteor.call("initBP", function (error, results) {
      if (error) {
        console.log(error);
      }
    });
  }
});
//
// function fiveMinLoopInterval() {
//   Meteor.call("autoInsertTI9Fantasy", function (error, results) {
//     Meteor.call("UpdateTI19MVP", function (error, results) {});
//   })
// }
//
// function threeHrLoopInterval(){
//   console.log("UPDATING TI9 LEAGUE MVP");
//   Meteor.call("UpdateTI19LEAGUEMVP", function (error, results) {});
// }
