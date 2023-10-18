<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'


.root
  position relative
  &::after
    content 'Отпустите, чтобы загрузить фото'
    position absolute
    inset 0
    display flex
    align-items center
    justify-content center
    font-medium()
    background colorBgDark
    color colorText1
    opacity 0
    transition opacity 0.2s ease
    z-index 999
    cursor pointer
  &.in-drag::after
    opacity 1
  &:hover::after
    content 'Нажмите, чтобы загрузить фото'
    opacity .9
</style>

<template>
  <div class="root" :class="{'in-drag': isInDrag}"
    @dragenter="isInDrag = true"
    @dragleave="isInDrag = false"
    @dragover.prevent="isInDrag = true"
    @drop.prevent="handleDrop"
    @click="handleClick"
  >
    <div></div>
    <slot></slot>
  </div>
</template>

<script>
import {getImageAsDataURL, getLoadedImageAsDataURL} from "@korolion/get-image-as-dataurl/getImageAsDataURL";


export default {
  emits: ['load'],

  props: {
    cropSize: {
      type: Number,
      required: true,
    },
    compressSize: {
      type: Number,
      required: true,
    },
    maxAllowedSize: {
      type: Number,
      default: Infinity,
    }
  },

  data() {
    return {
      isInDrag: false,
    }
  },

  methods: {
    async handleDrop(event) {
      this.isInDrag = false;
      this.$emit('load', await getLoadedImageAsDataURL(event.dataTransfer, this.cropSize, this.compressSize, this.maxAllowedSize));
    },
    async handleClick() {
      this.$emit('load', await getImageAsDataURL(this.cropSize, this.compressSize, undefined, this.maxAllowedSize));
    }
  }
};
</script>
