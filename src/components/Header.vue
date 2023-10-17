<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'

.navbar
  width 100%
  background-color colorBg
  padding 10px
  font-large()
  color colorText1
  display flex
  justify-content space-between
  align-items center
  .info-name
    font-medium()
    color colorText1
  .info-value
    display inline-block
    text-align left
  .info-value.last
    min-width 4em
  @media({mobile})
    font-medium()
    white-space nowrap
    .info-name
      font-small()
      display block
      text-align center
    .info-value
      display block
      text-align center
    .info-value
    .info-name
      &.last
        margin-right 20px
</style>

<template>
  <header class="navbar">
    <slot></slot>
    <span v-if="withPoints" class="points">
      <span class="info-name">Баллов: </span>
      <span class="info-value">
        <vue3autocounter
          :start-amount="0"
          :send-amount="$store.state.team.points"
          :duration="2"
          :decimals='0'
        ></vue3autocounter>
      </span>
    </span>
    <router-link :to="{name: 'task'}" v-if="$store?.state?.task?.isGotten" class="time-left">
      <span class="info-name last">На задачу: </span>
      <span class="info-value last">{{ $store?.state?.task?.timeLeftString }}</span>
    </router-link>
  </header>
</template>

<script>
import vue3autocounter from 'vue3-autocounter';

export default {
  components: {vue3autocounter},

  props: {
    withPoints: Boolean,
  }
};
</script>
