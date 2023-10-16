<style scoped lang="stylus">

@require '../styles/buttons.styl'

.header
  font-large()
  font-bold()
  margin 0 20px 10px 20px
  color colorBg

.tasks
  padding 0
  margin 0
  display grid
  grid-template-columns 1fr 1fr
  grid-auto-rows 1fr
  column-gap 5px
  row-gap 5px

  .task-button
    button()
    border-radius 8px
    background colorBg
    color colorText1
    width 100%
    height 100%

</style>

<template>
  <header class="header">ДОСТУПНЫЕ ЗАДАНИЯ</header>
  <!-- <div class="info">Задания станут доступны после начала основного этапа</div> -->
  <div class="tasks">
    <button class="task-button">Онлайн-задание</button>
    <button class="task-button">Фото-задание</button>
    <button class="task-button">Путешествие в НОЦ</button>
    <button class="task-button">Задание с актёром</button>
  <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'TaskType',
}
</script>
