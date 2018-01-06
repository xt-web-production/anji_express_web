<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';
import faker from 'faker';
import {mapActions} from 'vuex'
import {getParam} from '@/lib/factory'
export default {
  name: 'app',
  created() {
    axios.post(`${this.$Host}/queryCurrentItemType`, getParam(window.location.href, 'code')).then(res=>{
      console.log(res);
    })
    //初始化 当前节目
    this.initGetCurrentItemType()
    const socket = io(this.$Host);
    const that = this
    socket.on('screen', function(val) {
      that.update_item_type(val.id)
    })
    this.getWchartUserInfo()
  },
  methods: {
    ...mapActions(['update_item_type', 'update_user_info']),
    //获取微信用户信息（头像、图片）
    getWchartUserInfo(){
      this.update_user_info({
        name: faker.name.findName(),
        img: faker.image.imageUrl(),
        openId: '001001000111'
      })
    },
    initGetCurrentItemType(){
      axios.post(`${this.$Host}/queryCurrentItemType`).then(res=> {
        const currentItemType = res.data.data.currentItemType
        this.update_item_type(currentItemType)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 100%;
}
</style>
