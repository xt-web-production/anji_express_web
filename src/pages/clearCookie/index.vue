<template>
  <p>clear cookies</p>
</template>

<script>
import storagejs from '@/lib/storagejs'
export default {
  created(){
    storagejs.remove('anjiUserInfo')
    storagejs.remove('isTicket')
  }
}
</script>

<style lang="css">
</style>
