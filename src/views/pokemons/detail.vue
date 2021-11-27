<template>
  <v-card class="mx-auto overflow-hidden" max-width="500">
    <v-img height="200px" src="@/assets/Background.png"></v-img>
    <div class="image-profile">
      <v-img :src="pokemon.sprites.front_default" height="200" width="200"></v-img>
    </div>
    <v-card-text class="text--primary">
      <v-list-item-group color="primary">
        <v-list-item><b class="mr-2">Name: </b> {{ pokemon.name }}</v-list-item>
        <v-divider></v-divider>
        <v-list-item><b class="mr-2">Weight:</b> {{ pokemon.weight }}</v-list-item>
        <v-divider></v-divider>
        <v-list-item><b class="mr-2">Height:</b> {{ pokemon.height }}</v-list-item>
        <v-divider></v-divider>
        <v-list-item><b class="mr-2">Height:</b> {{ types }}</v-list-item>
      </v-list-item-group>
    </v-card-text>
    <v-card-text class="d-flex justify-lg-space-between">
      <v-btn @click="copyData" color="error" rounded class="mr-2">
        Share to my friends
      </v-btn>
      <v-btn
          class="mx-2"
          fab
          dark
          small
          @click="toggleFavoritePokemon()"
          :color="pokemonsNames.includes(pokemon.name) ? 'warning' : '#BDBDBD'"
      >
        <v-icon dark>
          mdi-star
        </v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "detail",
  props: {
    pokemon: {
      type: Object,
      required: true,
    }
  },
  data(){
    return {
      snackbar: false
    }
  },
  computed: {
    ...mapGetters('pokemons', ['pokemonsNames']),
    types() {
      return this.pokemon.types.map(item => item.type.name).join(",");
    }
  },
  methods: {
    ...mapMutations('pokemons', ['TOGGLE_FAVORITE_POKEMON']),
    async copyData() {
      const data = {name: this.pokemon.name,type: this.types}
      await navigator.clipboard.writeText(JSON.stringify(data));
      this.$emit('infoCopied');
    },
    toggleFavoritePokemon() {
      this.TOGGLE_FAVORITE_POKEMON(this.pokemon);
    },
  }
}
</script>

<style scoped>
.image-profile {
  position: absolute;
  top: 0;
  right: 50%;
  margin-right: -100px;
}

</style>
