<template>
  <v-container>
    <v-carousel :cycle="true" :interval="3000">
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      />
    </v-carousel><br>
    <post-form v-if="me" />
    <search-hash-tag />
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';  
  import PostCard from '~/components/PostCard';
  import PostForm from '~/components/PostForm';
  import SearchHashTag from '../components/SearchHashTag.vue';


  export default {
    components: {
      PostCard,
      PostForm,
      SearchHashTag,
    },
    data() {
      return {
        name: 'Nuxt.js',
        items: [
        {
          src: 'https://img.cgv.co.kr/Front/Main/2021/0913/16315036396800.jpg'
        },
        {
          src: 'https://img.cgv.co.kr/Front/Main/2021/1104/16360095814160.jpg'
        },
        {
          src: 'https://img.cgv.co.kr/Front/Main/2021/1104/16360095813380.jpg'
        },
        {
          src: 'https://img.cgv.co.kr/Front/Main/2021/1021/16347931161070.jpg'
        }
      ]
      };
    },
    fetch({ store }) {
      return store.dispatch('posts/loadPosts', { reset: true });
    },
    computed: {
      ...mapState('users', ['me']),
      ...mapState('posts', ['mainPosts','hasMorePost'])
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