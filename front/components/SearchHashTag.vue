<template>
  <v-card style="margin-bottom: 20px">
    <v-form @submit.prevent="onSearchHashtag">
      <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
        <v-text-field
          v-model="hashtag"
          label="해시태그 검색"
          hide-details
          prepend-icon="mdi-magnify"
        />
      </div>
    </v-form><br>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        hashtag: '',
      };
    },
    methods: {
      onSearchHashtag() {
        this.$router.push({
          path: `/hashtag/${encodeURIComponent(this.hashtag)}`,
        });
        this.hashtag = '';
      },
    },
  };
</script>

<style>
</style>