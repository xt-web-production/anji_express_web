<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';
import {mapActions} from 'vuex'
export default {
  name: 'app',
  created() {
    //初始化 当前节目
    this.initGetCurrentItemType()
    const socket = io(this.$Host);
    const that = this
    socket.on('screen', function(val) {
      console.log(val);
      that.update_item_type(val.id)
    })
  },
  methods: {
    ...mapActions(['update_item_type']),
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
}
</style>
