import { VueUeditorWrap } from 'vue-ueditor-wrap/es/index.js';
import Material from "../Material/Material.vue";
import { ref, reactive, onMounted, watch} from 'vue';

const editorDependencies = reactive([
  'ueditor.config.js',
  'ueditor.all.js',
  // 添加秀米相关的资源
  'xiumi-ue-dialog-v5.js',
  'xiumi-ue-v5.css',
]);

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
      default: 'https://api.dev.mosh.cn/',
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
  },
  name: 'Editor',
  components: {
    VueUeditorWrap,
    Material,
  },
  setup(props, { emit }) {
    const myexplain =  ref('');
    //静态文件地址
    let UEDITOR_HOME_URL = ref('');
    UEDITOR_HOME_URL.value = props.config && props.config.UEDITOR_HOME_URL || 'https://cdn.dev.mosh.cn/assets/js/ueditor/ueditor-1.0.0/';

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
      if (data.media_type === 'audio') {
        const str = `<iframe style="width: 100%;border: none;height: 72px;" src="https://cdn.dev.mosh.cn/assets/iframe/ueditor-media/index.html?url=${data.media_meta.media_url}&type=2&name=${data.media_meta.name}" allowfullscreen="true"></iframe>`;
        UEditor.editorInstance.execCommand('inserthtml', str);
      } else if (data.media_type === 'images') {
        const str = `<img src="${data.materialResource.materialUrl}" alt="${data.media_meta.name}" title="${data.media_meta.name}"/>`;
        UEditor.editorInstance.execCommand('inserthtml', str);
      } else if (data.media_type === 'video') {
        const str = `<iframe style="width: 100%;border: none;height: 371px;" src="https://cdn.dev.mosh.cn/assets/iframe/ueditor-media/index.html?url=${data.media_meta.media_url}&type=3" allowfullscreen="true"></iframe>`;
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