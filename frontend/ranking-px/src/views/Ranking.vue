<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <RankingPx msg="Ranking PX - interligando a comunidade de caminhoneiros pelo Brasil"/>
  </div>
</template>

<script>
// @ is an alias to /src
import RankingPx from '@/components/RankingPx.vue';

export default {
  name: 'Ranking',
  components: {
    RankingPx,
  },
};
</script>
