<template>
<div :class="$style.bigScreen" :style="'background-position: center; background-image: url(' + require('../../assets/bg.jpg') + ');'">
  <div :class="$style['logo-wrapper']">
    <img style="height: 100%;" :src="require('../../assets/logo.png')" alt="">
  </div>
  <div class="text-wrapper">
    <div ref='text-slider' class="text-slider" id='text-slider' style="text-align:right;white-space: nowrap;position: relative;">
      <textitem :name='item.name' :text='item.text' :id='item.id' :style='`top:${item.top * 120}px`' @onSlideEnd='onSlideEnd' v-for='item in textItems'/>
    </div>
  </div>
  <h1>大屏幕</h1>

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
import textitem from './text-item.vue'
import axios from 'axios';
import io from 'socket.io-client';
export default {
  name: 'HelloWorld',
  data() {
    return {
      itemType: 1,
      msg: 'Welcome to Your Vue.js App',
      componentName: 'textitem',
      textItems: [{
        name: '安吉物流公众号',
        id: 1,
        text: '欢迎大家参加联欢晚会',
        top: 0
      }],
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
      console.log('this is gift', data)
    })
    socket.on('text', function(data) {
      console.log('this is text', data)
      console.log(that.textItems);
      console.log(that.textItems.length);
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
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
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
<style module>
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
</style>
