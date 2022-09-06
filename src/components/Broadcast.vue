<template>
  <div>
    <v-container fluid>
      <v-row  align="stretch" justify="center">

        <v-col>
          <v-card class="mx-auto">
            <v-card-title>
              Отправить сообщение
            </v-card-title>
            <v-form class="px-4"
                    ref="formSingle"
                    v-model="formSingle"
            >

<!--              <v-overflow-btn-->
<!--                  class="my-4"-->
<!--                  :items="$store.state.guests"-->
<!--                  label="Получатель"-->
<!--                  editable-->
<!--                  :item-text="getText"-->
<!--                  item-value="id"-->
<!--                  :loading="$store.state.guests.length == 0"-->
<!--                  filled-->
<!--                  v-model="target"-->
<!--              ></v-overflow-btn>-->

              <v-combobox
                  clearable
                  multiple
                  outlined
                  small-chips
                  label="Получатель"
                  :items="$store.state.guests"
                  :item-text="getText"
                  item-value="id"
                  v-model="target">
              </v-combobox>

              <v-textarea
                  counter
                  label="Сообщение"
                  :rules="rules"
                  v-model="messageSingle"
              ></v-textarea>
            </v-form>
            <v-card-actions class="px-4 pb-4">
              <v-btn
                  text
                  outlined
                  @click="$refs.formSingle.reset()"
              >
                Очистить
              </v-btn>
              <v-spacer></v-spacer>
              <v-checkbox
                  v-model="onlyPaid"
                  label="Отправить только оплатившим"
              ></v-checkbox>
              <v-spacer></v-spacer>
              <v-btn
                  :disabled="!formSingle"
                  class="white--text"
                  color="deep-purple accent-4"
                  depressed
                  @click="sendMessage"
              >
                Отправить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Broadcast",
  data: () => ({
    formSingle: false,
    messageSingle: '',
    target: [],
    rules: [v => v != null && v.length <= 4096 && v.length > 0 || 'Мин. 1 символ / Макс. 4096 символа'],
    onlyPaid: false
  }),
  mounted() {
    if (this.$store.getters.getGuests.length == 0) {
      this.$store.dispatch('loadGuests')
    }
  },
  methods: {
    getText(item) {
      return item.surname + ' ' + item.name + ' ' + item.patronymic
    },
    sendMessage() {
      console.log(this.target)
      let ids = []
      this.target.forEach(item => {
        ids.push(item.id)
      })
      this.$store.dispatch('sendMessage', {target: ids, message: this.messageSingle, onlyPaid: this.onlyPaid})
    }
  }
}
</script>

<style scoped>

</style>
