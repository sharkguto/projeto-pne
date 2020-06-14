<template>
<div>
<section class="hero ccr-vermelho">
  <div class="hero-body">
    <div class="container">
      <img alt="Vue logo" src="../assets/logo.png">
      <h1 class="title ccr-vermelho">
        {{ title }}
      </h1>
      <h2 class="subtitle ccr-vermelho">
        {{subTitle}}
      </h2>
    </div>
  </div>
</section>
<section>
  <div class="container" v-if="listRankingPx">

    <div class="card">
  <!-- <div class="card-image">
    <figure class="image is-128x128">
      <img src="../assets/caminhao.png" alt="Placeholder image">
    </figure>
  </div> -->
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="../assets/caminhao.png" alt="caminhao">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{listRankingPx[0].name}}</p>
        <p class="subtitle is-6">@{{listRankingPx[0].nickname}}</p>
      </div>
      <div>
        <p class="title is-4">#{{listRankingPx[0].position}}</p>
        <p class="subtitle is-6">{{listRankingPx[0].points}} pontos</p>
      </div>
    </div>

    <div class="content">
      <b> <font-awesome-icon icon="mobile" /> {{listRankingPx[0].phone}}</b>
      <br>
      <br>
      Data da última pontuação
      <br>
    <time :datetime="listRankingPx[0].lastActiveDate">{{listRankingPx[0].lastActiveDate}}</time>
    </div>
  </div>
</div>

    <!-- <div v-for="(item, index) in listRankingPx[0]" :key="index">
    {{ index }} - {{ item }}
    </div> -->
  </div>
</section>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DetailsPx',
  props: {
    title: String,
    subTitle: String,
  },
  created() {
    axios
      .get('http://localhost:8080/ranking-px/list', {
        headers: { 'x-api-key': 'token-auth-here' },
        params: { nickname: this.$route.query.nickname },
      })
      .then((response) => {
        if (response.status === 200) {
          this.listRankingPx = response.data;
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.logout();
        }
      });
  },
  data() {
    return {
      listRankingPx: null,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ccr-vermelho {
  background-color: #CF2A27;
  color: white;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
