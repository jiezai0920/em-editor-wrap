<template>
  <div>
    <div class="material-pop" v-if="maskShow">
    <div class="material-pop-box">
      <div class="material-pop-box-head">
        <div class="">
          选择素材
        </div>
        <img @click="close" src="https://1img.evente.cn/66/2f/c0/eb2213df511e9bdc0680f7ee20.jpg">
      </div>
      <div class="material-pop-box-main">
        <div class="material-pop-box-main-left">
          <div v-if="!loadFlag" class="">
            <div v-for="(item, index) in categoryArray" :class="[index === menuIndex ? 'active' : '']" class="material-pop-box-main-left-list" @click="changeListIndex(index, item)">
              {{item.category_name}}（{{item.media_count}}）
            </div>
          </div>
          <div v-if="loadFlag" class="material-pop-box-main-left-loading">
            <img src="https://static2.evente.cn/static/img/loading20190802.gif">
          </div>
        </div>
        <div v-if="!loadFlagSucai" class="material-pop-box-main-right">
          <div class="material-pop-box-main-right-upload">
            <div class="material-pop-box-main-right-upload-tip">
              大小不超过{{sizeMax[category_type]}}M
            </div>
            <div  v-if="category_type === 'images'" class="material-pop-box-main-right-upload-btn">
              上传
              <input @change="changeFileImage" type="file" accept=",.png,.jpg,.bmp,.gif,.jpeg," class="material-pop-box-main-right-upload-file" multiple>
            </div>
            <div @click="showMask" v-else class="material-pop-box-main-right-upload-btn">
              上传
            </div>
          </div>
          <div v-if="materialArray.length">
            <!-- 图片 -->
            <div v-if="category_type === 'images'" class="material-pop-box-main-right-imagebox">
              <div v-for="(item, index) in materialArray" class="material-pop-box-main-right-imagebox-list">
                <div class="material-pop-box-main-right-imagebox-list-box" :style="{backgroundImage: `url(${item.materialResource.materialUrl})`}">
                  <div v-if="item.materialMeta && item.materialMeta.dimensions" class="material-pop-box-main-right-imagebox-list-box-tip">
                    {{item.materialMeta.dimensions.width}} * {{item.materialMeta.dimensions.height}}
                  </div>
                </div>
                <div class="material-pop-box-main-right-imagebox-list-checkout">
                  <Checkbox @change="changeCheck(item)" v-model="item.checked">{{item.media_meta.name}}</Checkbox>
                </div>
              </div>
            </div>
            <!-- 视频 -->
            <div v-if="category_type === 'video'" class="material-pop-box-main-right-videobox">
              <div v-for="(item, index) in materialArray" class="material-pop-box-main-right-videobox-list">
                <div class="material-pop-box-main-right-videobox-list-box" :style="{backgroundImage: `url(${item.media_meta.poster})`}">
                  <p>
                    <img class="material-pop-box-main-right-videobox-list-box-operating" src="https://3img.evente.cn/00/65/53/ce58fb25932583729759cf4ceb.jpg" alt="">
                  </p>
                </div>
                <div class="material-pop-box-main-right-videobox-list-checkout">
                  <Checkbox @change="changeCheck(item)" v-model="item.checked">{{item.media_meta.name}}</Checkbox>
                </div>
              </div>
            </div>
            <!-- 音频 -->
            <div v-if="category_type === 'audio'" class="material-pop-box-main-right-audiobox">
              <div v-for="(item, index) in materialArray" class="material-pop-box-main-right-audiobox-list">
                <div class="material-pop-box-main-right-audiobox-list-box">
                  <div class="material-pop-box-main-right-audiobox-list-box-left">
                    <img src="https://2img.evente.cn/a1/72/60/b4755a4b59eb3abca1c2918627.jpg" alt="">
                  </div>
                  <div class="material-pop-box-main-right-audiobox-list-box-right">
                    <div class="top">
                      <img src="https://2img.evente.cn/ca/ca/30/290f58486511add33ab4578306.jpg" alt="">
                    </div>
                    <div class="line">
                      <div class="innerline"></div>
                    </div>
                    <div class="bottom">
                      <span>{{format(item.playTime)}}</span>
                      <span>{{format(item.media_meta.media_duration)}}</span>
                    </div>
                  </div>
                </div>
                <div class="material-pop-box-main-right-audiobox-list-checkout">
                  <Checkbox @change="changeCheck(item)" v-model="item.checked">{{item.media_meta.name}}</Checkbox>
                </div>
              </div>
            </div>
            <!-- 底部分页 -->
            <div class="material-pop-box-main-right-page" v-if="lastPage > 1">
              <Pagination v-model:current="currentPage" size="small" :pageSize="pageSize" @change="changePage" :total="pageTotal" style="vertical-align: middle;display: inline-block"></Pagination>
            </div>
          </div>
          <div v-else class="material-pop-box-main-right-nothing">
            暂无素材
          </div>
        </div>
        <div v-if="loadFlagSucai" class="material-pop-box-main-loading">
          <img src="https://static2.evente.cn/static/img/loading20190802.gif">
        </div>
      </div>
      <div class="material-pop-box-footer">
        <div @click="close" class="material-pop-box-footer-cancle">取消</div>
        <div @click="commitMask" class="material-pop-box-footer-btn">确定</div>
      </div>
    </div>

    <div v-if="showMaskLoad" class="material-pop-upload fadeInDown">
      <!-- 上传视频 -->
      <div class="material-pop-upload-head">
        <div>
          {{category_type === 'video' ? '选择视频': '选择音频'}}
        </div>
        <img @click="closeMask" src="https://1img.evente.cn/66/2f/c0/eb2213df511e9bdc0680f7ee20.jpg">
      </div>
      <div class="material-pop-upload-main">
        <div class="" v-if="category_type === 'video'">
          <div class="material-pop-upload-main-box">
            <div class="material-pop-upload-main-left">
              <p>本地视频</p>
            </div>
            <div class="material-pop-upload-main-right">
              <div class="material-pop-upload-main-right-upbox">
                <span :class="[btnFlag ? '':'disable']" class="material-pop-upload-main-right-upbox-btn">{{uploadText}}</span>
                <input @change="changeFile" type="file" accept=",.mp4,.flv," class="material-pop-upload-main-right-upbox-file">
              </div>
              <p>视频大小不超过500M，支持mp4、flv格式</p>
              <div v-if="fileName" class="material-pop-upload-main-right-progress">
                <div class="material-pop-upload-main-right-progress-text">
                  {{fileName}}
                </div>
                <div class="material-pop-upload-main-right-progress-line">
                  <Progress :percent="valueUpload"></Progress>
                </div>
              </div>
            </div>
          </div>
          <div class="material-pop-upload-main-box">
            <div class="material-pop-upload-main-left">
              <p>添加封面</p>
            </div>
            <div class="material-pop-upload-main-right">
              <div class="material-pop-upload-main-right-upbox">
                <span class="material-pop-upload-main-right-upbox-btn">{{uploadTextImage}}</span>
                <input @change="changeFileBackg" type="file" accept=",.png,.jpg,.bmp,.gif,.jpeg," class="material-pop-upload-main-right-upbox-file">
              </div>
              <p>如果未添加，则封面默认是视频的第一帧</p>
              <div v-if="imgUrl" class="material-pop-upload-main-right-progress">
                <img :src="imgUrl">
              </div>
            </div>
          </div>
        </div>
        <div class="" v-if="category_type === 'audio'">
          <div class="material-pop-upload-main-box">
            <div class="material-pop-upload-main-left">
              <p>本地音频</p>
            </div>
            <div class="material-pop-upload-main-right">
              <div class="material-pop-upload-main-right-upbox">
                <span :class="[btnFlag ? '':'disable']" class="material-pop-upload-main-right-upbox-btn">{{uploadText}}</span>
                <input @change="changeFile" type="file" accept=",.wma,.mp3,.amr," class="material-pop-upload-main-right-upbox-file">
              </div>
              <p>音频大小不超过200M，支持mp3、wma、amr格式</p>
              <div v-if="fileName" class="material-pop-upload-main-right-progress">
                <div class="material-pop-upload-main-right-progress-text">
                  {{fileName}}
                </div>
                <div class="material-pop-upload-main-right-progress-line">
                  <Progress :percent="valueUpload"></Progress>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="material-pop-upload-footer">
        <div @click="closeMask" class="material-pop-box-footer-cancle">取消</div>
        <div @click="suerAdd" class="material-pop-box-footer-btn">确定</div>
      </div>
    </div>
  </div>
  </div>
</template>
<script src="./Material.js"></script>
<style lang="scss" src="./Material.scss"></style>
