<template>
  <v-container v-if="!me">
    <br>
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="이메일"
            type="email"
            required
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="비밀번호"
            type="password"
            required
          />
          <v-btn color="gray" type="submit" :disabled="!valid">로그인</v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-container>
        {{ me.nickname }}님 로그인되었습니다.
        <v-btn @click="onLogOut">로그아웃</v-btn>
        <v-row>
          <v-col cols="4">{{ me.Followings.length }} 팔로잉</v-col>
          <v-col cols="4">{{ me.Followers.length }} 팔로워</v-col>
          <v-col cols="4">{{ me.Posts.length }} 게시글</v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

  export default {
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
      };
    },
    computed: {
      ...mapState('users', ['me']),
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/logIn', {
            email: this.email,
            password: this.password,
          })
          .then(()=>{
            this.$router.push({
              path:'/',
            });
          })
          .catch(()=>{
            alert('로그인 실패');
          })
        }
      },
      onLogOut() {
        this.$store.dispatch('users/logOut');
      },
    },
  };
</script>

<style>
</style>