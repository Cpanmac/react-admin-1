
module.exports = [
    {
        path: '/',
        component: require('../app/App'),
        childRoutes: [
            {
                path: 'result',
                breadcrumbName: 'result',
                component: require('../pages/result'),
            }
        ],
        indexRoute: {
            component: require('../pages/result'),
        }
    },
    {
        path: '/login',
        component: require('../layout/Login'),
    }
];
