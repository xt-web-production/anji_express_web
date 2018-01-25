<template>
  <div :class="$style['ticket-wrapper']">
    <div :class="$style['logo-wrapper']">
      <img src="http://qiniu.xingkun.top/logo.png" alt="">
    </div>
    <p style="padding: 24px 0">请点击下面图标</p>
    <p style="padding-bottom: 24px; font-size:28px;color:#ffe68c;font-weight:bold">为喜爱的节目投票吧</p>
    <div :class="$style['ticket-send-wrapper']">
      <p style="margin-bottom: 6px;color: #b69c46">
          <span style="display:inline-block; width: 50%; float:left">战队名称</span>
          <span style="display:inline-block; width: 50%">战队名称</span>
      </p>
      <div :class="$style['select-ticket']">
        <div data-type="ticket-item" v-for='item in 4' @click='handleChangeTicket(item)'>
          <div data-type="star">
            <svg t="1515380343123" style="opacity: 0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1858"><path d="M507.904 327.168C394.24 64 71.168 125.44 69.12 430.592c-1.024 167.424 154.112 230.4 257.024 297.472 99.84 65.024 171.52 154.112 182.272 191.488 9.728-36.864 89.088-128.512 181.76-193.536C791.552 654.848 948.224 596.48 947.2 428.544 945.152 122.88 616.448 74.752 507.904 327.168z" p-id="1859" data-spm-anchor-id="a313x.7781069.0.i0"></path></svg>
            <svg t="1515380343123" data-type="svg-star" class="icon" :style="currentSelectId == item ? 'fill: #ff6761' : 'fill: #ffe68c'" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1858"><path d="M507.904 327.168C394.24 64 71.168 125.44 69.12 430.592c-1.024 167.424 154.112 230.4 257.024 297.472 99.84 65.024 171.52 154.112 182.272 191.488 9.728-36.864 89.088-128.512 181.76-193.536C791.552 654.848 948.224 596.48 947.2 428.544 945.152 122.88 616.448 74.752 507.904 327.168z" p-id="1859" data-spm-anchor-id="a313x.7781069.0.i0"></path></svg>
          </div>
          <p style="font-size: 12px; padding: 6px 0" v-html='itemNames[item]'></p>
        </div>
      </div>

      <p style="margin-bottom: 6px;color: #b69c46">
          <span style="display:inline-block; width: 50%; float:left">战队名称</span>
          <span style="display:inline-block; width: 50%">战队名称</span>
      </p>
      <div :class="$style['select-ticket']">
        <div data-type="ticket-item" v-for='item in 4' @click='currentSelectId = item + 4'>
          <div data-type="star">
            <svg t="1515380343123" style="opacity: 0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1858"><path d="M507.904 327.168C394.24 64 71.168 125.44 69.12 430.592c-1.024 167.424 154.112 230.4 257.024 297.472 99.84 65.024 171.52 154.112 182.272 191.488 9.728-36.864 89.088-128.512 181.76-193.536C791.552 654.848 948.224 596.48 947.2 428.544 945.152 122.88 616.448 74.752 507.904 327.168z" p-id="1859" data-spm-anchor-id="a313x.7781069.0.i0"></path></svg>
            <svg t="1515380343123" data-type="svg-star" class="icon" :style="currentSelectId == item + 4 ? 'fill: #ff6761' : 'fill: #ffe68c'" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1858"><path d="M507.904 327.168C394.24 64 71.168 125.44 69.12 430.592c-1.024 167.424 154.112 230.4 257.024 297.472 99.84 65.024 171.52 154.112 182.272 191.488 9.728-36.864 89.088-128.512 181.76-193.536C791.552 654.848 948.224 596.48 947.2 428.544 945.152 122.88 616.448 74.752 507.904 327.168z" p-id="1859" data-spm-anchor-id="a313x.7781069.0.i0"></path></svg>
          </div>
          <p style="font-size: 12px; padding: 6px 0" v-html='itemNames[item + 4]'></p>
        </div>
      </div>
    </div>
    <div :class="$style['send-buttons']" class='send-buttons'>
      <div data-type='send-button-item' style="float: left;" @click='handleCLickTick'>
        <p>确定</p>
      </div>
      <div data-type='send-button-item' style="float: right;" @click="currentSelectId = ''">
        <p>取消</p>
      </div>
    </div>
  </div>
</template>

<script>
import storagejs from '@/lib/storagejs'
import {axiosPost} from '@/lib/ajax.js';
import {itemNames} from '@/lib/factory';
export default {
  name: 'ticket',
  data () {
    return {
      itemNames: {
        '1' : '小品<p>《西天取经》</p>',
        '2' : '串烧表演<p>《锦绣中华》</p>',
        '3' : '舞蹈<p>《绿荫风采》</p>',
        '4' : '相声<p>《津味安信》</p>',
        '5' : '小品<p>《有你很精彩》</p>',
        '6' : '歌曲<p>《广西·我美丽的家》</p>',
        '7' : '舞蹈<p>《舞动未来》</p>',
        '8' : '小品<p>《将广告进行到底》</p>'
      },
      currentSelectId : ''
    }
  },
  methods: {
    handleChangeTicket(val){
      this.currentSelectId = val
    },
    handleCLickTick(){
      if (!this.currentSelectId) {
        this.$MessageBox('提示', '请先选择节目再投票')
        return
      }
      const isTicket = storagejs.get('isTicket')
      if (isTicket) {
        this.$MessageBox('提示', '你已经投过票了！')
      } else {
        axiosPost(`${this.$Host}/searchIsTicket`).then(res=> {
          const isallowTicket = res.data.allowTicket
          if (isallowTicket) {
            axiosPost(`${this.$Host}/mobileSendTicket`, Object.assign({itemType: this.currentSelectId})).then(res=> {
              this.$MessageBox('提示', '投票成功！')
              storagejs.set('isTicket', 1)
            })
          } else {
            throw res
          }
        }).catch(()=>{
          this.$MessageBox('提示', '投票通道已经关闭')
        })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' module>
@import "../../style/mystyle.less";
.ticket-wrapper {
  padding: 24px 18px;
  min-height: 100vh;
  color: white;
  background: linear-gradient(#060503, #231001);
}
.logo-wrapper {
  height: 32px;
  margin-bottom: 12px;
  text-align: left;
  & img {
    height: 100%;
  }
}
.ticket-send-wrapper {
  padding: 24px 8px 0px 8px;
  border-radius: 10px;
  margin-bottom: 16px;
  background: linear-gradient(#251f0f, #3b2a0e);
}

.select-ticket {
  &:after {
    content: '';
    display: table;
    clear:both;
  }
  & [data-type="ticket-item"] {
    width: 25%;
    padding: 4px;
    margin-bottom: 6px;
    float: left;
  }
  & [data-type="star"] {
    position: relative;
    border-radius: 4px;
    background: linear-gradient(#534721, #948039);
    & [data-type="svg-star"] {
      position: absolute;
      width: 30px;
      stop-color: 0;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
.send-buttons {
  &:after {
    content: '';
    clear: both;
    display: table;
  }
  & [data-type='send-button-item'] {
    width: 49%;
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
</style>
