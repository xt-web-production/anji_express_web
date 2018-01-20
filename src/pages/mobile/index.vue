<template>
<div class='mobile-contenter'>
  <router-view/>
</div>
</template>

<script>
import axios from 'axios';
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
    this.getWchartUserInfo()
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
    getWchartUserInfo(){
      const params = {
        code: getParam(window.location.href, 'code'),
        appid: 'wx4dcaf4dca875e624',
        secret: '07f5aa7ed3a81b824eeb9ad303a277a4',
        grant_type: 'authorization_code'
      }
      axios.get(`${this.$wcApi}/sns/oauth2/access_token`, {
        params
      }).then(res=>{
        const _data = res.data
        if(JSON.stringify(_data) != '{}') {
          axios.get(`${this.$wcApi}/sns/userinfo`, {
            params: {
              'access_token': _data.access_token,
              'openid': _data.openid,
              'lang': 'zh_CN'
            }
          }).then(result=>{
            const userInfo = result.data
            if(JSON.stringify(userInfo) != '{}'){
              this.update_user_info({
                name: userInfo.nickname,
                img: userInfo.headimgurl,
                openId: userInfo.openid
              })
            }
          })
        }
      })
    }
  }
}
</script>
