<template>
  <v-app>
    <nav>
      <v-toolbar dark color="gray">
        <v-toolbar-title>
          <nuxt-link to="/">MaS</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items v-if="!me">
          <v-btn text nuxt to="/movie" :style="{ display: 'flex', alignItems: 'center' }">
            <div>영화검색</div>
          </v-btn>
          <v-btn text nuxt to="/login" :style="{ display: 'flex', alignItems: 'center' }">
            <div>로그인</div>
          </v-btn>
          <v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
        
        <v-toolbar-items v-else>
          <v-btn text nuxt to="/movie" :style="{ display: 'flex', alignItems: 'center' }">
            <div>영화검색</div>
          </v-btn>
          <v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
            <div>프로필</div>
          </v-btn>
          <v-btn text :style="{ display: 'flex', alignItems: 'center' }" @click="onLogOut">
            <div>로그아웃</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <!-- <v-row no-gutters>
      <v-col cols="12" md="2">
        <search-hash-tag />
      </v-col>
      <v-col cols="12" md="10">
        <nuxt />
      </v-col>
    </v-row> -->
    <nuxt />
  </v-app>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState('users', ['me']),
    },
    methods: {
      onLogOut() {
        this.$store.dispatch('users/logOut')
        this.$router.push({
              path:'/',
            });
      },
    },
  };
</script>

<style scoped>
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
</style>