<template>
<div :class="$style['mobile-wrapper']">
  <div :class="$style['logo-wrapper']">
    <img :src="require('../../assets/logo.png')" alt="">
  </div>
  <div class="user-wrapper">
    <div :class="$style['user-img']">
      <img :src="wcUser.img" alt="" style="width: 100%;  height: 100%; object-fit: cover">
    </div>
    <p :class="$style['user-name']">{{wcUser.name}}1312</p>
  </div>
  <div class="current-item-type">
    <div :class="$style['current-item']">当前节目:
      <span style="padding-left: 6px; color: white">{{itemNames[userInfo.itemType]}}</span>
    </div>
  </div>
  <div :class="$style['control-wrapper']">
    <div class="option">
      <div :class="$style['option-top']" style="padding: 0 6px 24px 6px;">
        <p style='padding: 14px 0'>礼品赠送区</p>
        <div :class="$style['gift-wrapper']">
          <div data-type="gift-item">
            <div data-type="gift-img">
              <img src="./gift1.jpg" alt="">
            </div>
            <div data-type="gift-button" @click=" currentGift = 1; currentOption = 'gift'">
              赠送
            </div>
          </div>
          <div data-type="gift-item">
            <div data-type="gift-img">
              <img src="./gift2.jpg" alt="">
            </div>
            <div data-type="gift-button" @click=" currentGift = 2; currentOption = 'gift'">
              赠送
            </div>
          </div>
          <div data-type="gift-item">
            <div data-type="gift-img">
              <img src="./gift3.jpg" alt="">
            </div>
            <div data-type="gift-button" @click=" currentGift = 3; currentOption = 'gift'">
              赠送
            </div>
          </div>
        </div>
      </div>
      <div :class="$style['option-bottom']">
        <div style='width: 50%; float: left'>
          <div :class="$style['crile-button']" @click='handleClickPraise'>
            <div data-type="button-item" :style="'background-size: 90%;background-position: 4px 4px;background-repeat: no-repeat;background-image: url(' + require('./finger.png') + ');'">

            </div>
          </div>
        </div>
        <div style='width: 50%; position:relative; float: left; height: 96px'>
          <div :class="$style['crile-button']" @click="currentOption='msg'; msg = ''">
            <div data-type="button-item" :style="'background-size: 50%;background-position:center;background-repeat: no-repeat;background-image: url(' + require('./msg.png') + ');'">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style['send-gift-wrapper']" v-if="currentOption == 'gift'">
      <p style="padding: 12px 0;">赠送礼物</p>
      <img :src="currentGiftImg" alt="" style='height: 180px; margin-bottom:6px'>
      <p style="padding: 12px 0">赠送节目名称：{{itemNames[userInfo.itemType]}}</p>
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
        <textarea data-type='textarea' v-model='msg' placeholder="请在此输入您的祝福" />
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
  <!-- <input placeholder="请输入内容" v-model='msg'>
    <button @click='submitText(msg)'>发送祝福语</button>

    <button @click='handleClickTicket'>开始投票</button> -->
</div>
</template>

<script>
import {
  axiosPost
} from '@/lib/ajax.js';
import {
  mapState
} from 'vuex';
import {
  itemNames
} from '@/lib/factory'
export default {
  name: 'mobile',
  data() {
    return {
      itemNames,
      currentGift: 1, //当前的礼物id， 默认1
      msg: '', //祝福语
      currentOption: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    wcUser() {
      return this.userInfo.userInfo
    },
    currentGiftImg() {
      return require(`./gift${this.currentGift}.png`)
    }
  },
  methods: {
    /**
    发送礼物
    **/
    sendGift() {
      axiosPost(`${this.$Host}/sendGift`, Object.assign({
        itemtype: this.userInfo.itemType,
        gift: this.currentGift
      }, this.wcUser)).then(() => {
        this.$Toast('礼物赠送成功')
        this.currentOption = ''
      })
    },
    /**
    发送祝福语
    **/
    submitText() {
      axiosPost(`${this.$Host}/addText`, Object.assign({
        itemtype: this.userInfo.itemType,
        text: this.msg
      }, this.wcUser)).then(res => {
        this.$Toast('发送成功!')
        this.currentOption = ''
      })
    },
    /**
    点赞
    **/
    handleClickPraise() {
      axiosPost(`${this.$Host}/addPraise`, {
        itemtype: this.userInfo.itemType
      })
    },
    /**
    开始投票
    **/
    handleClickTicket() {
      axiosPost(`${this.$Host}/searchIsTicket`).then(res => {
        if (res.data.allowTicket) {
          this.$router.push('ticket')
          return
        }
        throw res
      }).catch(res => {
        this.$MessageBox('提示:', '投票未开始');
      })
    }
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
    transition: transform .1s ease;
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
