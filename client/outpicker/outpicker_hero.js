// Meteor.subscribe('fantasy_data');


Template.outpicker_hero.onRendered(function () {
    this.autorun(function() {
        Meteor.call("getCounterpick", Router.current().params.heroid, function (error, result) {
            if (result) {
                let newarr = [];
                const ave_pickrate = +localStorage.getItem('average_picked');
                result.forEach(function (oneCP) {
                    let thispickrate = +(localStorage.getItem('pickRate_' + oneCP.counter));
                    // thispickrate =((thispickrate - ave_pickrate) / 2 ) + ave_pickrate;

                    let common_ratio = thispickrate /ave_pickrate;
                    // let common_ratio = (Math.sqrt(localStorage.getItem('pickRate_' + oneCP.counter))/Math.sqrt(ave_pickrate));
                    oneCP.normCount = (oneCP.count/common_ratio).toFixed(2);
                    oneCP.pickRate = localStorage.getItem('pickRate_' + oneCP.counter);
                    newarr.push(oneCP);
                });

                newarr = newarr.sort(compareNormVal);
                Session.set('counterpicks', newarr);
            }
            else {
                console.log("On Create : getCounterpick: nothing found ")
            }
        });
    })
});

Template.outpicker_hero.helpers({
    heroid: function () {
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
    'click figure': function (event) {
        Router.go('outpicker_hero', {heroid: this.counter});
    },
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

    if(val > 0.7*Cur_outpicker_highest){
        return "fontGreen"
    }
    if(val > 0.4*Cur_outpicker_highest){
        return "fontOrange"
    }
    return "fontBlue"
});
