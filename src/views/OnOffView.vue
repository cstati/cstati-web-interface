<template>
  <v-container fluid class="pr-12">
    <v-row class="ma-2" justify="center" align="center">
      <v-btn
          block
          height="300"
          color="green"
          @click="turnOn"
      >
        Запустить
      </v-btn>
    </v-row>
    <v-row class="ma-2">
      <v-btn
          block
          height="300"
          color="red"
          @click="turnOff"
      >
        Отключить
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OnOffView",
  data: () => ({

  }),
  methods: {
    async turnOn() {
      await this.$store.dispatch('turnOn', {newWave: true})
    },
    async turnOff() {
      await this.$store.dispatch('turnOff', {message: 'Волна еще не началась'})
    },
  }
}
</script>

<style scoped>

</style>
