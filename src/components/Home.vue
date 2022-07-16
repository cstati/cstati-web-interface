<template>
  <div>
    <v-container fluid class="mt-16">
      <v-row align="stretch" justify="center">
        <v-col>
          <Timer/>
        </v-col>

        <v-col>
          <Money/>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import Money from "@/components/Money";
import Timer from "@/components/Timer";
export default {
  name: "Home",
  components: {
    Money,
    Timer
  },
  data () {
    return {
    }
  },
  async created() {
    if (this.$store.getters.getGuests.length == 0) {
      this.$store.dispatch('loadGuests')
    }
  },
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
