<template>
  <div style='position: absolute;
    height: 547px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;'>
    <h1 style='fontsize: 32px;'>清楚缓存</h1>
    <img src="./clearCookie.png" alt="">
  </div>


</template>

<script>
import storagejs from '@/lib/storagejs'
export default {
  created(){
    storagejs.remove('isTicket')
    for (var i = 1; i < 9; i++) {
      storagejs.remove(`gift${i}`)
    }
  }
}
</script>
