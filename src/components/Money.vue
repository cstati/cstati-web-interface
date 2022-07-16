<template>
  <v-card class="mx-auto mt-2" width="30vw">
    <v-card-title>
      <h2>Всего собрано</h2>
    </v-card-title>

    <v-sparkline
        :fill="false"
        :gradient="['#00c6ff', '#F0F', '#FF0']"
        :labels="labels"
        :line-width="2"
        :padding="16"
        :smooth="10"
        :value="$store.getters.getStatistics"
        auto-draw
    ></v-sparkline>

    <v-card-text class="text-h6">{{ $store.getters.getMoney }} рублей</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Money",
  data: () => ({
    labels: ['3500р', ' ', '4500р', ' ', '6000р']
  })
}
</script>

<style scoped>

</style>
