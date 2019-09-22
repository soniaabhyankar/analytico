<template>
  <div class="card border-primary mb-5" style="max-width: 20rem;">
    <div class="card-body">
      <form v-on:submit.prevent="formSubmit">
        <div class="form-group mb-4">
          <legend class="text-secondary">Gender</legend>
          <div class="custom-control custom-radio">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              v-model="gender"
              class="custom-control-input"
              checked
            />
            <label class="custom-control-label" for="male">Male</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              v-model="gender"
              class="custom-control-input"
            />
            <label class="custom-control-label" for="female">Female</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              type="radio"
              id="non-binary"
              name="gender"
              value="non-binary"
              v-model="gender"
              class="custom-control-input"
            />
            <label class="custom-control-label" for="non-binary">Non-binary</label>
          </div>
        </div>
        <div class="form-group mb-5">
          <legend class="text-secondary">Religion</legend>
          <input type="text" class="form-control" placeholder="Enter Religion" v-model="religion" />
        </div>
        <button type="submit" class="btn btn-primary py-2 px-5">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService";

export default {
  name: "SurveyForm",
  data() {
    return {
      gender: "",
      religion: ""
    };
  },
  methods: {
    formSubmit() {
      const user_id = this.$cookies.get("user_id");

      UserService.createUser(user_id, this.gender, this.religion);

      this.$router.push("stats");
    }
  }
};
</script>
