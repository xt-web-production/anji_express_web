<template>
  <div class="control">
    <h1>开始投票</h1>
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import "../../style/mystyle.less";
</style>
