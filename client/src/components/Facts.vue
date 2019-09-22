<template>
  <div class="container" v-if="facts">
    <h3 class="text-center mt-3">
      <span class="text-primary">{{facts.country}}%</span> of our users are from the same country as you.
    </h3>
    <hr class="border-primary my-5" />
    <h3 class="text-center mt-3">
      <span class="text-primary">{{facts.gender}}%</span> of our users are of the same gender as you.
    </h3>
    <hr class="border-primary my-5" />
    <h3 class="text-center mt-3">
      <span class="text-primary">{{facts.religion}}%</span> of our users have the same religion as you.
    </h3>
    <hr class="border-primary my-5" />
  </div>
</template>

<script>
import StatsService from "../services/StatsService";

export default {
  name: "Facts",
  data() {
    return {
      facts: []
    };
  },
  async created() {
    const user_id = window.$cookies.get("user_id");
    console.log("user id ", user_id);
    this.facts = await StatsService.showFacts(user_id);
    console.log("facts ", this.facts);
  }
};
</script>