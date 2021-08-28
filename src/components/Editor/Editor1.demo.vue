<demo>常规用法</demo>
<template>
  <Editor
    v-model:value="bool"
    :config="config"
    category_type="audio"
    :show="showPop"
    :headers="headers"
    :menuAction="menuAction"
    :materialAction="materialAction"
    :imageAction="imageAction"
    :fileAction="fileAction"
    :uploadrefresh="uploadrefresh"
    :binaryUpload="actionUpload"
    @success="success"
  />

  <div v-html="bool"></div>
  <Editor
    v-model:value="bool2"
    :config="config"
    category_type="audio"
    :show="showPop"
    :headers="headers"
    :menuAction="menuAction"
    :materialAction="materialAction"
    :imageAction="imageAction"
    :fileAction="fileAction"
    :uploadrefresh="uploadrefresh"
    :binaryUpload="actionUpload"
  />
  <div v-html="bool2"></div>
</template>

<script lang="ts">
import {ref, reactive} from "vue";
import { Editor } from "../../lib/index";

const config = {
    UEDITOR_HOME_URL: 'https://home.evente.cn/marketing/static/UEditor/',
    // UEDITOR_HOME_URL: '/static/UEditor/', // 本地开发用
    serverUrl: `https://api.dev.mosh.cn/public/embed/ueditor`,
  };
const  menuAction = `https://api.dev.mosh.cn/public/material/category/items`;
const  materialAction = `https://api.dev.mosh.cn/public/material/items`;
const  imageAction = `https://api.dev.mosh.cn/public/material/items`;
const  fileAction = `https://api.dev.mosh.cn/public/upload/media/uptoken`;
const  uploadrefresh = `https://api.dev.mosh.cn/public/upload/media/uptoken/refresh`;
const  actionUpload = `https://api.dev.mosh.cn/public/upload/image/binary`;

const headers = {
  'X-Request-Shop-Id': 4,
}
export default {
  components: { Editor },
  setup() {
    const bool = ref('312321');
    const bool2 = ref('222');
    const showPop = ref(false);
    

    setTimeout(() => {
      showPop.value = true;
    }, 1000);

    const success = () => {
      console.log('success')
    }

    return {
      bool,
      bool2,
      config,
      showPop,
      menuAction,
      materialAction,
      imageAction,
      fileAction,
      uploadrefresh,
      actionUpload,
      headers,
      success
    };
  },
};
</script>

<style>
</style>