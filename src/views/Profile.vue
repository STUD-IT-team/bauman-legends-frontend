<style scoped lang="stylus">
@require '../styles/constants.styl'
@require '../styles/buttons.styl'
@require '../styles/utils.styl'

.root-profile
  hidden-scrollbar()
  width 100%

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
    .content-block
      padding-top 10px
      margin-top 10px
      @media({desktop})
        margin-top 20px
      //backdrop-filter blur(10px)
      background mix(colorBgLightMax, transparent, 70%)
      border-radius borderRadiusM
</style>

<template>
  <div class="root-profile">
    <Header />

    <div class="main-content">
      <div class="content-block">
        <TaskType />
      </div>

      <div class="content-block">
        <TeamManagement />
      </div>

      <div class="content-block">
        <ProfileInfo />
      </div>
    </div>
  </div>
</template>


<script>
  import CircleLoading from "../components/CircleLoading.vue";
  import TaskType from "../components/TaskType.vue";
  import TeamManagement from "../components/ManageTeam.vue";
  import ProfileInfo from "../components/ProfileInfo.vue";
  import Header from "../components/Header.vue";

  export default {
    components: {Header, ProfileInfo, TaskType, TeamManagement, CircleLoading},
  }
</script>
