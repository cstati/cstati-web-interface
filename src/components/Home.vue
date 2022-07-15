<template>
  <div>
    <v-container fluid class="mt-16">
      <v-row align="center" justify="center">
        <v-card rounded class="pa-4">
          <v-card-title class="justify-center">
            <h2>До мероприятия осталось</h2>
          </v-card-title>

          <div class="text-center">
            <v-progress-circular
                :rotate="-90"
                :size="150"
                :width="15"
                :value="daysP"
                color="teal"
            >
              {{ days }} дней
            </v-progress-circular>

            <v-progress-circular
                :rotate="-90"
                :size="150"
                :width="15"
                :value="hoursP"
                color="primary"
            >
              {{ hours }} часов
            </v-progress-circular>

            <v-progress-circular
                :rotate="-90"
                :size="150"
                :width="15"
                :value="minutesP"
                color="red"
            >
              {{ minutes }} минут
            </v-progress-circular>

            <v-progress-circular
                :rotate="-90"
                :size="150"
                :width="15"
                :value="secondsP"
                color="pink"
            >
              {{ seconds }} секунд
            </v-progress-circular>
          </div>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data () {
    return {
      interval: {},
      daysP: 100,
      days: 0,
      hoursP: 100,
      hours: 0,
      minutesP: 100,
      minutes: 0,
      secondsP: 100,
      seconds: 0,
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    let countDownDate = new Date("Oct 16 2022 00:00:00").getTime();
    let countDownDateStart = new Date("Jul 15, 2022 22:29:00").getTime();

    this.interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.daysP = Math.floor(this.mapNumber(this.days, 0, 200, 0, 100))
      this.hoursP = Math.floor(this.mapNumber(this.hours, 0, 24, 0, 100))
      this.minutesP = Math.floor(this.mapNumber(this.minutes, 0, 60, 0, 100))
      this.secondsP = Math.floor(this.mapNumber(this.seconds, 0, 60, 0, 100))

    }, 1000)
  },
  methods: {
    mapNumber(num, a, b, c, d) {
      return (num-a)/(b-a) * (d-c) + c;
    }
  }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
