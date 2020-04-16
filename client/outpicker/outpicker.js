// Meteor.subscribe('fantasy_data');


Template.outpicker.onRendered(function () {
});

Template.outpicker.helpers({
    strheroes: function () {
        var heroesinfo = Heroes.find({primary_attr: 'str'}, {sort: {localized_name: 1}}).fetch();
        return heroesinfo;
    },
    agiheroes: function () {
        var heroesinfo = Heroes.find({primary_attr: 'agi'}, {sort: {localized_name: 1}}).fetch();
        return heroesinfo;
    },
    intheroes: function () {
        var heroesinfo = Heroes.find({primary_attr: 'int'}, {sort: {localized_name: 1}}).fetch();
        return heroesinfo;
    }
});

Template.outpicker.events({});
