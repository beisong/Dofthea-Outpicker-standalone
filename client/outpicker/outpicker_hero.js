// Meteor.subscribe('fantasy_data');


Template.outpicker_hero.onCreated(function () {
    Meteor.call("getCounterpick", Router.current().params.heroid, function (error, result) {
        console.log(result);
        if (result) {
            let newarr = [];

            result.forEach(function (oneCP) {
                oneCP.normCount = (parseFloat(oneCP.count) * 100 / localStorage.getItem('pickRate_' + oneCP.counter)).toFixed(2);
                oneCP.pickRate = localStorage.getItem('pickRate_' + oneCP.counter);
                newarr.push(oneCP)
            });

            newarr = newarr.sort(compareNormVal);

            let Cur_outpicker_highest = newarr[0].normCount;
            console.log(Cur_outpicker_highest);
            Session.set("Cur_outpicker_highest",Cur_outpicker_highest);

            newarr.forEach(function (oneCP) {
                oneCP.normCount = (oneCP.normCount/Cur_outpicker_highest *10).toFixed(2);

            });

            Session.set('counterpicks', newarr);
        }
        else {
            console.log("On Create : getCounterpick: nothing found ")
        }
    });
    
});

Template.outpicker_hero.helpers({
    heroname: function () {
        return Router.current().params.heroid;
    },
    bans: function () {
        if (Session.get('ban')) {
            return Session.get('ban');
        }
    },
    friends: function () {
        if (Session.get('friend')) {
            console.log(Session.get('friend'));
            return Session.get('friend');
        }
    },
    counterpicks: function () {
        if (Session.get('counterpicks')) {return Session.get('counterpicks');
        }
    },
    pick_count: function () {
        if (Session.get('pickcount') >= 0) {
            return Session.get('pickcount');
        }
    }
});

Template.outpicker_hero.events({
});

function compareNormVal(a, b) {
    if (parseFloat(a.normCount )< parseFloat(b.normCount)) {
        return 1;
    }
    if (parseFloat(a.normCount )> parseFloat(b.normCount)) {
        return -1;
    }
    return 0;
}


Template.registerHelper('highlightNorm', function(val) {
    var Cur_outpicker_highest = parseFloat(Session.get("Cur_outpicker_highest"));

    if(val > 5){
        return "fontGreen"
    }
    if(val > 2.5){
        return "fontOrange"
    }
    return "fontBlue"
});
