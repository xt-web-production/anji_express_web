<template>
<div :class="$style.bigScreen" :style="'background-position: center; background-image: url(' + require('./big_bg.jpg') + ');'">
  <div :class="$style['logo-wrapper']">
    <img style="height: 100%;" :src="require('../../assets/logo.png')" alt="">
  </div>
  <div :class="$style['text-wrapper']">
    <div ref='text-slider' id='text-slider' style="z-index:10;text-align:right;white-space: nowrap;position: relative;">
      <textitem :name='item.name' :text='item.text' :itemIndex='item.index' :style='`top:${item.top * 120}px`' @onSlideEnd='onSlideEnd' v-for='item,index in textItems' :key="'text' + index" />
    </div>
    <div :class="$style['img-box']" v-show='currentGiftId'>
      <img src="./bggift1.jpg" alt="" v-show='currentGiftId == 1'>
      <img src="./bggift2.jpg" alt="" v-show='currentGiftId == 2'>
      <img src="./bggift3.jpg" alt="" v-show='currentGiftId == 3'>
    </div>
  </div>

  <div class='gift-wrapper' style="margin-top: 112px;text-align: left;padding-left: 36px;">
    <transition name="gift-list-complete" style="white-space: nowrap;">
      <div :class="$style['gift-list-item']" v-if='currentGiftItem'>
        <span :class="$style['gift-user-img']" :style="'background-image: url(' + currentGiftItem.img +');'">
        </span>
        <div style="text-align: left;overflow: hidden;">
          <p style="margin-bottom: 0px; font-size: 28px; color:white">{{currentGiftItem.name}}</p>
          <p style='color:#dcbe4a;font-weight:bold;font-size: 28px;'>为该节目赠送了礼物</p>
        </div>
        <img src="./gift.png" style="position: absolute;top: -40px;right: 24px;width: 140px;">
      </div>
    </transition>
  </div>

  <div :class="$style['footer-wrapper']">
    <div class="enter-wrapper" style="text-align:left">
      <p
        v-for="item,index in currentEnterItems"
        :key="'enter' + index"
        :class="$style['enter-list-item']"
      >
      <img :src='item.img' alt="">
        {{ item.name }}
        <span style='color: #dcbe4a'>进入了直播间</span>
      </p>
    </div>
    <div :class="$style['praise-wrapper']" :style="'background-image: url(' + require('./parise.png') + ');'">
      <span>
        {{praise > 999 ? 999 : praise}}
      </span>
    </div>
  </div>


  <svg style="display: none" x="0px" y="0px" width="1072" height="1024" viewBox="0 0 1024 1024" xmlns="">
       <!-- 生日提醒 -->
       <g id='msg-icon'>
         <path d="M536.323489 908.824531c58.02045 0 135.543573 124.817103 164.797581 114.5782s89.712293-166.747848 129.205205-188.688355A442.515635 442.515635 0 0 0 1072.646978 454.412265C1072.646978 203.315359 832.764109 0 536.323489 0S0 203.315359 0 454.412265s239.88287 454.412265 536.323489 454.412266z" p-id="20993" data-spm-anchor-id="a313x.7781069.0.i0"></path>
      </g>
     </svg>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import _Array from 'lodash/Array';
