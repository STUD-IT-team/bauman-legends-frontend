<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/buttons.styl'

.root-team
  .header
      font-large()
      font-bold()
      margin 10px 20px
      color colorBg
  .tasks
    padding 0
    margin 0 20px
    display grid
    grid-template-columns 1fr 1fr
    grid-auto-rows: 1fr;
    column-gap 5px
    row-gap 5px
    .task-button
      button()
      border-radius 8px
      background colorBg
      color colorText1      
      width 100%
      height 100%
  .box
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    margin 10px 20px
    text-align left
    align-content left
    font-medium()
    color colorText1
    .s1
      font-large()
      font-bold()
      margin auto
      display inline-block
    .s2
      font-medium()
      color colorText3
      margin 0
      padding 0 10px
      display inline-block
    .s3
      font-small()
      color colorText3
      margin 0
      padding 0
      display inline-block
    .name-row
      display flex
      margin-top 5px
      .name
        flex 1
        margin auto
      .dropdown
        width auto
        background colorBg
        text-small()
        color colorText1
        display inline-block
        padding 2px 10px
        margin 0
        border colorBgLightExtra solid 1px
        border-radius 8px
</style>

<template>
  <div class="root-team">
    <div class="header">ДОСТУПНЫЕ ЗАДАНИЯ</div>
      <div class="tasks">
        <button class="task-button">Онлайн-задание</button>
        <button class="task-button">Фото-задание</button>
        <button class="task-button">Путешествие в НОЦ</button>
        <button class="task-button">Задание с актёром</button>
      </div>
      <div class="header">МОЯ КОМАНДА</div>
      <div class="box">
        <p class="s1">Умные мИУсли</p>
        <p class="s2">#0002</p><br>
        <p class="s3">15 баллов, 3 место</p>
        <br><br>
        <!-- Это бы в отдельную вьюшку -->
        <p class="s1">Состав команды:</p><br>
        <div class="name-row">
        <div class="name">Луцук Ренат</div>
        <select class=dropdown>
          <option selected hidden>Роль</option>
          <option>Капитан</option>
          <option>Зам</option>
          <option>Участник</option>
        </select>
        </div>
        <div class="name-row">
        <div class="name">Мельников Дмитрий</div>
        <select class=dropdown>
          <option selected hidden>Роль</option>
          <option>Капитан</option>
          <option>Зам</option>
          <option>Участник</option>
        </select>
        </div>
        <div class="name-row">
        <div class="name">Новиков Тимофей</div>
        <select class=dropdown>
          <option selected hidden>Роль</option>
          <option>Капитан</option>
          <option>Зам</option>
          <option>Участник</option>
        </select>
        </div>
      </div>
    </div>
</template>