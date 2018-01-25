<template>
  <p>clear cookies</p>
</template>

<script>
import storagejs from '@/lib/storagejs'
export default {
  created(){
    storagejs.remove('anjiUserInfo')
    storagejs.remove('isTicket')
    for (var i = 1; i < 9; i++) {
      storagejs.remove(`gift${i}`)
    }
  }
}
</script>
