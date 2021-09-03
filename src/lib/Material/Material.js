import { onMounted, watch, ref, reactive } from 'vue';
import Axios from 'axios';
import { Progress, Pagination, Checkbox, message} from '@fe6/water-pro';

const pageSize = 6;
export default {
  components: {
    Progress,
    Pagination,
    Checkbox,
  },
  name: 'Material',
  emits: ['update:show', 'close', 'commitSuccess', 'success', 'error'],
  props:{
    // 控制登录弹框 显示 / 不显示
    show: {
      type: Boolean,
      default: false,
    },
    //侧导航接口
    menuAction: {
      type: String,
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
    domain: { // 是否cookie存储加 domain
      type: String,
      default: 'evente.cn',
    },

    //接口请求
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
  setup(props, { emit }) {
    const pad = (num) => {
      let len = num.toString().length;
      while (len < 2) {
        num = `0${num}`;
        len++;
      }
      return num;
    };
    const format = (interval) => {
      interval |= 0;
      const minute = interval / 60 | 0;
      const second = pad(interval % 60);
      return `${minute}:${second}`;
    };

    const maskShow = ref(false);
    const sizeMax = ref({
      images: 10,
      audio: 200,
      video: 500,
    });


    const uploadText = ref('');
    const uploadTextImage = ref('上传封面');
    const fileNameImg = ref('');
    const fileName = ref('');
    const imgUrl = ref('');
    const valueUpload = ref(0);
    const loadFlag = ref(true);
    const btnFlag = ref(true);
    const showMaskLoad = ref(false);
    const loadFlagSucai = ref(true);
    const media_category_id = ref('');
    const menuIndex = ref(0);
    const currentPage = ref(1);
    const categoryArray = ref([]);
    const lastPage = ref(0);
    const pageTotal = ref(0);
    const materialArray = ref([]);


    const close = () => {
      maskShow.value = false;
      loadFlag.value = true;
      loadFlagSucai.value = true;
      categoryArray.value = [];
      materialArray.value = [];
      emit('update:show', maskShow.value);
      emit('close', maskShow.value);
    };

    const commitMask = () => {
      let data = {};
      materialArray.value.forEach((item) => {
        if (item.checked) {
          data = item;
        }
      });
      emit('commitSuccess', data);
      close();
    };
    

    const resetUp = () => {
      uploadText.value = '上传视频';
      uploadTextImage.value = '上传封面';
      valueUpload.value = 0;
      btnFlag.value = true;
      // this.canUploadImage = true;
      fileNameImg.value = '';
      fileName.value = '';
      imgUrl.value = '';
    };

    const changeCheck = (data) => {
      materialArray.value.forEach((item) => {
        item.checked = false;
      });
      data.checked = !data.checked;
    };

    //拉去素材
    const getmaterial = () => {
      materialArray.value = [];
      loadFlagSucai.value = true;
      const url = `materialType=${props.category_type}&_page=${currentPage.value}&_limit=6&categoryId=${media_category_id.value}`;
      Axios({
        method: 'get',
        url: `${props.apis}${props.materialAction}?${url}`,
        headers: props.headers,
        withCredentials: props.domain === 'evente.cn',
      }).then((result) => {
        if (result.data.code === 10000) {
          lastPage.value = result.data.data.pagination.lastPage;
          pageTotal.value = 10;
          result.data.data.data.forEach((item) => {
            materialArray.value.push({
              media_id: item.materialId,
              media_type: item.materialType,
              media_meta: item.materialMeta,
              created_at: item.createdAt,
              materialResource: item.materialResource,
              checked: false,
            });
          });
          loadFlagSucai.value = false;
        }
      }).catch(function (result) {
        loadFlagSucai.value = false;
        emit('error', result.data.data.message);
      });
    };

    //点击菜单 切换
    const changeListIndex = (index, data) => {
      loadFlagSucai.value = true;
      menuIndex.value = index;
      media_category_id.value = data.id;
      getmaterial();
    }

    //分页方法
    const changePage = (page) => {
      currentPage.value = page;
      loadFlagSucai.value = true;
      getmaterial();
    };

    //测导航请求
    const getMenu = () => {
      categoryArray.value = [];
      loadFlag.value = true;
      Axios({
        method: 'get',
        url: `${props.apis}${props.menuAction}?materialType=${props.category_type}`,
        headers: props.headers,
        withCredentials: props.domain === 'evente.cn',
      }).then((res) => {
        const result = res.data;
        if (result.code === 10000) {
          result.data.forEach((item) => {
            categoryArray.value.push({
              category_type: item.categoryType,
              category_name: item.categoryName,
              id: item.id,
              media_count: item.materialsCount,
            });
          });
          media_category_id.value = categoryArray.value[0].id;
          loadFlag.value = false;
          getmaterial();
        }
      }).catch(function (result) {
        loadFlag.value = false;
        emit('error', result.data.message);
      });
    };

    //弹窗展示方法
    const showMask = () => {
      showMaskLoad.value = true;
    };

    const closeMask = () => {
      resetUp();
      showMaskLoad.value = false;
    };

    const commiting = ref(false);
    const videoId = ref('');
    const suerAdd = () => {
      if (commiting.value) {
        return;
      }
      if (!videoId.value) {
        return;
      }
      const parmamsUrl = `materialType=${props.category_type}&vod_id=${videoId.value}&category_id=${media_category_id.value}&poster=${imgUrl.value}`;
      commiting.value = true;
      Axios({
        method: 'post',
        url: `${props.apis}${props.imageAction}?${parmamsUrl}`,
        headers: props.headers,
        withCredentials: props.domain === 'evente.cn',
      }).then((result) => {
        commiting.value = false;
        closeMask();
        getMenu();
      }).catch((result) => {
        commiting.value = false;
        message.error(result.data.data.message);
      });
    };

    const postFilesImages = ref([]);
    const canUpload = ref(true);
    const postHandle = (file, index) => {
      if (file.size > 10000 * 1024) {
        message.error('图片最大尺寸为10M');
        return false;
      }

      const formData = new FormData();
      formData.append('file', file);
      const parmamsUrl = `material_type=images&category_id=${media_category_id.value}`;
      Axios({
        method: 'post',
        url: `${props.apis}${props.imageAction}?${parmamsUrl}`,
        data: formData,
        headers: props.headers,
        withCredentials: props.domain === 'evente.cn',
      }).then((result) => {
        if (postFilesImages.value.length - 1 === index) {
          getmaterial();
          getMenu();
        }
        emit('success', result.data.message);
      }).catch(function (result) {
        emit('error', result.data.message);
      });
      return false;
    };
    //上传图片
    const changeFileImage = (e) => {
      const files = e.target.files;
      postFilesImages.value = Array.prototype.slice.call(files);
      postFilesImages.value.forEach((file, index) => {
        postHandle(file, index);
      });
    };

    const canLoad = () => {
      canUpload.value = true;
      uploadTextImage.value = '上传封面';
    };
    const canNotLoad = () => {
      canUpload.value = false;
      uploadTextImage.value = '上传中...';
    };


    const postHandleVideo = (file) => {
      // check maxSize
      if (file.size > 10000 * 1024) {
        message.error('图片最大尺寸为10M');
        return false;
      }
      if (canUpload.value) {
        canNotLoad();
        const self = this;
        const formData = new FormData();
        formData.append('file', file);
        const parmamsUrl = `materialType=images&category_id=${media_category_id.value}`;
        Axios({
          method: 'post',
          url: `${props.apis}${props.binaryUpload}?${parmamsUrl}`,
          data: formData,
          headers: props.headers,
          withCredentials: props.domain === 'evente.cn',
        }).then((result) => {
          fileNameImg.value = result.data.data.meta.name;
          imgUrl.value = result.data.data.url;
          canLoad();
          emit('success', result.data.message);
        }).catch(function (result) {
          canLoad();
          emit('error', result.data.message);
        });
      }
      return false;
    };

    //上传图片
    const changeFileBackg = (e) => {
      const files = e.target.files;
      const postFiles = Array.prototype.slice.call(files);
      postFiles.forEach((file) => {
        postHandleVideo(file);
      });
    };

    const uploaderObj = reactive({
      uploader: null,
    });

    const createUploader = () => {
      const uploader = new AliyunUpload.Vod({
        timeout: 60000,
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: 'cn-shanghai',
        userId: '1303984639806000',
        // 添加文件成功
        addFileSuccess(uploadInfo) {
          const size = uploadInfo.file.size / 1000 / 1024;
          const categoryObj = {
            'video': 500,
            'audio': 200,
          }
          var maxSize = categoryObj[props.category_type];
          if (size < maxSize) {
            fileName.value = uploadInfo.file.name;
            uploaderObj.uploader.startUpload();
          } else {
            message.error(`大小不超过${maxSize}M`);
          }
        },
        // 开始上传
        onUploadstarted(uploadInfo) {
          if (!uploadInfo.videoId) {
            const parmamsUrl = `file_name=${uploadInfo.file.name}`;
            Axios({
              method: 'get',
              url: `${props.apis}${props.fileAction}?${parmamsUrl}`,
              headers: props.headers,
              withCredentials: props.domain === 'evente.cn',
            }).then((res) => {
              if (res.data.code === 10000) {
                const uploadAuth = res.data.data.credentials.uploadAuth;
                const uploadAddress = res.data.data.credentials.uploadAddress;
                const videoId = res.data.data.credentials.videoId;
                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
                emit('success', res.data.data.message);
              }
            }).catch(function (result) {
                emit('error', result.data.message);
            });
          } else {
            const parmamsUrl = `vod_id=${uploadInfo.videoId}`;
            Axios({
              method: 'get',
              url: `${props.apis}${props.uploadrefresh}?${parmamsUrl}`,
              headers: props.headers,
              withCredentials: props.domain === 'evente.cn',
            }).then((res) => {
              if (res.data.code === 10000) {
                const uploadAuth = res.data.data.uploadAuth;
                const uploadAddress = res.data.data.uploadAddress;
                const videoId = res.data.data.videoId;
                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
                emit('success', res.data.data.message);
              }
            }).catch(function (result) {
                emit('error', result.data.data.message);
            });
          }
        },
        // 文件上传成功
        onUploadSucceed(uploadInfo) {
          videoId.value = uploadInfo.videoId;
          // self.statusText = '文件上传成功!';
          uploadText.value = '上传成功';
          btnFlag.value = true;
          message.success('文件上传成功');
        },
        // 文件上传失败
        onUploadFailed(uploadInfo, code, message) {
          // self.statusText = '文件上传失败!';
          uploadText.value = '重新上传';
          btnFlag.value = true;
          message.error('文件上传失败');
        },
        // 取消文件上传
        onUploadCanceled(uploadInfo, code, message) {
          // self.statusText = '文件已暂停上传';
          uploadText.value = '重新上传';
          btnFlag.value = true;
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress(uploadInfo, totalSize, progress) {
          const progressPercent = Math.ceil(progress * 100);
          valueUpload.value = progressPercent;
          // self.statusText = '文件上传中...';
          uploadText.value = '上传中...';
          btnFlag.value = false;
        },
        // 上传凭证超时
        onUploadTokenExpired(uploadInfo) {
          // self.statusText = '文件超时...';
          uploadText.value = '重新上传';
          btnFlag.value = true;
          message.error('文件上传超时');

        },
        // 全部文件上传结束
        onUploadEnd(uploadInfo) {
          // self.statusText = '文件上传完毕';
          uploadText.value = '上传成功';
          btnFlag.value = true;
        },
      });
      return uploader;
    };

     //上传视频
     const changeFile = (e) => {
      if (!btnFlag.value) {
        return;
      }
      const files = e.target.files;
      valueUpload.value = 0;
      fileName.value = '';
      const postFiles = Array.prototype.slice.call(files);
      postFiles.forEach((file) => {
        const userData = '{"Vod":{}}';

        uploaderObj.uploader = createUploader();
        uploaderObj.uploader.addFile(file, null, null, null, userData);
      });
    };

    watch(
      () => props.show,
      (val) => {
        maskShow.value = val;
        if (val) {
          getMenu();
        }
      },
    );
    watch(
      () => props.category_type,
      (val) => {
        const nameType = {
          audio: '上传音频',
          video: '上传视频',
        };
        uploadText.value = nameType[val];
      },
    );
    // const isInclude = (name: string) => {
    //   var js= /js$/i.test(name);
    //   var es=document.getElementsByTagName(js?'script':'link');
    //   for(var i = 0; i< es.length; i++) {
    //     if(es[i][js ? 'src': 'href'].indexOf(name) != -1)
    //     return true;
    //   }
    //   return false;
    // }

    onMounted(() => {
      const nameType = {
        audio: '上传音频',
        video: '上传视频',
      };
      maskShow.value = props.show;
      uploadText.value = nameType[props.category_type];

      const arr = [
            'https://objects.evente.cn/assets/vendor/aliyun-upload-sdk-1.5.0/lib/es6-promise.min.js', 
            'https://objects.evente.cn/assets/vendor/aliyun-upload-sdk-1.5.0/lib/aliyun-oss-sdk-5.3.1.min.js',
            'https://objects.evente.cn/assets/vendor/aliyun-upload-sdk-1.5.0/aliyun-upload-sdk-1.5.0.min.js',
          ];
      arr.forEach((item) => {
        // if (!isInclude(item)) {
          
        // }
        let s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = item;
        document.body.appendChild(s);
      })
    });

    return {
      // 参数
      maskShow,
      uploadText,
      loadFlag,
      categoryArray,
      menuIndex,
      loadFlagSucai,
      sizeMax,
      materialArray,
      lastPage,
      showMaskLoad,
      btnFlag,
      fileName,
      valueUpload,
      uploadTextImage,
      imgUrl,

      // 方法
      close,
      closeMask,
      changeListIndex,
      changeFileImage,
      showMask,
      format,
      changeFile,
      changeFileBackg,
      commitMask,
      suerAdd,
      changePage,
      currentPage,
      pageTotal,
      pageSize,
      changeCheck,
    }
  },
};
