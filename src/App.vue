<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
import io from 'socket.io-client';
export default {
  name: 'app',

  created() {
    const socket = io('http://192.168.0.2:8009');
    socket.on('connect', function() {
      console.log('this is connect')
    })
    socket.on('screen', function(data) {
      console.log('this is screen', data)
    })
    socket.on('disconnect', function() {
      console.log('this is disconnect')
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
