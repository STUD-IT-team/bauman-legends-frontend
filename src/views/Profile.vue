<style lang="stylus" scoped>
.header
  height 150%
  background lightcyan

.name
  color cornflowerblue
  font-size 13

.team
  .title
    color darkseagreen
    font-size 20
    font-weight bold

  .member
    .leader
      color #51c49f
      font-weight bolder
    .name
      color #51c49f
    .role
      color violet

</style>

<template>
  <header class="header">
    <div> hello </div>
  </header>

  <main class="root">
    <div class="title"> PROFILE PAGE </div>

    <div class="name"> {{ userData.name }} </div>
    <div class="team">
      <div class="title"> {{teamData.title }} </div>
      <div v-for="member in sortedMembers" class="member">

        <div class="name">{{ member.name }}</div>
        <div class="role">{{ member.role }}</div>
      </div>
    </div>

  </main>
  <footer>
    <router-link to="/">TO MAIN</router-link>
  </footer>

</template>

<script>

export default {
  data() {
    return {
      userData: {
        name: this.$user.name,
        group: this.$user.group,
        tg: this.$user.tg,
        vk: this.$user.vk,
        email: this.$user.email,
        telephone: this.$user.telephone,
      },
      loading: false,
      teamData: {
        id: undefined,
        title: undefined,
        members: [] // 0 - regular 1 - vice 2 - lead
      }
    }
  },

  async mounted() {
    await this.getCurTeam()
  },

  computed(){
    function sortedMember () {
      return this.teamData.members.slice().sort((a, b) => (a.role > b.role) ? -1 : 1)
    }
  },


  methods: {
    async getCurTeam(){
      const {data: teamData, code, ok} = this.$api.getTeam()
      }
    }
  }
}
</script>
