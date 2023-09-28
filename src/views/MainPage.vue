<style lang="stylus" scoped>

</style>

<template>
  <div class="root">
    <div class="title"> MAIN PAGE</div>
    <div class="description">hello</div>
    <form action="/contact" method="post">
      <div><input type="text" name="name" value="name here"></div>
      <div><input type="submit" value="send"></div>
    </form>
  </div>
  <router-link to="/profile">TO PROF</router-link>

</template>

<script>
export default {

}
</script>

