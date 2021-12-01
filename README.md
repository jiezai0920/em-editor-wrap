# em-ueditor-wrap for Vue 3

## 基于 vue-ueditor-wrap 二次封装 企业级开发组件
### 一个“包装”了 UEditor 的 Vue3 组件，支持通过 v-model 来绑定富文本编辑器的内容，让 UEditor 的使用简单到像 Input 框一样。


## 运行步骤

1. 运行 yarn
2. 运行 yarn dev
3. 打开 http://127.0.0.1:3000

## 官网打包步骤

1. 运行 yarn
2. 运行 yarn build
3. 得到的 dist 目录就是官网源代码
4. 编辑并运行 sh deploy.sh 就可以上传到 Github 或码云等支持 Pages 功能的平台

## 库文件打包步骤

1. 运行 rollup -c
2. 得到的 dist/lib 目录就是编译后的库文件所在目录

## 发版注意事项
发版需要注释掉 dependencies 里面的  @fe6/water-pro vue vue-router 

{
  "name": "em-ueditor-wrap",
  "version": "0.2.3",
  "files": [
    "dist/*",
    "src",
    "node_modules"
  ],
  "keywords": [
    "vue",
    "vue3",
    "em-ueditor-wrap",
    "editor"
  ],
  "main": "dist/em-ueditor-wrap.js",
  "unpkg": "dist/em-ueditor-wrap.js",
  "module": "dist/em-ueditor-wrap.esm.js",
  "typings": "dist/lib/index.d.ts",
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "build:npm": "rollup -c"
  },
  "resolutions": {
    "node-sass": "npm:sass@1.26.11"
  },
  "dependencies": {
    "@fe6/water-pro": "^3.43.2",
    "axios": "^0.21.1",
    "github-markdown-css": "4.0.0",
    "marked": "1.1.1",
    "prismjs": "1.21.0",
    "vue": "^3.2.7",
    "vue-router": "4.0.0-beta.3"
  },
  "devDependencies": {
    "@babel/core": "^7.15.0",
    "@rollup/plugin-babel": "^5.3.0",
    "@rollup/plugin-json": "^4.1.0",
    "@rollup/plugin-node-resolve": "^13.0.4",
    "@vue/compiler-sfc": "^3.2.7",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-esbuild": "^4.5.0",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-scss": "2.6.0",
    "rollup-plugin-terser": "7.0.2",
    "rollup-plugin-typescript2": "^0.30.0",
    "rollup-plugin-vue": "^6.0.0",
    "rollup-plugin-vue-jsx-compat": "^0.0.6",
    "sass": "1.32.11",
    "typescript": "^4.4.2",
    "vite": "1.0.0-rc.1",
    "vue-ueditor-wrap": "3.x"
  }
}

