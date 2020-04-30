/**
 * Created by weisong on 16/12/17.
 */
Router.route('outpicker', {
    trackPageView: true,
    waitOn: function () {
        return Meteor.subscribe('heroes');
    },
    path: '/outpicker',
    yieldTemplates: {
        'outpicker': {to: 'body'}
    },
    subscriptions: function () {
        Meteor.subscribe('heroes');
    }
});

Router.route('outpicker_hero', {
    trackPageView: true,
    waitOn: function () {
        return Meteor.subscribe('heroes');
    },
    path: '/outpicker/:heroid',
    yieldTemplates: {
        'outpicker_hero': {to: 'body'}
    },
    subscriptions: function () {
        Meteor.subscribe('heroes');
    }
});
