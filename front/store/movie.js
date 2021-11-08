import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    title: '',
    loading: false,
    movies: [],
    theMovie:[]
  }),
  getters: {},
  mutations: {
    updateState (state, payload) {
      Object
        .keys(payload)
        .forEach(key => {
          state[key] = payload[key]
        })
    },
    pushIntoMovies (state, movies) {
      state.movies.push(..._uniqBy(movies,'imdbID'))
    }
  },
  actions: {
    fetchMovies ({ state, commit }, pageNum) {
      return new Promise(async resolve => {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=95f11515&s=${state.title}&page=${pageNum}`)
        commit('pushIntoMovies', res.data.Search)
        resolve(res.data)
      })
    },
    async searchMovies ({ commit , dispatch }) {

      commit('updateState', {
        loading: true,
        movies: []
      })
      const { totalResults} = await dispatch('fetchMovies', 1)
      const pageLength = Math.ceil(totalResults / 10)

          
      if (pageLength > 1) {
        for (let i = 2; i <= pageLength; i += 1) {
          if (i > 4) break
          await dispatch('fetchMovies', i)
        }
      }

      commit('updateState', {
        loading: false
      })
    },
    async searchMovieWithId({ state, commit}, payload) {
      if(state.loading) return

      commit('updateState',{
        theMovie: {},
        loading: true
      })
      try{
        const res = await axios.get(`https://www.omdbapi.com/?apikey=95f11515&i=${payload.id}`)
        console.log(res.data)
        commit('updateState',{
          theMovie:res.data
        })
      } catch(error) {
        commit('updateState',{
          theMovie:{}
        })
      }finally{
        commit('updateState',{
          loading:false
        })
      }
    }
  }
}
