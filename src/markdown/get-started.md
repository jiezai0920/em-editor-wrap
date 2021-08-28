# 开始使用

请先[安装](#/doc/install)本组件库。

然后在你的代码中写入下面的代码

```
import VueUeditorWrap from 'em-ueditor-wrap';
```

就可以使用我提供的组件了。

## Vue 单文件组件

代码示例：

```
<template>
  <vue-ueditor-wrap
    v-model="msg"
    editor-id="editor-with-xiumi"
    :config="editorConfig"
    :editor-dependencies="editorDependencies"
  ></vue-ueditor-wrap>
</template>
```