import _Fun from 'lodash/Function';
import textitem from './text-item.vue'
import axios from 'axios';
import io from 'socket.io-client';
import storage from '@/lib/storagejs'
export default {
  name: 'bigscreen',
  data() {
    return {
      itemNames: {
        1 : '小品《西天取经》',
        2 : '串烧表演《锦绣中华》',
        3 : '舞蹈《绿荫风采》',
        4 : '相声《津味安信》',
        5 : '小品《有你很精彩》',
        6 : '歌曲《广西·我美丽的家》',
        7 : '舞蹈《舞动未来》',
        8 : '小品《将广告进行到底》'
      },
      currentGiftItem: null,
      giftItems: [], // 获取礼物列表
      enterItems: [], //用户登录列表
      praise: 0, //点赞数
      itemType: 1,
      msg: 'Welcome to Your Vue.js App',
      componentName: 'textitem',
      textItems: []
    }
  },
  created() {
    this.textItems = [{
      name: '当前节目',
      id: 1,
      text: this.itemNames[this.itemType],
      top: 0,
      index:0
    }]

    const that = this
    const socket = io(this.$SocketHost);
    socket.on('connect', function(val) {
      socket.emit('customSocket', {
        customId: '000CustomIdHere0000'
      });
    })
    // 更换节目
    socket.on('screen', function(val) {
      if (val.id == that.itemType) return

      // 记录当前的点赞数
      storage.set(`praise${that.itemType}`, that.praise)
      that.praise = storage.get(`praise${val.id}`) || 0

      const itemType = val.id
      that.itemType = itemType
      that.textItems.push({
        name: '当前节目',
        id: 1,
        text: that.itemNames[itemType],
        top: 0,
        index:0
      })
      // 礼物列表清零
      that.giftItems = []
       // 情况祝福语
      that.textItems = []

    })
    // 用户登录
    socket.on('userEnter', function(data) {
      console.log(data);
      that.enterItems.push(data.data)
    })
    // 礼物
    socket.on('gift', function(data) {
      that.giftItems.push(data)
    })
    // 祝福语
    socket.on('text', function(data) {
      const preTop = that.textItems[that.textItems.length - 1] == undefined ? 0 : that.textItems[that.textItems.length - 1].top
      const _preIndex = that.textItems[that.textItems.length - 1] == undefined ? 0 : that.textItems[that.textItems.length - 1].index
      const top = preTop < 3 ? preTop + 1 : 0
      const index = _preIndex + 1
      that.textItems.push({
        name: data.name,
        id: data.id,
        text: data.text,
        top,
        index
      })
    })
    // 点赞
    socket.on('praise', function() {
      that.praise++
    })
  },
  watch: {
    // 监听动态显示礼物
    giftItems(val){
      if (val.length) {
          !this.setInterGift && this.initIntervalGift()
      } else {
        if (this.setInterGift) {
          clearInterval(this.setInterGift)
          this.setInterGift = null
        }
      }
    },
    // 监听动态显示礼物
    enterItems(val){
      if (val.length) {
          !this.setInterEnter && this.initIntervalEnter()
      } else {
        if (this.setInterEnter) {
          clearInterval(this.setInterEnter)
          this.setInterEnter = null
        }
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    currentGiftId(){
      return this.currentGiftItem ? this.currentGiftItem.gift : 0
    },
    currentEnterItems(){
      return this.enterItems.slice(0,5)
    }
  },
  methods: {
    // 礼物滚动动画
    initIntervalGift(){
      this.setInterGift = setInterval(()=>{
             this.currentGiftItem = null
             setTimeout(()=>{
               this.currentGiftItem = this.giftItems[0]
               this.giftItems.splice(0,1)
             }, 500)
           },2000);
    },
    // 登录滚动动画
    initIntervalEnter(){
      this.setInterEnter = setInterval(()=>{
             this.enterItems.splice(0,1)
           },2000);
    },
    // 当祝福语弹幕消失之前回调
    onSlideEnd(itemIndex){
      if (itemIndex > 200) {
        this.textItems = []
      }
    }
  },
  components: {
    textitem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' module>
.bigScreen {
  height: 1500px;
  width: 833px;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  padding: 64px 0;
  // /background-image: none !important;
}
.logo-wrapper {
  height: 42px;
  margin-bottom: 12px;
  padding-left: 42px;
  text-align: left;
  position: relative;
}
.text-wrapper {
  position: relative;
  height: 574px;
  margin-top: 110px;
  padding-top: 78px;
}
.img-box {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 574px;
  height: 574px;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.gift-item {
  padding: 18px;
}
.gift-list-item {
  width: 514px;
  background-color: rgba(220,190,74,0.2);
  padding:6px 160px 6px 100px;
  border-radius: 45px;
  transition: all 1s;
  display: inline-block;
  position: relative;
}
.gift-user-img {
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.footer-wrapper {
  position: absolute;
  left: 36px;
  right: 0;
  bottom: 0;
  height: 410px;
  padding-right: 216px;
}
.enter-list-item {
  color: white;
  font-size: 24px;
  line-height: 44px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  & img {
    vertical-align: middle;
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
}
.praise-wrapper {
  width: 171px;
  height: 171px;
  position: absolute;
  right: 36px;
  bottom: 78px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  & span {
    position: absolute;
    background-color: #dcbe4a;
    bottom: 6px;
    right: 4px;
    width: 46px;
    height: 46px;
    line-height: 46px;
    border-radius: 50%;
    font-size: 22.5px;
    color :white;
  }
}
</style>
<style lang='less' scoped>
.gift-list-complete-enter, .gift-list-complete-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.gift-list-complete-leave-active {
  opacity: 0;
  transform: translateX(-200px);
}
</style>
