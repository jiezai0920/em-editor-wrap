<template>
  <div class="em-ueditor-wrap">
    <vue-ueditor-wrap :editor-dependencies="editorDependencies" v-model="myexplain" :config="myConfig" @ready="addXiumiDialog"></vue-ueditor-wrap>
    <Material
        :headers="headers"
        :category_type="categoryType"
        v-model:show="showPop"
        :menuAction="menuAction"
        :materialAction="materialAction"
        :imageAction="imageAction"
        :fileAction="fileAction"
        :uploadrefresh="uploadrefresh"
        :binaryUpload="binaryUpload"
        :apis="httpApi"
        @success="success"
        @error="error"
        @close="close"
        @commitSuccess="commitSuccess"
      >
    </Material>
  </div>
</template>
<script src="./Editor.js"></script>
<style lang="scss" src="./Editor.scss"></style>
