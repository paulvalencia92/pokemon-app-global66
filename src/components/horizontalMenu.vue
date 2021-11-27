<template>
  <v-app-bar
      app
      color="error"
      dark
  >
    <div class="d-flex align-center">
      <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
      />
    </div>


    <v-btn
        exact
        class="mr-2"
        :to="{name: 'Home'}"
        text
    >
      <span class="mr-2">Home</span>
    </v-btn>

    <v-btn
        :to="{name: 'Pokemons'}"
        text
    >
      <span class="mr-2">Pokemons</span>
    </v-btn>


    <v-spacer></v-spacer>

    <v-btn
        href="https://global66.com/co/"
        target="_blank"
        text
    >
      <span class="mr-2">Global66</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "horizontalMenu"
}
</script>

<style scoped>

</style>
