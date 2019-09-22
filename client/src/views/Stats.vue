<template>
  <div class="container" ref="content">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center display-1 text-primary font-weight-bold p-2 mb-5">Analytico</h1>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <h1 class="text-center text-uppercase">
          Did you know
          <span class="text-primary">?</span>
        </h1>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <Facts />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <h2 class="text-center mt-4">Wanna know some more facts?</h2>
        <h2 class="text-center">
          Select any
          <span class="text-primary">two</span> features to show some statistics
        </h2>
        <form class="text-center h4 mt-5" v-on:submit.prevent="showStats">
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="country"
                value="country"
                v-model="checked"
                checked
              />
              <label class="custom-control-label" for="country">Country</label>
            </div>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="gender"
                value="gender"
                v-model="checked"
              />
              <label class="custom-control-label" for="gender">Gender</label>
            </div>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="religion"
                value="religion"
                v-model="checked"
              />
              <label class="custom-control-label" for="religion">Religion</label>
            </div>
          </div>
          <button type="submit" class="btn btn-outline-primary btn-lg my-5">Show Stats</button>
        </form>
      </div>
    </div>
    <div class="row vh-100 mt-5 mb-5" v-if="selected">
      <div class="col-6 p-5">
        <h3 class="text-secondary my-5">
          Here is your
          <span class="border-bottom border-primary">current location</span> 😊
        </h3>
        <Map />
      </div>
      <div class="col-6 p-5">
        <h3 class="text-secondary my-5">
          Some more stats for the
          <span class="text-primary">nerds</span> 🤓
        </h3>
        <!-- Country Religion -->
        <table class="table table-bordered" v-if="cr">
          <thead>
            <tr class="table-primary">
              <td>Country</td>
              <td>Religion</td>
            </tr>
          </thead>
          <tbody>
            <span v-show="false">{{countryReligion}}</span>
            <tr v-for="(count, index) in counts" :key="index" :item="count">
              <td>
                {{count.country}}
                <span class="text-primary">({{count.percentage}}%)</span>
              </td>
              <td>
                <tr v-for="(cnt, i) in count.religions" :key="i" :item="cnt">
                  {{cnt.religion}}
                  <span class="text-primary">({{cnt.percentage}}%)</span>
                </tr>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Country Gender -->
        <table class="table table-bordered" v-if="cg">
          <thead>
            <tr class="table-primary">
              <td>Country</td>
              <td>Gender</td>
            </tr>
          </thead>
          <tbody>
            <span v-show="false">{{countryGender}}</span>
            <tr v-for="(count, index) in counts" :key="index" :item="count">
              <td>
                {{count.country}}
                <span class="text-primary">({{count.percentage}}%)</span>
              </td>
              <td>
                <tr class="text-capitalize" v-for="(cnt, i) in count.genders" :key="i" :item="cnt">
                  {{cnt.gender}}
                  <span class="text-primary">({{cnt.percentage}}%)</span>
                </tr>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Religion Gender -->
        <table class="table table-bordered" v-if="rg">
          <thead>
            <tr class="table-primary">
              <td>Religion</td>
              <td>Gender</td>
            </tr>
          </thead>
          <tbody>
            <span v-show="false">{{religionGender}}</span>
            <tr v-for="(count, index) in counts" :key="index" :item="count">
              <td>
                {{count.religion}}
                <span class="text-primary">({{count.percentage}}%)</span>
              </td>
              <td>
                <tr class="text-capitalize" v-for="(cnt, i) in count.genders" :key="i" :item="cnt">
                  {{cnt.gender}}
                  <span class="text-primary">({{cnt.percentage}}%)</span>
                </tr>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div class="row my-5 text-center">
      <div class="col-12">
        <h3 class="text-secondary mt-5">You can also download all of these stats</h3>
        <h3 class="text-secondary mt-3 mb-4">👇</h3>
        <button v-on:click="downloadPDF" type="button" class="btn btn-primary btn-lg">Download PDF</button>
      </div>
    </div>-->
    <Footer />
  </div>
