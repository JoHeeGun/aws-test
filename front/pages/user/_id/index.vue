<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        {{ other.nickname }} 님의 프로필입니다
        <v-row>
          <v-col cols="4">{{ other.Followings.length }} 팔로잉</v-col>
          <v-col cols="4">{{ other.Followers.length }} 팔로워</v-col>
          <v-col cols="4">{{ other.Posts.length }} 게시글</v-col>
        </v-row>
      </v-container>
    </v-card>
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
  import PostCard from '~/components/PostCard';
  import { mapState } from 'vuex'
  
  export default {
    components: {
      PostCard,
    },
    data() {
      return {
        name: 'Nuxt.js',
      };
    },
    fetch({ store, params }) {
      return Promise.all([
        store.dispatch('posts/loadUserPosts', {
          userId: params.id,
          reset: true,
        }),
        store.dispatch('users/loadOther', {
          userId: params.id,
        }),
      ]);
    },

    computed: {
      ...mapState('users', ['other']),
      ...mapState('posts', ['mainPosts'])
    },
    
    mounted() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
      onScroll() {
        console.log('scroll');
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (this.hasMorePost) {
            this.$store.dispatch('posts/loadPosts');
          }
        }
      },
    },
  };
</script>

<style>
</style>