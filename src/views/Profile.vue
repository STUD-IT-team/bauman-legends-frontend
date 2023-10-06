<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/footer.styl'

.root-profile
  width 100%
  height 100%
  
  .navbar
    width 100%
    margin-bottom 20px
    background-color colorBg
    padding 10px
    font-large()
    color colorText1
    align-content: space-between
    text-align left
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
    padding-top 10px
    padding-left 20px
    padding-right 20px
    padding-bottom 20px
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
    .data-row
      display flex
      margin 10px 0
      .field
        color colorBgLightExtra
      .data
        flex 1
        margin-left 10px
        color colorText1
      .edit
        button()
        width auto
        margin 0
        padding 0
        background colorBg
        font-small-extra()
        color colorBgLightExtra
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
  <div class="root-profile">
    <img src="../res/images/Gerbs.png" class="logo">
    <div>
    <table class="navbar">
    <th>Профиль/Главная</th>
    <th>00:04:20</th>
    </table>
    </div>
    <div class="header">ДОСТУПНЫЕ ЗАДАНИЯ</div>
    <div class="tasks">
      <router-link style="text-decoration: none" :to="{name: 'login'}">
      <button class="task-button">Онлайн-задание</button>
      </router-link>
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
