

// ref: https://umijs.org/config/
import routes from './router.config'
const plugins = [
  // ref: https://umijs.org/plugin/umi-plugin-react.html
  ['umi-plugin-react', {
    antd: true,
    dva: true,
    dynamicImport: false,
    title: 'react-admin-client',
    dll: false,
    
    routes: {
      exclude: [
        /models\//,
        /services\//,
        /model\.(t|j)sx?$/,
        /service\.(t|j)sx?$/,
        /components\//,
      ],
    },
  }],
]

// ref: https://umijs.org/config/
const config = {
  treeShaking: true,
  plugins,
  routes,
  devServer: {
    "proxy": {
        "/api": {
          "target": "http://localhost:3001",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "" }
        }
      }
  },
}

export default config;
