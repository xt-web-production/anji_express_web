<template>
  <div class="bigScreen" :style="'background-image: url('+ itemImg +')'">
    <h1>大屏幕</h1>
  </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
import io from 'socket.io-client';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    const socket = io(this.$Host);
    socket.on('gift', function(data) {
      console.log('this is gift', data)
    })
    socket.on('text', function(data) {
      console.log('this is text', data)
    })
    //定时器获取点赞数
    this.queryPraise()
  },
  computed: {
  ...mapState(['itemType']),
  itemImg(){
    return require(`./imgs/${this.itemType.itemType}.jpg`)
  }
},
  methods: {
  handleChangeScreen(id) {
    axios.post(`${this.$Host}/changeScreen`, {
        id
      })
  },
  //定时器获取点赞数
  queryPraise(itemtype) {
    const that = this
    this.intervalQueryPraise = setInterval(function(){
      axios.post(`${that.$Host}/queryPraise`, {
          itemtype:that.itemType.itemType
        })
    }, 3000);
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bigScreen {
    height: 1500px;
    width: 833px;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
  }
</style>
