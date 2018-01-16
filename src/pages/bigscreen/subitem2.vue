<template lang="html">
  <div :class='$style.bigScreen' :style="'background-position: center; background-image: url(' + require('./subitem2_bg.jpg') + ');'">
    <div :class="$style['logo-wrapper']">
      <img style="height: 100%;" :src="require('../../assets/logo.png')" alt="">
    </div>
    <p style="color: white; margin-top:72px; font-size:31px">安吉物流2018新春团拜会</p>
    <p style='padding: 52px 0 42px; 0'><img src='./subitem2_1.png'/></p>
    <div style="padding: 0 100px;">
      <div :class="$style['ticket-block']">
        <p style="color: #dcbe4a; font-size: 26px;">战队名称</p>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemNames[1]}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
          </div>
          <span :class="$style.ticketVal">
            123<span style="margin-left: 12px">票</span>
          </span>
        </div>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemNames[2]}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
          </div>
          <span :class="$style.ticketVal">
            123<span style="margin-left: 12px">票</span>
          </span>
        </div>
      </div>
      <div :class="$style['ticket-block']">
        <p style="color: #dcbe4a; font-size: 26px;">战队名称</p>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemNames[3]}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
          </div>
          <span :class="$style.ticketVal">
            123<span style="margin-left: 12px">票</span>
          </span>
        </div>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemNames[4]}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
          </div>
          <span :class="$style.ticketVal">
            123<span style="margin-left: 12px">票</span>
          </span>
        </div>
      </div>
      <div :class="$style['ticket-block']">
        <p style="color: #dcbe4a; font-size: 26px;">战队名称</p>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemNames[5]}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
          </div>
          <span :class="$style.ticketVal">
            123<span style="margin-left: 12px">票</span>
          </span>
        </div>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemNames[6]}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
          </div>
          <span :class="$style.ticketVal">
            123<span style="margin-left: 12px">票</span>
          </span>
        </div>
      </div>
      <div :class="$style['ticket-block']">
        <p style="color: #dcbe4a; font-size: 26px;">战队名称</p>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemNames[7]}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
          </div>
          <span :class="$style.ticketVal">
            123<span style="margin-left: 12px">票</span>
          </span>
        </div>
        <div :class="$style['ticket-item']">
          <p style="padding-bottom: 16px">{{itemNames[8]}}</p>
          <div :class="$style.progressWrapper">
            <div data-type='progressbar' style="width:20%">
            </div>
          </div>
          <span :class="$style.ticketVal">
            123<span style="margin-left: 12px">票</span>
          </span>
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
  padding: 24px 32px;
  text-align: left;
  margin-bottom: 14px;
}
.ticket-item {
  position: relative;
  padding-right: 186px;
  margin-top: 28px;
}

.progressWrapper {
  & [data-type='progressbar'] {
    height: 6px;
    background-color: #dcbe4a;
    }
}
.ticketVal {
  position: absolute;
  background-color: #736429;
  padding: 8px 24px;
  bottom: 0;
  right: 32px;
  border-radius: 24px;
}
</style>
