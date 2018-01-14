<template>
<div class='mobile-contenter'>
  <router-view/>
</div>
</template>

<script>
import axios from 'axios';
import faker from 'faker';
import {mapActions} from 'vuex'
import {getParam} from '@/lib/factory'
import storagejs from '@/lib/storagejs'
import io from 'socket.io-client';
export default {
  name: 'mobile-contenter',
  created() {
      const that = this
    //初始化 当前节目
    this.initGetCurrentItemType()
    const socket = io(this.$SocketHost);
    socket.on('screen', function(val) {
      that.update_item_type(val.id)
    })

    const anjiUserInfo = storagejs.get('anjiUserInfo')
    if (anjiUserInfo) {
      this.update_user_info(anjiUserInfo)
      return
    }
    axios.post(`${this.$Host}/getToken`, {code: getParam(window.location.href, 'code')}).then(res=>{
      const userInfo = JSON.parse(res.data.data)
      that.getWchartUserInfo(userInfo)
    })
  },
  methods: {
    ...mapActions(['update_user_info', 'update_item_type']),
    initGetCurrentItemType(){
      axios.post(`${this.$Host}/queryCurrentItemType`).then(res=> {
        const currentItemType = res.data.data.currentItemType
        this.update_item_type(currentItemType)
      })
    },
    //获取微信用户信息（头像、图片）
    getWchartUserInfo(item){
      const name = item.nickname
      const headimgurl = item.headimgurl
      const openid = item.openid
      const userInfo = {
        name: item.nickname || faker.name.findName(),
        img: item.headimgurl ? item.headimgurl.replace(/[\\]/g,'') : faker.image.imageUrl(),
        openId: item.openid || `test${Math.random() * 100}`
      }
      storagejs.set('anjiUserInfo', userInfo)
      this.update_user_info(userInfo)
    }
  }
}
</script>
