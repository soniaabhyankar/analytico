<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-center display-1 text-primary font-weight-bold my-3">Analytico</h1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12 mx-auto text-center">
          <h1 class="display-4 mt-5">
            We love to collect and analyse
            <span class="text-primary">data.</span>
          </h1>
          <h1 class="mt-5 pt-5">
            Want to know more?
            <!-- <span class="text-primary">data.</span> -->
          </h1>
          <h1 class="mt-3">
            Fill up this quick
            <span class="text-primary">survey.</span>
          </h1>
        </div>
      </div>
      <div class="row mt-5 justify-content-center">
        <div class="col-md-6 offset-md-3 align-self-center">
          <SurveyForm />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-6 mx-auto">
          <CookieConsent />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// import UserService from "../services/UserService";
import uuidv4 from "uuid/v4";
import SurveyForm from "../components/SurveyForm.vue";
import CookieConsent from "../components/CookieConsent.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Home",
  components: {
    SurveyForm,
    CookieConsent,
    Footer
  },

  async created() {
    try {
      await this.$cookies.set("user_id", uuidv4(), 24000);
    } catch (err) {
      throw new Error(err);
    }
  }
};
</script>

<style>
#mapid {
  height: 50vh;
}
</style>
