/**
 * component 指向的路由组件文件是从 src/pages 目录开始解析的
 */
const routes = [
  {
    path: '/',
    component: './admin',
  },
  {
    path: '/login',
    component: './login',
  },
  {
    path: '/fileUpload',
    component: './fileUpload',
  },
]

export default routes;
