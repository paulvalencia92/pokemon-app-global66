<template>
  <v-container>
    <v-row class="d-flex justify-center mt-4">
      <v-col md="6">
          <pokemon-table></pokemon-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";
import pokemonTable from "./pokemonTable";

export default {
  name: "Pokemons",
  components: {pokemonTable},
}
</script>

<style scoped>

</style>
