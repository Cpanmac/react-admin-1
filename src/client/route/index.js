
module.exports = [
    {
        path: '/',
        key: 'app',
        component: require('../app/index'),
        childRoutes: [
            {
                path: 'result',
                breadcrumbName: 'result',
                component: require('../pages/result'),
            }
        ],
        indexRoute: {
            key: 'result',
            component: require('../pages/result'),
        }
    },
    {
        path: '/login',
        component: require('../layout/Login'),
    }
];
