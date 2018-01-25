<template>
<div :class="$style['mobile-wrapper']">
  <div :class="$style['logo-wrapper']">
    <img src="http://qiniu.xingkun.top/logo.png" alt="">
  </div>
  <div class="user-wrapper">
    <div :class="$style['user-img']">
      <img :src="wcUser.img" alt="" style="width: 100%;  height: 100%; object-fit: cover">
    </div>
    <p :class="$style['user-name']">{{wcUser.name}}</p>
  </div>
  <div class="current-item-type">
    <div :class="$style['current-item']">欢迎您:
      <!-- <span style="padding-left: 6px; color: white">{{itemNames[currentItemType]}}</span> -->
      <span style="padding-left: 6px; color: white">参加安吉物流新春团拜会</span>
    </div>
  </div>
  <div :class="$style['control-wrapper']">
    <div class="option">
      <div :class="$style['option-top']" style="padding: 0 6px 24px 6px;">
        <p style='padding: 14px 0'>礼品赠送区</p>
        <div :class="$style['gift-wrapper']">
          <div data-type="gift-item">
            <!-- <div data-type="gift-item-bg" v-if="currentGifts[1] != 1">
              <svg version="1.1" x="0px" y="0px" width="16" height="16" viewBox="0 0 1024 1024">
                <use xlink:href="#gift-sended"></use>
              </svg>
            </div> -->
            <div data-type="gift-img">
              <img src="http://qiniu.xingkun.top/gift1.jpg" alt="">
            </div>
            <div data-type="gift-button" @click="handleClickOpenGift(1)">
              赠送
            </div>
          </div>
          <div data-type="gift-item">
            <!-- <div data-type="gift-item-bg" v-if="currentGifts[2] != 1">
              <svg version="1.1" x="0px" y="0px" width="16" height="16" viewBox="0 0 1024 1024">
                <use xlink:href="#gift-sended"></use>
              </svg>
            </div> -->
            <div data-type="gift-img">
              <img src="http://qiniu.xingkun.top/gift2.jpg" alt="">
            </div>
            <div data-type="gift-button" @click="handleClickOpenGift(2)">
              赠送
            </div>
          </div>
          <div data-type="gift-item">
            <!-- <div data-type="gift-item-bg" v-if="currentGifts[3] != 1">
              <svg version="1.1" x="0px" y="0px" width="16" height="16" viewBox="0 0 1024 1024">
                <use xlink:href="#gift-sended"></use>
              </svg>
            </div> -->
            <div data-type="gift-img">
              <img src="http://qiniu.xingkun.top/gift3.jpg" alt="">
            </div>
            <div data-type="gift-button" @click="handleClickOpenGift(3)">
              赠送
            </div>
          </div>
        </div>
      </div>
      <div :class="$style['option-bottom']">
        <div style='width: 50%; float: left'>
          <div :class="$style['crile-button']" @click='handleClickPraise'>
            <div data-type="button-item" style="background-size: 90%;background-position: 4px 4px;background-repeat: no-repeat;background-image: url(http://qiniu.xingkun.top/finger.png);">

            </div>
          </div>
        </div>
        <div style='width: 50%; position:relative; float: left; height: 96px'>
          <div :class="$style['crile-button']" @click="currentOption='msg'; msg = ''">
            <div data-type="button-item" style="'background-size: 50%;background-position:center;background-repeat: no-repeat;background-image: url(http://qiniu.xingkun.top/msg.png);'">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style['send-gift-wrapper']" v-if="currentOption == 'gift'">
      <p style="padding: 12px 0;">赠送礼物</p>
      <img :src="'http://qiniu.xingkun.top/gift' + currentGift + '.jpg'" alt="" style='height: 180px; margin-bottom:6px'>
      <p style="padding: 12px 0">赠送节目名称：{{itemNames[currentItemType]}}</p>
      <div :class="$style['send-buttons']" class='send-buttons'>
        <div data-type='send-button-item' style="padding-right:6px" @click='sendGift'>
          <p>发送</p>
        </div>
        <div data-type='send-button-item' style="padding-right:6px" @click="currentOption=''">
          <p>取消</p>
        </div>
      </div>
    </div>

    <div :class="$style['send-msg-wrapper']" v-if="currentOption == 'msg'">
      <div style="padding: 0 12px;">
        <p style="padding: 12px 0;">发送弹幕</p>
        <textarea data-type='textarea' v-model='msg' maxlength='11' placeholder="请在此输入您的祝福" />
      </div>
      <div :class="$style['send-buttons']" class='send-buttons'>
        <div data-type='send-button-item' style="padding-right:6px" @click='submitText'>
          <p>发送</p>
        </div>
        <div data-type='send-button-item' style="padding-right:6px" @click="currentOption=''">
          <p>取消</p>
        </div>
      </div>
    </div>
  </div>
  <svg style="display: none" x="0px" y="0px" width="1072" height="1024" viewBox="0 0 1024 1024" xmlns="">
       <!-- 生日提醒 -->
       <g id='gift-sended'>
         <path d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512z m264.931556-672.881778a56.888889 56.888889 0 0 0-80.440889 0L455.111111 592.440889 334.449778 471.779556a56.888889 56.888889 0 0 0-80.497778 80.440888l160.881778 160.881778a56.888889 56.888889 0 0 0 80.440889 0l281.6-281.6a56.888889 56.888889 0 0 0 0.056889-80.384z" p-id="3593" data-spm-anchor-id="a313x.7781069.0.i6"></path>
      </g>
     </svg>
