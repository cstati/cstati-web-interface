<template>
  <v-container fluid>
    <v-card class="mx-auto mr-12">
      <v-card-title>
        Управление билетами
      </v-card-title>
      <v-form class="px-4"
              ref="form"
      >
        <v-text-field
            placeholder="Цена билета"
            outlined
            v-model="cost"
        >
        </v-text-field>
        <v-text-field
            placeholder="Количесвто билетов"
            outlined
            v-model="amount"
        >
        </v-text-field>
        <v-select
            :items="['Base', 'Comfort']"
            placeholder="Тип комнаты"
            outlined
            v-model="type">
        </v-select>
      </v-form>
      <v-card-actions class="px-4 pb-4">
        <v-btn
            color="deep-purple accent-4"
            @click="postTickets">
          Добавить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "TicketsCard",
  data: () => ({
    cost: '',
    amount: '',
    type: '',
  }),
  methods: {
    postTickets() {
      console.log({ticket: {price: this.cost, room: this.room, count: this.amount}})
      this.$store.dispatch('postTicket', {ticket: {price: this.cost, room: this.room, count: this.amount}})
    }
  }
}
</script>

<style scoped>

</style>
