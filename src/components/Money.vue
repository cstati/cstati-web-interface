<template>
  <v-card class="mx-auto">
    <v-card-title>
      <h2>Всего собрано: {{ $store.getters.getMoney }} рублей</h2>
    </v-card-title>

    <v-progress-linear
        :value="eco/192 * 100"
        color="blue-grey"
        height="25"

    >
      <template v-slot:default="{ value }">
        <strong>Base: {{ eco }}</strong>
      </template>
    </v-progress-linear>

    <br>

    <v-progress-linear
        :value="base/156 * 100"
        color="amber"
        height="25"
    >
      <template v-slot:default="{ value }">
        <strong>Comfort: {{ base }}</strong>
      </template>
    </v-progress-linear>
  </v-card>
</template>

<script>
export default {
  name: "Money",
  data: () => ({
    eco: 0,
    base: 0,
  }),
  async mounted() {
    await this.$store.dispatch('loadGuests')
    this.$store.state.guests.forEach((item) => {
      if (item.isPaid) {
        switch (item.room) {
          case 'Base':
            this.eco++
            break
          case 'Comfort':
            this.base++
            break
        }
      }
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
