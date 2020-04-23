Template.admin.onCreated(function () {
    // TODO : poll_for_update not done
    // var success = setInterval(poll_for_update, 180000);
});


Template.admin.events({
    /////BP
    'click #initHeroes': function (event) {
        Meteor.call("initHeroes", function (error, results) {
            if (error) {
                console.log(error);
            }
        });
    },

    /////BP
    'click #initBP': function (event) {
        Meteor.call("initBP", function (error, results) {
            if (error) {
                console.log(error);
            }
        });
    },
    'click #testbut': function (event) {
        Meteor.call("testfn", 5367609492, function (error, results) {
        });
    },
    'click #parsematchbp2': function (event) {
        var match_id = $("#parsematchbp2_input").val();        ///////////TO BE CHANGED TO LOOP LEAGUEINFO FOR MATCH ID

        Meteor.call("insertMatchBP2", match_id, function (error, results) {
        });
    },
    'click #parseleaguebp2': function (event) {
        var league_id = $("#parseleaguebp2_input").val();        ///////////TO BE CHANGED TO LOOP LEAGUEINFO FOR MATCH ID
        alert(league_id);
        Meteor.call("insertLeagueBP2", league_id, function (error, results) {
        });
    },
});
//
//
// poll_for_update = function () {
//     Meteor.call("insertTI8Fantasy", 3, function (error, results) {
//         console.log("Match parsed:" + results);
//     });
// };
