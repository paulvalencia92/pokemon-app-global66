<template>
  <div class="text-center">
    <h1>Uh-oh!</h1>
    <p class="text-center">You look lost on your journey!</p>
    <v-btn color="error" rounded @click="$router.push({name:'Home'})">
      Go back home
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "errors"
}
</script>

<style scoped>

</style>
