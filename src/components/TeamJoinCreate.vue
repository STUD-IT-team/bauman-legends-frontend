<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

.root-team
  .header
      font-large()
      font-bold()
      margin 10px 20px
      color colorBg
  .buttons
    padding 0
    margin 0 20px
    display grid
    grid-template-columns 1fr 1fr
    grid-auto-rows: 1fr;
    column-gap 5px
    row-gap 5px
    button
      button()
      border-radius 8px
      background colorBg
      color colorText1      
      width 100%
      height 100%
</style>

<template>
  <div class="root-team">
    <div class="header">МОЯ КОМАНДА</div>
      <div class="buttons">
        <button>Вступить в команду</button>
        <button>Создать команду</button>
      </div>
    </div>
</template>