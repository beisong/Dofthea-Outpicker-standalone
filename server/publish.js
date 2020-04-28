Meteor.publish('heroes', function () {
    return Heroes.find({});
});