</div>
</template>

<script>
import {
  axiosPost, axiosPostVail
} from '@/lib/ajax.js';
import storagejs from '@/lib/storagejs'
import {
  mapState
} from 'vuex';
import _Fun from 'lodash/Function'
export default {
  name: 'mobile',
  data() {
    return {
      itemNames: {
        '1': '小品《西天取经》',
        '2': '串烧表演《锦绣中华》',
        '3': '舞蹈《绿荫风采》',
        '4': '相声《津味安信》',
        '5': '小品《有你很精彩》',
        '6': '歌曲《广西·我美丽的家》',
        '7': '舞蹈《舞动未来》',
        '8': '小品《将广告进行到底》'
      },
      currentGift: 1, //当前的礼物id， 默认1
      msg: '', //祝福语
      currentOption: '',
      // 当前的节目id
      currentItemType: 1
      // //当前可以赠送礼物的数量
      // currentGifts: {
      //   '1': 1,
      //   '2': 1,
      //   '3': 1
      // }
    }
  },
  // created() {
  //   this.initGetCurrentType()
  // },
  computed: {
    ...mapState(['userInfo']),
    wcUser() {
      return this.userInfo.userInfo
    }
    // currentGiftImg() {
    //   return require(``)
    // }
  },
  methods: {
    //初始化获取当前的节目ID
    initGetCurrentType() {
      axiosPost(`${this.$Host}/queryCurrentItemType`).then(res => {
        const currentItemType = res.data.currentItemType
        this.currentItemType = currentItemType
      })
    },
    /*
    打开礼物页面
    */
    handleClickOpenGift(val) {
      axiosPostVail(`${this.$Host}/queryCurrentItemType`).then(res => {
        const currentItemType = res.data.currentItemType
        this.currentItemType = currentItemType
        const currentStoreGift = storagejs.get(`gift${currentItemType}`)
        if (currentStoreGift[val] == 0) {
          this.$MessageBox('提示', '此礼物，在当前节目中已经发送过了！')
          return
        } else {
          this.currentGift = val
          this.currentOption = 'gift'
        }
      }).catch(()=>{
        this.$MessageBox('提示', '直播通道已关闭，请稍等！')
      })

    },
    /**
    发送礼物
    **/
    sendGift() {
      axiosPostVail(`${this.$Host}/sendGift`, Object.assign({
        itemtype: this.currentItemType,
        gift: this.currentGift
      }, this.wcUser)).then(() => {
        this.$Toast('礼物赠送成功')
        let currentStoreGift = storagejs.get(`gift${this.currentItemType}`)
        currentStoreGift[this.currentGift] = 0
        storagejs.set(`gift${this.currentItemType}`, currentStoreGift)
        this.currentOption = ''
      }).catch(()=>{
        this.$MessageBox('提示', '直播通道已关闭，请稍等！')
      })
    },
    /**
    发送祝福语
    **/
    submitText() {
      axiosPost(`${this.$Host}/queryCurrentItemType`).then(res=>{
        const currentItemType = res.data.currentItemType
        axiosPost(`${this.$Host}/addText`, Object.assign({
          itemtype: currentItemType,
          text: this.msg
        }, this.wcUser)).then(res => {
          this.$Toast('发送成功!')
          this.currentOption = ''
        })
      })
    },
    /**
    点赞
    **/
    handleClickPraise: _Fun.throttle(function() {
      axiosPost(`${this.$Host}/queryCurrentItemType`).then(res => {
        const currentItemType = res.data.currentItemType
        axiosPost(`${this.$Host}/addPraise`, {
          itemtype: currentItemType
        }).then(() => {
          this.$MessageBox('提示:', '点赞成功,10秒后可以再点！')
        })
      })
    }, 10000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' module>
@import "../../style/mystyle.less";
.mobile-wrapper {
    padding: 24px 18px;
    min-height: 100vh;
    color: white;
    background: linear-gradient(#060503, #231001);
}
.logo-wrapper {
    height: 28px;
    margin-bottom: 12px;
    text-align: left;
    & img {
        height: 100%;
    }
}
.user-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid black;
    box-shadow: 0 0 2px 2px @primary-color;
    margin: 0 auto;
}
.user-name {
    padding-top: 8px;
    text-align: center;
    font-weight: bold;
}
.current-item {
    margin-top: 34px;
    background-color: #251f0f;
    padding: 4px 0;
    color: @primary-color;
    font-weight: bold;
    border-radius: 10px;
}
.control-wrapper {
    margin-top: 12px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
}
.option-top {
    background: linear-gradient(#251f0f, #36280f);
    border-radius: 4px;
    margin-bottom: 6px;
}
.gift-wrapper {
    &:after {
        content: "";
        display: table;
        clear: both;
    }
    & [data-type='gift-item'] {
        width: 33.33%;
        float: left;
        padding: 0 1px;
        position: relative;
        & [data-type='gift-item-bg'] {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            color: white;
            font-size: 16px;
            font-weight: bold;
            background-color: rgba(0,0,0,0.6);
            & svg {
                height: 36px;
                max-width: 100%;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 30px;
                top: 0;
                margin: auto;
                fill: white;
            }
        }
    }
    & [data-type='gift-img'] {
        height: 120px;
        border-radius: 4px;
        overflow: hidden;
        & img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    & [data-type='gift-button'] {
        margin-top: 6px;
        padding: 4px 0;
        background-color: #b69c47;
        border-radius: 4px;
        color: #241200;
        font-size: 12px;
        letter-spacing: 6px;
    }
}

.option-bottom {
    background-color: #36280f;
    border-radius: 4px;
    padding-top: 18px;
    padding-bottom: 18px;
    &:after {
        content: '';
        display: table;
        clear: both;
    }
}
.crile-button {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
    background: linear-gradient(#443416, #b59b45);
    transition: transform 0.1s ease;
    &:active {
        transform: scale(.8);
    }
    & [data-type='button-item'] {
        background-color: #ffefba;
        position: absolute;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        overflow: hidden;
    }
}

.send-gift-wrapper {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(#251f0f, #3b2a0e);
}

.send-buttons {
    padding: 0 12px;
    &:after {
        content: '';
        clear: both;
        display: table;
    }
    & [data-type='send-button-item'] {
        width: 50%;
        float: left;
        & p {
            padding: 6px 0;
            border-radius: 4px;
            background-color: #b69c47;
            color: #241100;
            font-size: 12px;
            letter-spacing: 12px;
        }
    }
}

.send-msg-wrapper {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(#251f0f, #3b2a0e);
    & [data-type='textarea'] {
        background: #b69c47;
        color: #746222;
        border: none;
        border-radius: 4px;
        outline: none;
        width: 100%;
        height: 220px;
        margin-bottom: 12px;
        resize: none;
        padding: 12px 6px;
        font-size: 18px;
    }
}
</style>
