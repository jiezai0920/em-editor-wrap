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
