<template>
  <div :class="$style.control" style="background-position: center; background-image: url(http://qiniu.xingkun.top/bg.jpg);">
    <div :class="$style['logo-wrapper']">
      <img src="http://qiniu.xingkun.top/logo.png" alt="">
    </div>
    <div :class="$style['burron-wrapper']">
      <p :class='$style.button' class='button animated bounceInUp' @click="handleClickEnterShow" v-if='this.wcUser.img'>登录到直播间</p>
    </div>
  </div>
</template>

<script>
import {axiosPost} from '@/lib/ajax.js';
import {mapState} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState(['userInfo']),
    wcUser(){
      return this.userInfo.userInfo
    }
  },
  methods: {
    handleClickEnterShow(){
      axiosPost(`${this.$Host}/enterShow`, this.wcUser).then((res)=> {
         this.$router.push('mobile')
      }).catch(()=>{
        this.$MessageBox('提示:', '表演还没开始,请稍等！');
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' module>
@import "../../style/mystyle.less";
  .control {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .logo-wrapper {
      height: 28px;
      margin-bottom: 12px;
      text-align: left;
      position: absolute;
      top: 24px;
      left: 18px;
      & img {
          height: 100%;
      }
  }
  .burron-wrapper {
    position: absolute;
        bottom: 48px;
        left: 0;
        right: 0;
        text-align: center;
  }
  .button {
    padding: 6px 24px;
    color: white;
    cursor: pointer;
    background-color: @primary-color;
    &:hover {
      background-color: darken(@primary-color, 20%);
    }
  }
</style>
