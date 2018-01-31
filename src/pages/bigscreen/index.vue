<template>
<div id="big-screen-wrapper" style="height:1152px; width:640px; overflow: hidden">
  <router-view/>
</div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'app',
  created(){
    const socket = io(this.$SocketHost);
    const that = this
    socket.on('connect', function(val) {
      socket.emit('bigCustomSocket', {
        customId: 'bigCustomSocket'
      });
    })
    // 切换大屏页面
    socket.on('changeBigPage', function(data) {
      that.$router.push({name: data.routeName})
    })
  }
}
</script>
