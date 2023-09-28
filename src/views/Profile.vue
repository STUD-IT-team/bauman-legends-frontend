<style scoped>
.flexbox {
  display: flex;
  width: 100%;
  height: 100%;
  background: indianred;
}
.flexbox .card {
  width: 150px;
  height: 230px;
}
.flexbox .card .title {
  font-size: 1.5em;
  font-weight: bold;
}
.flexbox .card .description {
  font-size: 0.8em;
  color: darkgray;
}
</style>

<template>
  <div class="root">
    <div class="title"> PROFILE PAGE</div>
    <div class="name">Rudy</div>
    <div class="email">r@mail.ru</div>

    <div v-if="cards.length > 5">CARD MORE 5</div>
    <div v-else>NOT ENOUGH</div>

    <div class="flexbox">
      <div v-for="card in cards" class="card">
        <div class="titlr">{{ card.name }}</div>
        <div class="description">{{ card.description }}</div>

      </div>
    </div>


  </div>
  <router-link to="/">TO MAIN</router-link>



</template>

<script>
export default {
  data() {
    return {
      cards: [{name: 'rudy', description: 'cool'}]
    }
  }
}
</script>

