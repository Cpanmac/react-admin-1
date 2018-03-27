
module.exports = {
  path: '/',
  component: require('../app/App'),
  childRoutes: [
    {
      path: 'result',
      component: require('../pages/result'),
    }
  ],
  indexRoute: {
    component: require('../pages/result'),
  }
};
