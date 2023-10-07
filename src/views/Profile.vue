<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/scrollbars.styl'

.root-profile
  hidden-scrollbar()
  width 100%
  height 100%
  
  .navbar
    width 100%
    margin-bottom 20px
    background-color colorBg
    padding 10px
    font-large()
    color colorText1
    display flex
    justify-content space-between
  .header
      font-large()
      font-bold()
      margin 10px 20px
      color colorBg
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
    .data-row
      display flex
      margin 10px 0
      max-width 100%
      font-small()
      .field
        color colorBgLightExtra
        max-width 40%
        width max-content
        word-wrap break-word
      .data
        flex 1
        margin-left 10px
        color colorText1
        word-wrap break-word
      .edit
        button-inline()
        width auto
        padding 0
        background colorBg
        font-small-extra()
        color colorBgLightExtra
    .change-password
      button-inline()
      font-small()
      margin 0
      width auto
      color colorEmp1
      background colorBg
      &:hover
        color colorText1
    

</style>

<template>
  <div class="root-profile">
    <div>
      <table class="navbar">
      <th>Профиль/Главная</th>
      <th>00:04:20</th>
      </table>
    </div>

    <TeamSignedIn></TeamSignedIn>
    <TeamJoinCreate></TeamJoinCreate>
    
    <div class="header">ПРОФИЛЬ</div>
    <div class="box">
      <div class="s1">ФАМИЛИЯ ИМЯ ОТЧЕСТВО</div>
      <div class="data-row">
        <div class="field">Группа:</div>
        <div class="data">ИУ4-72б</div>
        <button class="edit">Изменить</button>
      </div>
      <div class="data-row">
        <div class="field">Email:</div>
        <div class="data">my_mail@mail.com</div>
        <button class="edit">Изменить</button>
      </div>
      <div class="data-row">
        <div class="field">Telegram:</div>
        <div class="data">@OneVVTG</div>
        <button class="edit">Изменить</button>
      </div>
      <div class="data-row">
        <div class="field">Вконтакте:</div>
        <div class="data">vk.com/onevvvk</div>
        <button class="edit">Изменить</button>
      </div>
      <div class="data-row">
        <div class="field">Номер телефона:</div>
        <div class="data">8-800-555-35-35</div>
        <button class="edit">Изменить</button>
      </div>

      <button class="change-password">Сменить пароль</button>

    </div>
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


<script>
  import TeamSignedIn from "../components/TeamSignedIn.vue";
  import TeamJoinCreate from "../components/TeamJoinCreate.vue";
  export default{
    components: {TeamSignedIn, TeamJoinCreate},
  }

</script>