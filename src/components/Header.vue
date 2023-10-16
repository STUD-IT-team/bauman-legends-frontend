<template>
  <div class="navbar">
    <span> Профиль / главная </span>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped lang="stylus">
.navbar
  width 100%
  background-color colorBg
  padding 10px
  font-large()
  color colorText1
  display flex
  justify-content space-between
</style>