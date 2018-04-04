import * as reactRouter from 'react-router'

console.log(reactRouter);

const history = reactRouter.browserHistory;

// 在这里切换路由种类就可以切换整个项目的路由
// 前提是，项目中的路由都得用这个文件导出的路由
export default { ...reactRouter, history };