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
export default {
  name: 'mobile-contenter',
  created() {
    const anjiUserInfo = storagejs.get('anjiUserInfo')
    if (anjiUserInfo) {
      this.update_user_info(anjiUserInfo)
      return
    }
    const that = this
    axios.post(`${this.$Host}/getToken`, {code: getParam(window.location.href, 'code')}).then(res=>{
      const userInfo = JSON.parse(res.data.data)
      that.getWchartUserInfo(userInfo)
    }).catch(err=>{
      console.log(err);
    })
  },
  methods: {
    ...mapActions(['update_user_info']),
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
