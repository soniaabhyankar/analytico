<template>
  <div class="home">
    <div class="container">
      <h1>Stats App</h1>
      <h3>Take this survey to help us</h3>
      <SurveyForm />
    </div>
    <CookieConsent />
  </div>
</template>

<script>
// import UserService from "../services/UserService";
import uuidv4 from "uuid/v4";
import SurveyForm from "../components/SurveyForm.vue";
import CookieConsent from "../components/CookieConsent.vue";

export default {
  name: "home",
  components: {
    SurveyForm,
    CookieConsent
  },
  async created() {
    try {
      await this.$cookies.set("user_id", uuidv4(), 24000);
    } catch (err) {}
  }
};
</script>
