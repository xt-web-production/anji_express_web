<template>
  <div ref='text-item' class="text-itm" :style="'position: absolute;right: 0;transition-property: transform; transition-timing-function: liner;white-space: nowrap;color: white;display: inline-block;font-size: 24px;line-height: 24px;border-radius: 24px;padding: 12px 36px 12px 18px;background-color: rgba(0, 0, 0,.5); transform: translateX(' + translateX +');transition-duration:' + duration + 's;'">
    <svg class='ui-icon' style='vertical-align: middle; max-height: 100%; width: auto; margin-right: 10px;height: 24px;' version="1.1" x="0px" y="0px" width="16" height="16" viewBox="0 0 1072 1024">
      <use fill="white" xlink:href="#msg-icon"></use>
    </svg><span style="padding-right: 14px">{{name}}</span><span style="color: #dcbe4a">{{text}}</span>
  </div>
</template>

<script>
export default {
  data(){
    return {
      translateX:'100%',
      duration: [7,8,9,7][parseInt(Math.random() * 3 )]
    }
  },
  props: {
    name: {
      default: 'name',
      type: String
    },
    text: {
      default: 'text',
      type: String
    },
    id: {
      default: 0,
      type: Number
    }
  },
  mounted(){
      this.item_translateX()
      this.item_destroy()
  },
  methods: {
    item_translateX(){
      var offsetWidth = this.$refs['text-item'].offsetWidth
      setTimeout(()=>{
        this.translateX = (offsetWidth + 883) * -1 + 'px'
      }, 500)
    },
    item_destroy(){
      const time = this.duration
      setTimeout(()=>{
        this.$destroy()
        this.$emit('onSlideEnd', this.id)
      }, time * 500)
    }
  },
  beforeDestroy(){
    const selfDom = this.$refs['text-item']
    const parent = document.getElementById('text-slider');
    parent.removeChild(selfDom);
  }
}
</script>
