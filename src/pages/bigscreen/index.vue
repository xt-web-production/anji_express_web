<template>
<div :class="$style.bigScreen" :style="'background-position: center; background-image: url(' + require('../../assets/bg.jpg') + ');'">
  <div :class="$style['logo-wrapper']">
    <img style="height: 100%;" :src="require('../../assets/logo.png')" alt="">
  </div>
  <div class="text-wrapper">
    <div ref='text-slider' class="text-slider" id='text-slider' style="text-align:right;white-space: nowrap;position: relative;">
      <textitem :name='item.name' :text='item.text' :id='item.id' :style='`top:${item.top * 120}px`' @onSlideEnd='onSlideEnd' v-for='item,index in textItems' :key="'text' + index" />
    </div>
  </div>

  <div class='gift-wrapper'>
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
export default {
  name: 'HelloWorld',
  data() {
    return {
      currentGiftItem: null,
      giftItems: [],
      itemType: 1,
      msg: 'Welcome to Your Vue.js App',
      componentName: 'textitem',
      textItems: [{
        name: '安吉物流公众号',
        id: 1,
        text: '欢迎大家参加联欢晚会',
        top: 0
      }]
    }
  },
  created() {
    const that = this
    const socket = io(this.$SocketHost);
    socket.on('connect', function(val) {
      socket.emit('customSocket', {
        customId: '000CustomIdHere0000'
      });
    })
    socket.on('screen', function(val) {
      this.itemType = val.id
    })
    socket.on('userEnter', function(val) {
      console.log(val);
    })
    socket.on('gift', function(data) {
      that.giftItems.push(data)
    })
    socket.on('text', function(data) {
      const preTop = that.textItems[that.textItems.length - 1] == undefined ? 0 : that.textItems[that.textItems.length - 1].top
      const top = preTop < 3 ? preTop + 1 : 0
      that.textItems.push({
        name: data.name,
        id: data.id,
        text: data.text,
        top
      })
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
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    initIntervalGift(){
      this.setInterGift = setInterval(()=>{
             this.currentGiftItem = null
             setTimeout(()=>{
               this.currentGiftItem = this.giftItems[0]
               this.giftItems.splice(0,1)
             }, 500)
           },2000);
    },
    initSetItemType(val) {
      axios.post(`${this.$Host}/queryCurrentItemType`).then(res => {
        const currentItemType = res.data.data.currentItemType
        this.itemType = currentItemType
      })
    },
    handleChangeScreen(id) {
      axios.post(`${this.$Host}/changeScreen`, {
        id
      })
    },
    //定时器获取点赞数
    queryPraise(itemtype) {
      const that = this
      this.intervalQueryPraise = setInterval(function() {
        axios.post(`${that.$Host}/queryPraise`, {
          itemtype: that.itemType
        })
      }, 3000);
    },
    onSlideEnd(id){
      _Array.remove(this.textItems, function(item) {
        return item.id == id;
      });
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
  background-image: none !important;
}

.logo-wrapper {
  height: 42px;
  margin-bottom: 12px;
  padding-left: 42px;
  text-align: left;
  position: relative;
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
</style>
<style lang='less' scoped>
.gift-list-complete-enter, .gift-list-complete-leave-to
/* .gift-list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(200px);
}
// .gift-list-complete-leave
// /* .gift-list-complete-leave-active for below version 2.1.8 */ {
//   opacity: 0;
//   transform: translateX(-200px);
// }
.gift-list-complete-leave-active {
  opacity: 0;
  transform: translateX(-200px);
}
</style>
