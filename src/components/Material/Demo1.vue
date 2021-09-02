<demo>常规用法</demo>
<template>
  <div>
    <button @click="shouMater('images')">Images</button>
  </div>
  <div>
    <button @click="shouMater('audio')">Audio</button>
  </div>
  <div>
    <button @click="shouMater('video')">Video</button>
  </div>
  <Material
      :headers="headers"
      :category_type="category_type"
      v-model:show="showPop"
      :menuAction="menuAction"
      :materialAction="materialAction"
      :imageAction="imageAction"
      :fileAction="fileAction"
      :uploadrefresh="uploadrefresh"
      :binaryUpload="actionUpload"
    >
  </Material>
</template>
<script>
import {ref} from "vue";
import { Material } from "../../lib/index";

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
export default {
  components: { Material },
  setup() {
    const bool = ref('312321');
    const bool2 = ref('222');
    const showPop = ref(false);
    const category_type = ref('');

    const headers = ref({})
    const shouMater = (data) => {
      showPop.value = true;
      category_type.value = data;
      console.log(category_type.value,';category_type.value')
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
      shouMater,
      category_type
    };
  },
};
</script>
