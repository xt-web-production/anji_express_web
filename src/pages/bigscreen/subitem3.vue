<template lang="html">
  <div :class='$style.bigScreen' :style="'background-position: center; background-image: url(' + require('./subitem2_bg.jpg') + ');'">
    <div :class="$style['logo-wrapper']">
      <img style="height: 100%;" :src="require('../../assets/logo.png')" alt="">
    </div>
    <p style="color: white; margin-top:72px; font-size:31px">安吉物流2018新春团拜会</p>
    <p style='padding: 52px 0 42px; 0'><img src='./subitem3_1.png'/></p>
    <div style="padding: 0 100px;">
      <div :class="$style['ticket-block']" v-for='item in 8'>
        <img data-type='first-img' :src="require('./subitem3_2.png')" alt="">
        <img data-type='num-img' :src="require('./num1.png')" alt="">
        <p :class="$style['ticket-block-title']">战队名称 <span style="color: #dcbe4a; margin-left:12px">{{itemNames[1]}}</span><span :class="$style.ticketVal">
          123<span style="margin-left: 12px">点</span>
        </span></p>
        <div :class="$style['ticket-item']">
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
            <p style="margin-top: 4px; font-size:14px">礼物数<span>123</span></p>
          </div>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
            <p style="margin-top: 4px; font-size:14px">投票数<span>123</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      itemNames: {
        '1' : '小品《西天取经》',
        '2' : '串烧表演《锦绣中华》',
        '3' : '舞蹈《绿荫风采》',
        '4' : '相声《津味安信》',
        '5' : '小品《有你很精彩》',
        '6' : '歌曲《广西·我美丽的家》',
        '7' : '舞蹈《舞动未来》',
        '8' : '小品《将广告进行到底》'
      },
    }
  }
}
</script>

<style lang='less' module>
.bigScreen {
  padding: 64px 0;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  background: rgba(1, 0, 0, 0.16);
  // /background-image: none !important;
}
.logo-wrapper {
  height: 42px;
  margin-bottom: 12px;
  padding-left: 42px;
  text-align: left;
  position: relative;
}
.ticket-block {
  font-size: 20px;
  position: relative;
  background-color: rgba(115,110,41,0.2);
  border-radius: 8px;
  color: white;
  padding: 18px 32px;
  text-align: left;
  margin-bottom: 14px;
  padding-left: 100px;
  & [data-type='first-img'] {
    position: absolute;
    left: -32px;
    top: -32px;
  }
  & [data-type='num-img'] {
    position: absolute;
    left: 32px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
.ticket-block-title {
  color:white;
  font-size: 26px;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
.ticket-item {
  position: relative;
  margin-top: 10px;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}

.progressWrapper {
  width: 50%;
  float: left;
  padding-right: 12px;
  & [data-type='progressbar'] {
    height: 6px;
    background-color: #dcbe4a;
    }
}
.ticketVal {
  float: right;
  color: #dcbe4a;
  font-size: 28px;
}
</style>
