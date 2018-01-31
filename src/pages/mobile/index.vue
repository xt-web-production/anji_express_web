<template>
<div class='mobile-contenter'>
  <router-view/>
</div>
</template>

<script>
import axios from 'axios';
import {
  mapActions
} from 'vuex'
import {
  getParam
} from '@/lib/factory'
import storagejs from '@/lib/storagejs'
// import io from 'socket.io-client';
export default {
  name: 'mobile-contenter',
  created() {
    const that = this
    //初始化发送礼物的数量
    this.SetGiftNumStorage()
    // const socket = io(this.$SocketHost);
    // socket.on('screen', function(val) {
    //   that.update_item_type(val.id)
    // })
    this.getWchartUserInfo()
  },
  methods: {
    //...mapActions(['update_user_info', 'update_item_type']),
    ...mapActions(['update_user_info']),
    //获取微信用户信息（头像、图片）
    getWchartUserInfo() {

      const storeuserInfo = storagejs.get('userInfo')
      if (storeuserInfo) {
        this.update_user_info(storeuserInfo)
        return
      }

      const params = {
        code: getParam(window.location.href, 'code'),
        appid: 'wxf223a769adb934e6', //星坤 wxbc8a3b506536d138 // 罗轩 wxf223a769adb934e6
        secret: 'cad140eba92f29ee5fccf3681a88360b', // 星坤 9921201d63a01a6821e5fbb89106f33f //罗轩 cad140eba92f29ee5fccf3681a88360b
        grant_type: 'authorization_code'
      }
      axios.get(`${this.$wcApi}/sns/oauth2/access_token`, {
        params
      }).then(res => {
        const _data = res.data
        if (JSON.stringify(_data) != '{}') {
          axios.get(`${this.$wcApi}/sns/userinfo`, {
            params: {
              'access_token': _data.access_token,
              'openid': _data.openid,
              'lang': 'zh_CN'
            }
          }).then(result => {
            const userInfo = result.data
            if (JSON.stringify(userInfo) != '{}') {
              const _userInfo = {
                name: userInfo.nickname,
                img: userInfo.headimgurl,
                openId: userInfo.openid
              }
              this.update_user_info(_userInfo)
              storagejs.set('userInfo', _userInfo)
            }
          })
        }
      })
    },
    SetGiftNumStorage() {
      for (var i = 1; i < 9; i++) {
        const _tempStore = storagejs.get(`gift${i}`)
        if (_tempStore == undefined) {
          storagejs.set(`gift${i}`, {
            '1': 1,
            '2': 1,
            '3': 1
          })
        }
      }
    }
  }
}
</script>
