const env = process.env.NODE_ENV;

const serverUrlConfig = {
    development: 'http://toa-gs-stg1.paic.com.cn/jkop-admin/api',
    test: 'http://toa-gs-stg1.paic.com.cn/jkop-admin/api',
    production: 'http://toa-gs-stg1.paic.com.cn/jkop-admin/api',
};

export const serverUrl = serverUrlConfig[env];

