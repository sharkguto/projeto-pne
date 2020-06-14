<template>
<div>
<section class="hero is-warning">
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
    <div class="hello">

  </div>
  </div>
</section>
<section>
  <div class="columns is-mobile" v-if="listRankingPx">
    <div class="column">
      <b-table
          :data="listRankingPx"
          :columns="columns">
      </b-table>
    </div>
  </div>
</section>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RankingPx',
  props: {
    title: String,
    subTitle: String,
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
      columns: [
        {
          field: 'position',
          label: 'Posição',
          width: '40',
          numeric: true,
          sortable: true,
        },
        {
          field: 'points',
          label: 'Pontos',
          width: '40',
          numeric: true,
        },
        {
          field: 'nickname',
          label: 'Apelido',
        },
        {
          field: 'name',
          label: 'Nome',
        },
        // {
        //   field: 'lastActiveDate',
        //   label: 'Date',
        //   centered: true,
        // },
      ],
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
