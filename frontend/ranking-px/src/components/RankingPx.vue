<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="columns is-mobile">
      <div class="column">
      {{this.listRankingPx}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RankingPx',
  props: {
    msg: String,
  },
  created() {
    axios
      .get('http://localhost:8080/ranking-px/list', null, {
        headers: { 'x-api-key': 'token-auth-here' },
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
