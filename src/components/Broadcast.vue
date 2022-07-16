<template>
  <div>
    <v-container fluid>
      <v-row  align="stretch" justify="center">
        <v-col>
          <v-card class="mx-auto">
            <v-card-title>
              Общая рассылка
            </v-card-title>
            <v-form class="px-4"
                    ref="formAll"
                    v-model="formAll"
            >
              <v-textarea
                  counter
                  label="Сообщение"
                  :rules="rules"
                  v-model="messageAll"
                  :rows="9"
              ></v-textarea>
            </v-form>
            <v-card-actions class="px-4 pb-4">
              <v-btn
                  text
                  outlined
                  @click="$refs.formAll.reset()"
              >
                Очистить
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  :disabled="!formAll"
                  class="white--text"
                  color="deep-purple accent-4"
                  depressed
              >
                Отправить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col>
          <v-card class="mx-auto">
            <v-card-title>
              Отправить пользователю
            </v-card-title>
            <v-form class="px-4"
                    ref="formSingle"
                    v-model="formSingle"
            >

              <v-overflow-btn
                  class="my-4"
                  :items="$store.state.guests"
                  label="Получатель"
                  editable
                  item-text="name"
                  :loading="$store.state.guests.length == 0"
                  filled
                  v-model="receiver"
              ></v-overflow-btn>

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
              <v-btn
                  :disabled="!formSingle"
                  class="white--text"
                  color="deep-purple accent-4"
                  depressed
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
    formAll: false,
    messageSingle: '',
    messageAll: '',
    receiver: '',
    rules: [v => v != null && v.length <= 4096 && v.length > 0 || 'Мин. 1 символ / Макс. 4096 символа'],
  }),
  mounted() {
    if (this.$store.getters.getGuests.length == 0) {
      this.$store.dispatch('loadGuests')
    }
  },
}
</script>

<style scoped>

</style>
