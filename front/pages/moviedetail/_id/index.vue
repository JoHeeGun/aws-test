<template>
  <div class="container">
    <div
      class="movie-details"
    >
      <div
        :style="{ backgroundImage: `url(${theMovie.Poster})`}"
        class="poster"
      />
      <div class="specs">
        <div class="ptitle">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h2>Ratings</h2>
          <div class="rating-wrap">
            <div class="rating">
              <div
                v-for="{ Source: name , Value: score } in theMovie.Ratings"
                :key="name"
                :title="name"
                class="rating"
              >
                <img
                  :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                  :alt="name"
                >
                <span>{{ score }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="test">
          <h2>Actors</h2>
          {{ theMovie.Actors }}
        </div>
        <div class="test">
          <h2>Director</h2>
          {{ theMovie.Director }}
        </div>
        <div class="test">
          <h2>Production</h2>
          {{ theMovie.Production }}
        </div>
        <div class="test">
          <h2>Genre</h2>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      imageLoading: true
    }
  },
  computed:{
    ...mapState('movie',[
      'theMovie',
    ])
  },
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId',{
      id: this.$route.params.id
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

.container {
  padding-top: 40px;
}
.movie-details {
  display: flex;
  color: gray;
  .poster {
    width: 600px;
    height: 700px * 3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: gray;
    background-size: cover;
    background-position: center;
    position: relative;
    flex-shrink: 0;
  }
  .ptitle {
      color: black;
      font-weight: 600;
      font-family: "Oswald", sans-serif;
      font-size: 90px;
      line-height: 1;
      margin-bottom: 40px;
    }
    .test{
      color: black;
      font-size: 30px;
      margin-bottom: 20px;
    }
  .specs {
    flex-grow: 1;
    .labels {
      margin-bottom: 40px;
      color: blue;
      font-size: 20px;
      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
      font-size: 20px;
      color: black;
      margin-bottom: 40px;
    }
    .ratings {
      margin-bottom: 40px;
      font-size: 30px;
      color: black;
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 50px;
          img {
            height: 50px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
}
</style>