<template>
  <div>
    <v-text-field
      v-model="title"
      outlined
      placeholder="영화를 검색해보세요!"
      @keypress.enter="searchMovies"
    >
      <template #prepend-inner> 
        <v-icon>mdi-magnify</v-icon>
      </template>
      <template #append>
        <v-progress-circular
          v-if="loading"
          size="24"
          color="primary"
          indeterminate
        />
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    title: {
      get () {
        return this.$store.state.movie.title
      },
      set (title) {
        this.$store.commit('movie/updateState', {
          title
        })
      }
    },
    loading () {
      return this.$store.state.movie.loading
    }
  },
  methods: {
    ...mapActions('movie', [
      'searchMovies'
    ])
  }
}
</script>

<style>

</style>