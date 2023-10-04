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

        <div class="name">{{ userNameById(member.id) }}</div>
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
        members: [] // 0 - regular 1 - vice 2 - lead {userID, roleID}
      }
    }
  },

  async mounted() {
    await this.getCurTeam()
  },

  computed(){
    function sortedMember () {
      function comparator(a, b) {
        if (a.role < b.role)
          return -1;
        else if (a.role > b.role)
          return 1;
        else{
          if (userNameById(a.id) < userNameById((b.id)))
            return 1;
          else
            return -1;
        }
      }

      return this.teamData.members.slice().sort(comparator)
    }

    async function userNameById(id){
      const {data, code, ok} = await this.$api.getUserById(id)
      if (ok)
        return data.name
      else
        console.log("oops")
    }
  },

  methods: {
    async getCurTeam(){
      const {data: teamData, code, ok} = await this.$api.getTeam();
    },
  }
}
</script>
