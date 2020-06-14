<template>
<div>
<section class="hero ccr-vermelho">
  <div class="hero-body">
    <div class="container">
      <img alt="Vue logo" src="../assets/logo.png">
      <h1 class="title">
        {{ title }}
      </h1>
      <h2 class="subtitle">
        {{subTitle}}
      </h2>
    </div>
  </div>
</section>
<section>
  <div class="container" v-if="listRankingPx">
    <div v-for="(item, index) in listRankingPx[0]" :key="index">
    {{ index }} - {{ item }}
    </div>
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
