<template>
<div>
<section class="hero ccr-vermelho">
  <div class="hero-body">
    <div class="container">
      <img alt="Vue logo" style="width:300px; max-height:100px;" src="../assets/logo.png">
      <h1 class="title ccr-vermelho">
        {{ title }}
      </h1>
      <h2 class="subtitle ccr-vermelho">
        {{subTitle}}
      </h2>
    </div>
  </div>
</section>
<section class="divRank">
  <div class="container" v-if="listRankingPx">
    <div class="columns is-centered" >
       <div class="column  is-8-widescreen">
          <b-table
          @dbclick="moreDetails"
          :data="listRankingPx"
          :columns="columns"
          paginated
          focusable
          :selected.sync="selected"
          per-page="20">
      </b-table>
       </div>
     
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

  watch: {
    selected(newVal, oldVal) {
      // eslint-disable-next-line no-alert
      // alert(`value changed from ${oldVal} to ${JSON.stringify(newVal)}`);
      if (oldVal || newVal) {
        this.$router.push({ name: 'Details', query: { nickname: newVal.nickname } });
      }
    },
  },
  created() {
    let url = 'http://localhost:8080/ranking-px/list';
    if (process.env.NODE_ENV === 'production') {
      url = 'http://localhost:8080/ranking-px/list';
    }
    axios
      .get(url, null, {
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
      selected: null,
      listRankingPx: null,
      columns: [
        {
          field: 'position',
          label: 'Posição',
          width: '40',
          numeric: true,
          sortable: true,
          centered: true,
        },
        {
          field: 'points',
          label: 'Pontos',
          width: '40',
          numeric: true,
          centered: true,
        },
        {
          field: 'nickname',
          label: 'Apelido',
          centered: true,
        },
        {
          field: 'name',
          centered: true,
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

.divRank {
  background-color: #f5a623;
  padding-top: 30px;
  min-height: 500px;
}
.ccr-vermelho {
  background-color: #CF2A27;
  color: white;
  margin-top:20px;
}

.pagination-link.is-current {
    background-color: #CF2A27!important;
    border-color: #CF2A27!important;
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
