Router.configure({
  // we use the  ApplicationLayout template to define the layout for the entire app
  layoutTemplate: 'ApplicationLayout',
});

Router.route('home', {
  path: '/',
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