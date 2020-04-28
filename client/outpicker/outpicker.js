// Meteor.subscribe('fantasy_data');


Template.outpicker.onRendered(function () {
    //TODO UNABLE TO CLICK AFTER SCROLL
    var input = this.find('#the-filter');
    if(input){
        input.focus()
    }
});

Template.outpicker.helpers({
    strheroes: function () {
        return Heroes.find({primary_attr: 'str'}, {sort: {localized_name: 1}}).fetch();

    },
    agiheroes: function () {
        return heroesinfo = Heroes.find({primary_attr: 'agi'}, {sort: {localized_name: 1}}).fetch();
    },
    intheroes: function () {
        return heroesinfo = Heroes.find({primary_attr: 'int'}, {sort: {localized_name: 1}}).fetch();
    }
});

Template.outpicker.events({
    'keyup #the-filter': function(event) {   // source : https://code-boxx.com/filter-search-list-in-javascript/

        if (event.which === 27) {   // if esc pressed => clear input
            $('#the-filter').val("");
        }

        var search = $('#the-filter').val();
        var all = document.querySelectorAll("figure figcaption");

        for (let i of all) {
            let item = i.innerHTML.toLowerCase();
            if (item.indexOf(search) === -1) {
                i.parentElement.classList.add("hide");
            } else {
                i.parentElement.classList.remove("hide");
            }
        }
    }
});
