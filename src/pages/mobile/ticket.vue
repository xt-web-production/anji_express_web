<template>
  <div class="control">
    <h1>开始投票</h1>
    <button @click='handleCLickTick(1)'>节目1</button>
    <button @click='handleCLickTick(2)'>节目2</button>
    <button @click='handleCLickTick(3)'>节目3</button>
    <button @click='handleCLickTick(4)'>节目4</button>
    <button @click='handleCLickTick(5)'>节目5</button>
    <button @click='handleCLickTick(6)'>节目6</button>
    <button @click='handleCLickTick(7)'>节目7</button>
    <button @click='handleCLickTick(8)'>节目8</button>
  </div>
</template>

<script>
import {axiosPost} from '@/lib/ajax.js';
import {mapState} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['userInfo']),
    wcUser(){
      return this.userInfo.userInfo
    }
  },
  methods: {
    handleCLickTick(val){
      axiosPost(`${this.$Host}/isAllowMobileSendTicket`, Object.assign({itemType: val}, this.wcUser)).then(res=> {
        const count = res.data
        console.log(count);
        if (count) {
          throw res
        } else {
          axiosPost(`${this.$Host}/mobileSendTicket`, Object.assign({itemType: val}, this.wcUser)).then(res=> {
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
<style lang='less' scoped>
@import "../../style/mystyle.less";
</style>
