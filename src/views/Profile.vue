<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/footer.styl'

.root-profile
  width 100%
  height 100%
  .navbar
    width 100%
    margin 0
    background-color colorBg
    padding 10px
    font-large()
    color colorText1
    align-content: space-between
    text-align left
  .box
    background-color colorBg
    border-radius borderRadiusM
    padding-top 10px
    padding-left 20px
    padding-right 20px
    padding-bottom 20px
    margin 20px 20px
    text-align left
    align-content left
    font-medium()
    font-bold()
    color colorText1
    .s1
      font-large()
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
    .task-button
      button()
      width auto
      margin-top 10px
      margin-left 0px
      margin-right 10px
      padding 5px 10px
      display inline-block
    .dropdown
      width auto
      background colorButton
      display inline-block
      padding 2px 10px
      margin-top 5px
      margin-left 10px
      border solid 0px
      border-radius 1000px

</style>

<template>
  <div class="root-profile">
    <div>
    <table class="navbar">
    <th>Профиль/Главная</th>
    <th>00:04:20</th>
    </table>
    </div>
    <div class="box">
      <p class="s1">Умные мИУсли</p>
      <p class="s2">#0002</p><br>
      <p class="s3">15 баллов, 3 место</p>
      <br><br>
      <!-- Это бы в отдельную вьюшку -->
      <p class="s1">Состав команды:</p><br>
      Луцук Ренат
      <p class="s3">Капитан</p>
      <br>
      Мельников Дмитрий
      <br>
      Новиков Тимофей
      <br>
      <br>
      <p class="s1">Задачи</p><br>
      <router-link class="signin-link" :to="{name: 'login'}">
        <button class="task-button">Задача 1</button>
        <button class="task-button">Задача 2</button>
        <button class="task-button">Задача 3</button>
      </router-link>
    </div>
    <img src="../res/images/Gerbs.png" class="logo">
    <!-- <div class="title"> PROFILE PAGE</div>
    <div class="name">Rudy</div>
    <div class="email">r@mail.ru</div>

    <div v-if="cards.length > 5">CARD MORE 5</div>
    <div v-else>NOT ENOUGH</div>

    <div class="flexbox">
      <div v-for="card in cards" class="card">
        <div class="titlr">{{ card.name }}</div>
        <div class="description">{{ card.description }}</div>

      </div>
    </div> -->


  </div>
  <!-- <router-link to="/">TO MAIN</router-link> -->



</template>
