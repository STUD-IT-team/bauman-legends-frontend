<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/utils.styl'


button-edit()
  content "Изменить"
  button()
  width auto
  margin 0
  padding 0
  background colorBg
  font-small-extra()
  color colorBgLightExtra


.root-task
  hidden-scrollbar()
  width 100%
  height 100%

  .navbar
    width 100%
    background-color colorBg
    padding 10px
    font-large()
    color colorText1
    display flex
    justify-content space-between

  .main-content
    padding 20px
    max-width 600px
    margin 0 auto
    .header
      font-large()
      font-bold()
      margin 20px 20px 10px 20px
      color colorBg

    .box
      background-color colorBg
      border-radius borderRadiusM
      padding 20px
      margin 10px 0
      text-align left
      align-content left
      font-medium()
      color colorText1
      .task-header
        font-large()
        font-bold()
        display flex
        .title
          flex 1
          color colorText1
        .pts
          color colorEmp1
      .description
        font-medium()
      .info
        font-small()
        color colorBgLightExtra
      .hint-button
        button()
        padding 10px 20px
        background colorEmp1
        &:hover
          background colorError
          color colorText1
      .answer-form
        position relative
        .title
          font-large()
        .task-input
          width 100%
          background-color colorBg
          border colorText1 solid 
          border-radius 25px
          padding 10px
          margin 10px auto
          color colorBgLightExtra
        .placeholder
          position absolute
          top 22px
          left 10px
          text-align left
          padding-left 10px
          font-medium()
          opacity .5
          transition all 0.2s ease
          pointer-events none
      .file-form
        margin 10px auto
        width auto
        display flex
        input[type=file]
          flex 1
          font-medium()
          &::file-selector-button
            button()
            display inline
            margin-right 10px
        .file-submit
          button()
          right 0
          padding 10px 20px
      .QR-button
        button()
        margin 10px auto
        padding 10px 20px

</style>

<template>
  <div class="root-task">
    <header class="navbar">
      <span>Профиль / Главная</span>
<!--      <span>00:04:20</span>-->
    </header>

    <div class="main-content">
      <div class="box">
        <div class="task-header">
          <div class="title">НАЗВАНИЕ ТАСКИ</div>
          <div class="pts">15 баллов</div>
        </div>
        <div class="info">Баллы убывают со временем и при использовании подсказки</div>
        <br>
        <div class="description">Описание таски</div>        
        <div class="answer-form">
          <!-- <div class="title">ААА</div> -->
          <input id="answer" class="task-input">
          <div class="placeholder">Поле ввода ответа</div>
        </div>
        <form class="file-form">
          <input id="file-upload" type="file" accept=".jpg, .jpeg, .png" class="file-input" value="Выбрать файл">
          <input id="file-submit" type="submit" class="file-submit" value="Отправить">
        </form>
        <button class="QR-button" @click="openQR()">Сканировать QR-код</button>
        <button class="hint-button" @click="showHint()">Подсказка</button>
      </div>
    </div>
  </div>
</template>


<script>

export default {

  data() {
    return {
      hint: "Здесь будет текст подсказки",
    }
  },

  methods: {
    showHint() {
      this.$modals.alert(this.hint);
    },
    openQR() {
      this.$modals.alert("Здесь будет сканер QR");
    },
  }
}
</script>
