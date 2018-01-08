<template>
  <div :class="$style['ticket-wrapper']">
    <div :class="$style['logo-wrapper']">
      <img :src="require('../../assets/logo.png')" alt="">
    </div>
    <p style="padding: 24px 0">请点击下面图标</p>
    <p style="padding-bottom: 24px; font-size:28px;color:#ffe68c;font-weight:bold">为喜爱的节目投票吧</p>
    <div :class="$style['ticket-send-wrapper']">
      <div :class="$style['select-ticket']">
        <div data-type="ticket-item" v-for='item in 4' @click='handleChangeTicket(item)'>
          <div data-type="star">
            <svg t="1515380343123" style="opacity: 0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1858"><path d="M507.904 327.168C394.24 64 71.168 125.44 69.12 430.592c-1.024 167.424 154.112 230.4 257.024 297.472 99.84 65.024 171.52 154.112 182.272 191.488 9.728-36.864 89.088-128.512 181.76-193.536C791.552 654.848 948.224 596.48 947.2 428.544 945.152 122.88 616.448 74.752 507.904 327.168z" p-id="1859" data-spm-anchor-id="a313x.7781069.0.i0"></path></svg>
            <svg t="1515380343123" data-type="svg-star" class="icon" :style="currentSelectId == item ? 'fill: #ff6761' : 'fill: #ffe68c'" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1858"><path d="M507.904 327.168C394.24 64 71.168 125.44 69.12 430.592c-1.024 167.424 154.112 230.4 257.024 297.472 99.84 65.024 171.52 154.112 182.272 191.488 9.728-36.864 89.088-128.512 181.76-193.536C791.552 654.848 948.224 596.48 947.2 428.544 945.152 122.88 616.448 74.752 507.904 327.168z" p-id="1859" data-spm-anchor-id="a313x.7781069.0.i0"></path></svg>
          </div>
          <p style="font-size: 12px; padding: 6px 0">{{itemNames[item]}}</p>
        </div>
      </div>
      <div :class="$style['select-ticket']">
        <div data-type="ticket-item" v-for='item in 4' @click='currentSelectId = item + 4'>
          <div data-type="star">
            <svg t="1515380343123" style="opacity: 0" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1858"><path d="M507.904 327.168C394.24 64 71.168 125.44 69.12 430.592c-1.024 167.424 154.112 230.4 257.024 297.472 99.84 65.024 171.52 154.112 182.272 191.488 9.728-36.864 89.088-128.512 181.76-193.536C791.552 654.848 948.224 596.48 947.2 428.544 945.152 122.88 616.448 74.752 507.904 327.168z" p-id="1859" data-spm-anchor-id="a313x.7781069.0.i0"></path></svg>
            <svg t="1515380343123" data-type="svg-star" class="icon" :style="currentSelectId == item + 4 ? 'fill: #ff6761' : 'fill: #ffe68c'" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1858"><path d="M507.904 327.168C394.24 64 71.168 125.44 69.12 430.592c-1.024 167.424 154.112 230.4 257.024 297.472 99.84 65.024 171.52 154.112 182.272 191.488 9.728-36.864 89.088-128.512 181.76-193.536C791.552 654.848 948.224 596.48 947.2 428.544 945.152 122.88 616.448 74.752 507.904 327.168z" p-id="1859" data-spm-anchor-id="a313x.7781069.0.i0"></path></svg>
          </div>
          <p style="font-size: 12px; padding: 6px 0">{{itemNames[item + 4]}}</p>
        </div>
      </div>

      <div :class="$style['send-buttons']" class='send-buttons'>
        <div data-type='send-button-item' style="padding-right:6px" @click='handleCLickTick'>
          <p>确定</p>
        </div>
        <div data-type='send-button-item' style="padding-right:6px" @click="$router.push('/')">
          <p>返回直播间</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {axiosPost} from '@/lib/ajax.js';
import {mapState} from 'vuex';
import {itemNames} from '@/lib/factory';
export default {
  name: 'ticket',
  data () {
    return {
      itemNames,
      currentSelectId : ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    wcUser(){
      return this.userInfo.userInfo
    }
  },
  methods: {
    handleChangeTicket(val){
      this.currentSelectId = val
      console.log(val);
    },
    handleCLickTick(){
      if (!this.currentSelectId) return
      axiosPost(`${this.$Host}/isAllowMobileSendTicket`, Object.assign({itemType: this.currentSelectId}, this.wcUser)).then(res=> {
        const count = res.data
        console.log(count);
        if (count) {
          throw res
        } else {
          axiosPost(`${this.$Host}/mobileSendTicket`, Object.assign({itemType: this.currentSelectId}, this.wcUser)).then(res=> {
            this.$MessageBox('提示', '投票成功！')
          })
        }
      }).catch(res=>{
        this.$MessageBox('提示', '你已经投过票了！')
      })
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
  padding: 24px 8px;
  border-radius: 10px;
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
    margin-bottom: 18px;
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
</style>
