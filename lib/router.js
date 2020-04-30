Router.configure({
  // we use the  ApplicationLayout template to define the layout for the entire app
  layoutTemplate: 'ApplicationLayout',
  trackPageView: true

});

Router.route('home', {
  path: '/',
  trackPageView: true,
  onBeforeAction: function () {
    Router.go("outpicker");
  }
});

Router.route('admin', {
  path: '/wsadmin',
  yieldTemplates: {
    'admin': {to: 'body'}
  },
});