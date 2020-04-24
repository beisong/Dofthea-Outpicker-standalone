// Meteor.subscribe('fantasy_data');


Template.outpicker.onRendered(function () {
    var input = this.find('#the-filter');
    if(input){
        input.focus()
    }
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
