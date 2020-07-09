<template>
  <div>
    <h1>Search Form</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" style="display:flex">
            <v-text-field
              v-model="fields.country__value_en"
              label="Country"
              required
            ></v-text-field
            ><Overflow v-on:choose_filter="filters[1] = $event"></Overflow>
          </v-col>

          <v-col cols="12" md="4" style="display:flex">
            <v-text-field
              v-model="fields.maakond__maakond_en"
              label="County"
              required
            ></v-text-field>
            <Overflow v-on:choose_filter="filters[2] = $event"></Overflow>
          </v-col>

          <v-col cols="12" md="4" style="display:flex">
            <v-text-field
              v-model="fields.asustusyksus__asustusyksus_en"
              label="Settlement"
              required
            ></v-text-field>

            <Overflow v-on:choose_filter="filters[3] = $event"></Overflow>
          </v-col>

          <v-col cols="12" md="4" style="display:flex">
            <v-text-field
              v-model="fields.locality_en"
              label="Locality"
              required
            ></v-text-field>
            <Overflow v-on:choose_filter="filters[4] = $event"></Overflow>
          </v-col>

          <v-col cols="12" md="4" style="display:flex">
            <v-select
              v-model="fields.type__value_en"
              :items="items"
              label="Type"
            ></v-select>
            <Overflow v-on:choose_filter="filters[5] = $event"></Overflow>
          </v-col>
        </v-row>
      </v-container>
      <v-btn
        class="mr-4"
        color="light-blue darken-3"
        style="color:white"
        @click="submit"
        >submit</v-btn
      >
      <h1 v-if="this.count === table_data.length">
        <DataTable
          class="v-responsive"
          v-bind:table_data="table_data"
          color="white"
          :country="fields.country__value_en"
        />
      </h1>
      <h2 v-else></h2>
    </v-form>
  </div>
</template>

<script>
import DataTable from "../components/DataTable";
import Overflow from "../components/Overflow";
// import AutoComplete from './AutoComplete';
export default {
  data: () => ({
    filters: {
      1: "iexact",
      2: "iexact",
      3: "iexact",
      4: "iexact",
      5: "iexact"
    },

    fetched: false,
    table_data: [],
    valid: false,
    fields: {
      country__value_en: "",
      maakond__maakond_en: "",
      asustusyksus__asustusyksus_en: "",
      locality_en: "",
      type__value_en: ""
    },
    items: [
      "",
      "borehole (section)",
      "continent",
      "country",
      "deposit",
      "geographical place or area",
      "outcrop",
      "outcrop (area)",
      "outcrop (section)",
      "region",
      "surface mine",
      "underground mine"
    ],
    iterations: null,
    count: undefined
  }),
  methods: {
    async submit() {
      //TODO This submit function could be broken down into smaller functions
      this.table_data = [];
      this.fetched = false;

      localStorage.removeItem("stored_search_data");
      let queryString = "https://api.geocollections.info/locality/?";
      let i = 0;
      for (const [key, value] of Object.entries(this.fields)) {
        if (value != "") {
          queryString +=
            key +
            "__" +
            this.filters[Object.keys(this.filters)[i]] +
            "=" +
            value +
            (i == 0 ? "&" : "&");
          i++;
        } else {
          i++;
        }
      }
      queryString = queryString.slice(0, -1);
      let f = "";
      queryString.length == 41 ? (f = "?") : (f = "&");

      // Fetch takes into consideration the possibility that there may be more
      // than 1000 results, resolved by making multiple queries
      await fetch(queryString + f + "fields=id&paginate_by=1")
        .then(response => response.json())
        .then(data => (this.count = data.count))
        .then(d => (this.iterations = Math.ceil(d / 1000)));

      for (let index = 0; index < this.iterations; index++) {
        fetch(
          queryString +
            f +
            "fields=id,country__value_en,asustusyksus__asustusyksus_en,locality_en,type__value_en,maakond__maakond_en&page=" +
            (index + 1)
        )
          .then(response => response.json())
          .then(json => this.update_data(json.results));
      }
      return null;
    },
    update_data(data_from_request) {
      this.table_data = this.table_data.concat(data_from_request);
    }
  },
  components: { DataTable, Overflow },
  beforeMount() {
    if (localStorage.stored_search_data) {
      this.table_data = JSON.parse(localStorage.stored_search_data);
      this.fetched = true;
      this.count = JSON.parse(localStorage["stored_search_data"]).length;
    } else {
      null;
    }
  },
  mounted() {
    localStorage.removeItem("stored_search_data");
  },
  beforeDestroy() {
    if (this.table_data) {
      localStorage["stored_search_data"] = JSON.stringify(this.table_data);
    } else {
      null;
    }
  }
};
</script>
