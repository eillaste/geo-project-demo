<template>
  <div>
    <h1 v-if="fetched">
      <Table
        :tableData="favourites"
        :headers="headers"
        tableName="Favourites"
        :key="componentKey"
        v-bind:favourites="true"
      />
      <v-btn
        class="mx-2"
        color="light-blue darken-3"
        style="color:white"
        @click="onButtonClick()"
        >Empty favourites</v-btn
      >
    </h1>
    <h1 v-else>No data 😢</h1>
  </div>
</template>

<script>
import Table from "../components/Table";
export default {
  props: ["county"],
  methods: {
    onButtonClick() {
      localStorage.removeItem("favourites");
      this.favourites = [];
      this.componentKey += 1;
    }
  },
  data: () => ({
    componentKey: 1,
    headers: [
      { text: "id", align: "start", sortable: false, value: "id" },
      { text: "Country", value: "id" },
      { text: "County", value: "maakond__maakond_en" },
      { text: "Locality", value: "locality_en" },
      { text: "Settlement", value: "asustusyksus__asustusyksus_en" },
      { text: "Type", value: "type__value_en" }
    ],
    favourites: [],
    fetched: false
  }),

  mounted() {
    this.fetched = true;
  },
  beforeMount() {
    let favourites = JSON.parse(localStorage.favourites);
    this.favourites = favourites;
  },
  components: { Table }
};
</script>
