<template>
  <div>
    <v-container fluid class="mt-16">
      <v-row align="center" justify="center">
        <v-col>
          <Timer/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Money/>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col>
          <Collected/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Money from "@/components/Money";
import Timer from "@/components/Timer";
import Collected from "@/components/Collected";
export default {
  name: "Home",
  components: {
    Collected,
    Money,
    Timer
  },
  data () {
    return {
    }
  },
  async created() {
    if (this.$store.getters.getGuests.length == 0) {
      await this.$store.dispatch('loadGuests')
    }
  },
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
