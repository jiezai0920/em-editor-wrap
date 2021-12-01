import { VueUeditorWrap } from 'vue-ueditor-wrap/es/index.js';
import Material from "../Material/Material.vue";
import { ref, reactive, onMounted, watch} from 'vue';

export default {
  emits: ['update:value', 'success', 'error', 'close'],
  props:{
    value: String,
    config: Object,
    domain: { // 是否cookie存储加 domain
      type: String,
      default: 'evente.cn',
    },
    // 控制登录弹框 显示 / 不显示
    show: {
      type: Boolean,
      default: false,
    },
    //侧导航接口
    menuAction: {
      type: String,
      default: 'public/material/category/items',
    },
    headers: {
      type: Object,
      default() {
        return {};
      },
    },
    category_type: {
      type: String,
      default: 'video',
    },
    apis: {
      type: String,
      default: 'https://eapi.evente.cn/',
    },
    //素材列表
    materialAction: {
      type: String,
      default: 'public/material/items',
    },
    //图片上传接口
    imageAction: {
      type: String,
      default: 'public/material/items',
    },
    //视频/音频上传接口
    fileAction: {
      type: String,
      default: 'public/upload/media/uptoken',
    },
    //视频/音频上传接口
    uploadrefresh: {
      type: String,
      default: 'public/upload/media/uptoken/refresh',
    },
    //视频/音频上传接口
    binaryUpload: {
      type: String,
      default: 'public/upload/image/binary',
    },
    ifEditorDependencies: {
      type: Boolean,
      default: false,
    },
  },
  name: 'Editor',
  components: {
    VueUeditorWrap,
    Material,
  },
  setup(props, { emit }) {
    let editorDependencies = reactive([
      'ueditor.config.js',
      'ueditor.all.js',
    ]);
    if (props.ifEditorDependencies) {
      editorDependencies.push('xiumi-ue-dialog-v5.js');
      editorDependencies.push('xiumi-ue-v5.css');
    }
    const myexplain =  ref('');
    //静态文件地址
    let UEDITOR_HOME_URL = ref('');
    UEDITOR_HOME_URL.value = props.config && props.config.UEDITOR_HOME_URL || 'https://ecdn.evente.cn/assets/js/ueditor/ueditor-1.0.0/';

    function getCookie(name){
      var strcookie = document.cookie;//获取cookie字符串
      var arrcookie = strcookie.split("; ");//分割
      //遍历匹配
      for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
          return arr[1];
        }
      }
      return "";
    }

    const publistHeader = reactive({
      'Authorization': getCookie('Em-Business-Token'),
      'X-Request-Shop-Id': getCookie(`${getCookie('Em-Business-Phone')}_X-Request-Em-Business-Shop-Id`),
    });

    let myConfig = reactive({
      autoHeightEnabled: false,
      initialFrameHeight: 440,
      zIndex: 9,
      initialFrameWidth: '100%',
      UEDITOR_HOME_URL: UEDITOR_HOME_URL.value,
      mode: 'observer',
    });

    const categoryType = ref('');
    const showPop = ref(false);
    const UEditor = reactive({
      editorInstance: {},
    });
    const addXiumiDialog = (editorInstance) => {
      UEditor.editorInstance = editorInstance;
      editorInstance.commands.addimgv2 = {
        execCommand() {
          categoryType.value = 'images';
          showPop.value = true;
        },
      };
      editorInstance.commands.addaudiov2 = {
        execCommand() {
          categoryType.value = 'audio';
          showPop.value = true;
        },
      };
      editorInstance.commands.addvideov2 = {
        execCommand() {
          categoryType.value = 'video';
          showPop.value = true;
        },
      };
    };

    const success = (str) => {
      emit('success', str);
    };
  
    const error = (str) => {
      emit('error', str);
    };
    
    const close = () => {
      showPop.value = false;
      emit('close');
    };
    const commitSuccess = (data) => {
      console.log(data)
      if (data.media_type === 'audio') {
        // const str = `<iframe width="100%" style="width: 100%;border: none;height: 72px;" src="https://ecdn.evente.cn/assets/iframe/ueditor-media/index.html?url=${data.materialResource.materialUrl}&type=2&name=${data.media_meta.name}" allowfullscreen="true"></iframe>`;
        const str = `<audio style="width: 100%;border: none;height: 72px;" src="${data.materialResource.materialUrl}" controls="true"></audio>`
        UEditor.editorInstance.execCommand('inserthtml', str);
      } else if (data.media_type === 'images') {
        const str = `<img style="width:${data.media_meta.dimensions.width}px" mode="widthFix" src="${data.materialResource.materialUrl}" alt="${data.media_meta.name}" title="${data.media_meta.name}"/>`;
        UEditor.editorInstance.execCommand('inserthtml', str);
      } else if (data.media_type === 'video') {
        // const str = `<iframe width="100%" style="width: 100%;border: none;height: 385px;" src="https://ecdn.evente.cn/assets/iframe/ueditor-media/index.html?url=${data.materialResource.materialUrl}&type=3" allowfullscreen="true"></iframe>`;
        const str = `<video style="width: 100%;border: none;height: 385px;" src="${data.materialResource.materialUrl}" controls="controls">您的浏览器不支持 video 标签。</video>`;
        UEditor.editorInstance.execCommand('inserthtml', str);
      }
    };

    watch(
      () => myexplain.value,
      (val) => {
        emit('update:value', myexplain.value);
      },
    );

    onMounted(() => {
      Object.assign(myConfig, props.config);
      categoryType.value = props.category_type;
      myexplain.value = props.value ? props.value : '';

      Object.assign(props.headers, publistHeader);
    });
    return {
      myexplain,
      UEDITOR_HOME_URL,
      myConfig,
      editorDependencies,
      addXiumiDialog,
      success,
      error,
      close,
      categoryType,
      showPop,
      commitSuccess,
      publistHeader,
    };
  },
};
