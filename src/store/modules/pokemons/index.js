import axios from "axios";

export default {
    namespaced: true,
    state: {
        pokemonItems: [],
        favoritePokemons: [],
        offset: 0,
        limit: 10,
        pageCount: 0,
    },
    getters: {
        pokemonsNames(state) {
            return state.favoritePokemons.map(pokemon => pokemon.name);
        }
    },
    mutations: {
        SET_POKEMONS(state, data) {
            state.pokemonItems = data.results;
            state.pageCount = Math.floor(data.count / state.limit)
        },
        UPDATE_OFFSET(state, data) {
            state.offset = data;
        },
        TOGGLE_FAVORITE_POKEMON(state, data) {
            const pokemon = state.favoritePokemons.find(item => item.name == data.name);
            if (pokemon) {
                const index = state.favoritePokemons.findIndex(item => item.name == pokemon.name);
                state.favoritePokemons.splice(index, 1);
            } else {
                state.favoritePokemons.push(data);
            }
        },
        SET_FAVORITES(state) {
            state.pokemonItems = state.favoritePokemons;
        },
        CHANGE_LIMIT(state, count) {
            state.limit = count
        }
    },
    actions: {
        async getPokemons(context) {
            try {
                context.commit('TOGGLE_STATUS_OVERLAY', null, {root: true});
                context.commit('CHANGE_LIMIT', 10);
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
                    params: {
                        offset: context.state.offset,
                        limit: context.state.limit
                    }
                });
                context.commit('SET_POKEMONS', response.data);
            } catch (e) {
                return Promise.reject('danger');
            } finally {
                setTimeout(() => {
                    context.commit('TOGGLE_STATUS_OVERLAY', null, {root: true});
                }, 150)
            }
        },
        async getFavoritesPokemon(context, favorites) {
            context.commit('TOGGLE_STATUS_OVERLAY', null, {root: true});
            context.commit('CHANGE_LIMIT', favorites.length);
            context.commit('SET_FAVORITES', favorites);
            setTimeout(() => {
                context.commit('TOGGLE_STATUS_OVERLAY', null, {root: true});
            }, 150)
        },
        async showPokemon(state, name) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return Promise.resolve(response.data);

        }

    },
};
