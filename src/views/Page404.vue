<style lang="stylus" scoped>
@require '../styles/constants.styl'
@require '../styles/fonts.styl'

.root-404
  width 100%
  padding 20px
  .form
    margin 20px auto
    max-width 600px
    background-color colorBg
    border-radius borderRadiusM
    padding 20px
    padding-top 10px
    text-align center
    color colorText1
    .title
      font-large()
      margin-bottom 10px
    .info
      font-medium()
      margin-bottom 15px
</style>

<template>
  <div class="root-404">
    <div class="form">
      <div class="title">404 Страница не найдена</div>
      <div class="info">Запрошенной страницы не существует</div>
      <FormWithErrors
        ref="form"
        :fields="[]"
        submitText="На главную"
        @success="$router.push('/')"
      ></FormWithErrors>
    </div>
  </div>
</template>

<script>
import FormWithErrors from "../components/FormWithErrors.vue";
export default {
  components: {FormWithErrors}
}
</script>

