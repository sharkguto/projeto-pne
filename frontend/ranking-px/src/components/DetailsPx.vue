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
       <div class="column is-8-widescreen">
          <div class="content">
        <img style="border-radius:45%" class="perfil" src="../assets/caminhao.png" alt="caminhao">
       <div>
         <br>
        <p class="title is-1">{{listRankingPx[0].name}}</p>
        <p class="subtitle is-4">@{{listRankingPx[0].nickname}}</p>
      </div>
      <div>
        <br>
        <p class="title is-4">#{{listRankingPx[0].position}} - {{listRankingPx[0].points}} pontos</p>    
        <p class="title is-5"><font-awesome-icon icon="mobile" /> {{listRankingPx[0].phone}} </p>   
        <br>
        <br>
      </div>
      <!-- <b> <font-awesome-icon icon="mobile" /> {{listRankingPx[0].phone}}</b> -->
      <!-- <br>
      <br>
      Data da última pontuação
      <br>
    <time :datetime="listRankingPx[0].lastActiveDate">{{listRankingPx[0].lastActiveDate}}</time> -->
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
    let url = 'http://localhost:8080/ranking-px/list';
    if (process.env.NODE_ENV === 'production') {
      url = 'http://localhost:8080/ranking-px/list';
    }
    axios
      .get(url, {
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
.divRank {
  background-color: #f5a623;
  padding-top: 30px;
  min-height: 500px;
}

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

.perfil {
    box-shadow: rgba(0, 0, 0, 0.75) 0px 10px 20px -8px;
    border-style: solid;
    border-radius: 50%;
    border-width: 3px;
    border-color: white;
   
}
</style>
