<template>
  <v-card>
    <v-card-title>
      <h2>Статистика по сборщикам:</h2>
    </v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Сборщик
          </th>
          <th class="text-left">
            Бабки
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in collectors"
            :key="item.name"
        >
          <td>{{ item }}</td>
          <td>{{ getCollectedMoney(item) }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "Collected",
  data: () => ({
    collectors: [
      'Андрей Гречко',
      'Алиса Карпенко',
      'Анеля Куракина',
      'Анастасия Серебрякова',
      'Артем Бувальцев',
      'Артем Маланьин',
      'Алексей Коледаев',
      'Дарья Иванова',
      'Даниил Завалинский',
      'Кирилл Нестеров',
      'Степан Понапорев',
      'Тимур Царев',
    ]
  }),
  methods: {
    getCollectedMoney(name) {
      if (this.$store.state.guests == null) {
        return 0
      }
      let collected = 0;
      this.$store.state.guests.forEach((item) => {
        if (item.accepter === name && item.isPaid) {
          let inc = 0;
          switch (item.room) {
            case 'Economy':
              inc = 3800
              break
            case 'Base':
              inc = 4100
              break
          }
          inc += 200 * item.waveNumber
          collected += inc
        }
      })
      return collected
    }
  }

}
</script>

<style scoped>

</style>
