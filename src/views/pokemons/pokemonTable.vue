<template>
  <div>

    <error class="mb-4" v-if="isEmpty"></error>
    <v-card>
      <v-card-title>
        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        >
        </v-text-field>
      </v-card-title>
      <v-data-table
          class="elevation-1 mt-2"
          :loading="overlay"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="filterItems"
          :page.sync="page"
          :items-per-page="limit"
          hide-default-header
          hide-default-footer>
        <template v-slot:item.name="{ item }">
          <div class="d-flex justify-space-between  align-center">
            <v-btn @click="showMDetailModal(item.name)" text small>
              {{ item.name }}
            </v-btn>
            <v-btn @click="toggleFavoritePokemon(item)" rounded color="#FAFAFA">
              <v-icon :color="pokemonsNames.includes(item.name) ? 'warning' : '#BDBDBD'">
                mdi-star
              </v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <template v-if="!isEmpty">
      <v-snackbar
          :timeout="2000"
          :value="snackbar"
          color="success"
          absolute
          center
          shaped
          bottom>
        Información copiada
      </v-snackbar>
      <v-card class="d-flex justify-center pa-4">
        <v-btn @click="getAll" color="error" rounded class="mr-2 pa-6">
          <v-icon>
            mdi-format-list-bulleted-square
          </v-icon>
          All
        </v-btn>
        <v-btn @click="showFavorites" rounded color="#BDBDBD" class="pa-6">
          <v-icon left color="white">
            mdi-star
          </v-icon>
          <b style="color:white">Favorites</b>
        </v-btn>
      </v-card>
      <div class="text-center pt-2" v-if="!favorites">
        <v-pagination
            color="error"
            v-model="page"
            :length="pageCount"
        >
        </v-pagination>
      </div>
      <!--============================
         MODAL DETAIL POKEMON
      ==============================-->
      <v-dialog v-model="dialogDetail" width="500">
        <detail @infoCopied="infoCopied" :pokemon="currentPokemon"></detail>
      </v-dialog>
    </template>
  </div>

</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import detail from "./detail";
import error from '@/components/error.vue';

export default {
  name: "pokemonTable",
  components: {detail, error},
  created() {
    this.getPokemons();
  },
  data() {
    return {
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'name',
        },
      ],
      page: 1,
      search: '',
      favorites: false,
      currentPokemon: {},
      dialogDetail: false,
      snackbar: false,
      isEmpty: false
    }
  },
  computed: {
    ...mapState(['overlay']),
    ...mapState('pokemons', ['pokemonItems', 'pageCount', 'limit', 'offset', 'favoritePokemons']),
    ...mapGetters('pokemons', ['pokemonsNames']),
    filterItems() {
      let data = this.pokemonItems;
      if (this.search != '') {
        data = data.filter(pok => pok.name.includes(this.search.toLowerCase()) == true)
      }
      if (!data.length && this.favorites == false) {
        this.isEmpty = true
      } else {
        this.isEmpty = false
      }

      return data;
    }
  },
  methods: {
    ...mapActions('pokemons', ['getPokemons', 'getFavoritesPokemon', 'showPokemon']),
    ...mapMutations('pokemons', ['UPDATE_OFFSET', 'TOGGLE_FAVORITE_POKEMON']),
    toggleFavoritePokemon(pokemon) {
      this.TOGGLE_FAVORITE_POKEMON(pokemon);
    },
    showFavorites() {
      this.getFavoritesPokemon(this.favoritePokemons);
      this.favorites = true;
    },
    getAll() {
      this.getPokemons();
      this.favorites = false;
    },
    showMDetailModal(name) {
      this.showPokemon(name).then(response => {
        this.currentPokemon = response;
        this.dialogDetail = true;
      });
    },
    infoCopied() {
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 1000)
    }
  },
  watch: {
    page: function (val) {
      let offset = 0
      if (val > 1) {
        offset = this.limit * val;
      }
      this.UPDATE_OFFSET(offset);
      this.getPokemons();
    }
  }
}
</script>

<style scoped>
.clickeable {
  cursor: pointer;
}
</style>
