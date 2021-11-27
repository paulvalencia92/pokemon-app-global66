<template>
  <v-app>
    <v-overlay :value="overlay">
      <v-img
          :src="require('@/assets/Loader.png')"
          class="my-3"
          contain
          height="100"
      />
    </v-overlay>
    <horizontal-menu></horizontal-menu>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import horizontalMenu from "./components/horizontalMenu";
import {mapState} from "vuex";

export default {
  name: 'App',
  components: {
    horizontalMenu
  },
  computed: {
    ...mapState(['overlay'])
  }
};
</script>