</template>

<script>
import Map from "../components/Map.vue";
import Facts from "../components/Facts.vue";
import StatsService from "../services/StatsService";
import Footer from "../components/Footer.vue";
import jspdf from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "Stats",
  components: {
    Map,
    Facts,
    Footer
  },
  data() {
    return {
      selected: false,
      cr: false,
      cg: false,
      rg: false,
      checked: [],
      res: [],
      counts: []
    };
  },
  methods: {
    async showStats() {
      this.selected = true;
      this.res = [];
      if (
        this.checked.includes("country") &&
        this.checked.includes("religion")
      ) {
        this.cr = true;
        this.cg = false;
        this.rg = false;
      } else if (
        this.checked.includes("country") &&
        this.checked.includes("gender")
      ) {
        this.cr = false;
        this.cg = true;
        this.rg = false;
      } else {
        this.cr = false;
        this.cg = false;
        this.rg = true;
      }
      this.res = await StatsService.showStats(this.checked);
      // console.log(this.res);
    },
    downloadPDF() {
      var pdf = new jspdf();

      const contentHTML = this.$refs.content.innerHTML;

      pdf.addHTML(contentHTML, function() {});
      pdf.save("stats.pdf");
    }
  },
  computed: {
    countryReligion: function() {
      var userCount = 0;
      this.counts = [];
      // var countryStats = [];

      for (let i = 0; i < this.res.length; i++) {
        userCount += this.res[i].countryCount;
      }

      for (let i = 0; i < this.res.length; i++) {
        let perc = Math.round((this.res[i].countryCount / userCount) * 100);

        this.counts.push({
          country: this.res[i].country,
          percentage: perc
        });

        this.counts[i].religions = [];

        for (let j = 0; j < this.res[i].religions.length; j++) {
          let per = Math.round(
            (this.res[i].religions[j].count / this.res[i].countryCount) * 100
          );

          this.counts[i].religions.push({
            religion: this.res[i].religions[j].religion,
            percentage: per
          });
        }
      }

      // this.counts = countryStats.slice(0);
      return this.counts;
    },
    countryGender: function() {
      var userCount = 0;
      this.counts = [];

      // var countryStats = [];

      for (let i = 0; i < this.res.length; i++) {
        userCount += this.res[i].countryCount;
      }

      for (let i = 0; i < this.res.length; i++) {
        let perc = Math.round((this.res[i].countryCount / userCount) * 100);

        this.counts.push({
          country: this.res[i].country,
          percentage: perc
        });

        this.counts[i].genders = [];

        for (let j = 0; j < this.res[i].genders.length; j++) {
          let per = Math.round(
            (this.res[i].genders[j].count / this.res[i].countryCount) * 100
          );

          this.counts[i].genders.push({
            gender: this.res[i].genders[j].gender,
            percentage: per
          });
        }
      }

      // this.counts = countryStats.slice(0);
      return this.counts;
    },
    religionGender: function() {
      var userCount = 0;
      this.counts = [];

      // var countryStats = [];

      for (let i = 0; i < this.res.length; i++) {
        userCount += this.res[i].religionCount;
      }

      for (let i = 0; i < this.res.length; i++) {
        let perc = Math.round((this.res[i].religionCount / userCount) * 100);

        this.counts.push({
          religion: this.res[i].religion,
          percentage: perc
        });

        this.counts[i].genders = [];

        for (let j = 0; j < this.res[i].genders.length; j++) {
          let per = Math.round(
            (this.res[i].genders[j].count / this.res[i].religionCount) * 100
          );

          this.counts[i].genders.push({
            gender: this.res[i].genders[j].gender,
            percentage: per
          });
        }
      }

      // this.counts = countryStats.slice(0);
      return this.counts;
    }
  }
};
</script>
