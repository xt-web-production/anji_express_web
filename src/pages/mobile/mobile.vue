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
        <span style="padding-left: 6px; color: white">{{itemNames[userInfo.itemType - 1]}}</span>
      </div>
    </div>
    <button @click="sendGift(1)">赠送礼物1</button>
    <button @click="sendGift(2)">赠送礼物2</button>
    <button @click="sendGift(3)">赠送礼物3</button>

    <input placeholder="请输入内容" v-model='msg'>
    <button @click='submitText(msg)'>发送祝福语</button>

    <button @click='handleClickTicket'>开始投票</button>
    <button @click='handleClickPraise'>点赞</button>
  </div>
</template>

<script>
import {axiosPost} from '@/lib/ajax.js';
import {mapState} from 'vuex';
export default {
  name: 'mobile',
  data () {
    return {
      itemNames: ['节目1', '节目2', '节目3', '节目4', '节目5', '节目6', '节目7', '节目8'],
      name: '',
      img: '',
      msg: ''
    }
  },
  computed: {
  ...mapState(['userInfo']),
  wcUser(){
    return this.userInfo.userInfo
  }
  },
  methods: {
    /**
    发送礼物
    **/
    sendGift(gift){
      axiosPost(`${this.$Host}/sendGift`, Object.assign({itemtype: this.userInfo.itemType, gift}, this.wcUser))
    },
    /**
    发送祝福语
    **/
    submitText(text){
      axiosPost(`${this.$Host}/addText`, Object.assign({itemtype: this.userInfo.itemType, text}, this.wcUser))
    },
    /**
    点赞
    **/
    handleClickPraise(){
      axiosPost(`${this.$Host}/addPraise`, {itemtype: this.userInfo.itemType})
    },
    /**
    开始投票
    **/
    handleClickTicket(){
      axiosPost(`${this.$Host}/searchIsTicket`).then(res=> {
        if (res.data.allowTicket) {
          this.$router.push('ticket')
          return
        }
        throw res
      }).catch(res=>{
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
}
.logo-wrapper {
  height: 32px;
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
  background-color: fade(@primary-color, 20%);
  padding: 4px 0;
  color: @primary-color;
  font-weight: bold;
  border-radius: 12px;
}
</style>
