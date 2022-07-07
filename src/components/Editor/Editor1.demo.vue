<demo>常规用法</demo>
<template>
  <Editor
    v-model:value="bool"
    :apis="apis"
    env="dev"
    @success="success"
  />
  <div v-html="bool"></div>
  <Editor
    v-model:value="bool2"
    :ifEditorDependencies="ifEditorDependencies"
    :apis="apis"
  />
  <div v-html="bool2"></div>
</template>

<script>
import {ref, reactive, onMounted} from "vue";
import { Editor } from "../../lib/index";

const config = {
    // UEDITOR_HOME_URL: 'https://home.evente.cn/marketing/static/UEditor/',
    UEDITOR_HOME_URL: '/UEditor/', // 本地开发用
    serverUrl: `https://api.dev.mosh.cn/public/embed/ueditor`,
  };
const  menuAction = `https://api.dev.mosh.cn/public/material/category/items`;
const  materialAction = `https://api.dev.mosh.cn/public/material/items`;
const  imageAction = `https://api.dev.mosh.cn/public/material/items`;
const  fileAction = `https://api.dev.mosh.cn/public/upload/media/uptoken`;
const  uploadrefresh = `https://api.dev.mosh.cn/public/upload/media/uptoken/refresh`;
const  actionUpload = `https://api.dev.mosh.cn/public/upload/image/binary`;

const apis = 'https://api.dev.mosh.cn/'

export default {
  components: { Editor },
  setup() {
    const bool = ref('312321');
    const bool2 = ref('222');
    const ifEditorDependencies = ref(true);
    const success = () => {
      console.log('success')
    }

    onMounted(() => {
      setTimeout(() => {
        bool.value = 'dlajkdjaksjdkasjdkadkhueh12udhsu882'
      }, 5000);
    })

    return {
      bool,
      bool2,
      config,
      menuAction,
      materialAction,
      imageAction,
      fileAction,
      uploadrefresh,
      actionUpload,
      ifEditorDependencies,
      apis,
      success
    };
  },
};
</script>
