<template>
  <div class="mobile">
    <h1>mobile {{itemNames[userInfo.itemType - 1]}}</h1>
    <button @click="sendGift(1)">赠送礼物1</button>
    <button @click="sendGift(2)">赠送礼物2</button>
    <button @click="sendGift(3)">赠送礼物3</button>

    <input placeholder="请输入内容" v-model='msg'>
    <button @click='submitText(msg)'>发送祝福语</button>


    <button @click='handleClickPraise'>点赞</button>
  </div>
</template>

<script>
import {axiosPost} from '@/lib/ajax.js';
import faker from 'faker';
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
