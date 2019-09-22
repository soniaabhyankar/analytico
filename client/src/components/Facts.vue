<template>
  <div>
    <span v-show="false">{{ showFacts }}</span>
    <div class="container" v-if="facts">
      <h3 class="text-center mt-3">
        <span class="text-primary">{{facts.country}}%</span> of our users are from the same
        <span class="text-primary">country</span> as you.
      </h3>
      <hr class="border-primary my-5" />
      <h3 class="text-center mt-3">
        <span class="text-primary">{{facts.gender}}%</span> of our users are of the same
        <span class="text-primary">gender</span> as you.
      </h3>
      <hr class="border-primary my-5" />
      <h3 class="text-center mt-3">
        <span class="text-primary">{{facts.religion}}%</span> of our users have the same
        <span class="text-primary">religion</span> as you.
      </h3>
      <hr class="border-primary my-5" />
    </div>
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
  computed: {
    async showFacts() {
      const user_id = window.$cookies.get("user_id");
      console.log("user id ", user_id);
      this.facts = await StatsService.showFacts(user_id);
      console.log("facts ", this.facts);
    }
  }
};
</script>