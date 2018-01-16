<template lang="html">
  <div :class='$style.bigScreen' :style="'background-position: center; background-image: url(' + require('./subitem1_bg.jpg') + ');'">

  </div>
</template>

<script>
export default {
}
</script>

<style lang='less' module>
.bigScreen {
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  background: rgba(1, 0, 0, 0.16);
  // /background-image: none !important;
}
.logo-wrapper {
  height: 42px;
  margin-bottom: 12px;
  padding-left: 42px;
  text-align: left;
  position: relative;
}
</style>
