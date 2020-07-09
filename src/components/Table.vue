<template>
  <div v-if="items.length > 0">
    <p>{{ tableName }}:</p>
    <v-data-table
      :headers="headerNames"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
      :key="componentKey"
    >
      <template v-if="this.$attrs.favourites" v-slot:item="text">
        <tr>
          <td>
            <router-link :to="'/geo/locality/' + text.item.id">{{
              text.item.id
            }}</router-link>
          </td>

          <td>{{ text.item.country__value_en }}</td>

          <td>{{ text.item.maakond__maakond_en }}</td>
          <td>
            <router-link :to="'/geo/locality/' + text.item.id">{{
              text.item.locality_en
            }}</router-link>
          </td>
          <td>{{ text.item.asustusyksus__asustusyksus_en }}</td>
          <td>{{ text.item.type__value_en }}</td>
          <td>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="light-blue darken-3"
              @click="onButtonClick(text.item)"
            >
              <v-icon dark>mdi-heart-broken</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["descriptiveData", "height", "tableData", "headers", "tableName"],
  data: () => ({
    dense: false,
    fixedHeader: false,
    headerNames: [],
    items: [],
    componentKey: 1
  }),
  methods: {
    onButtonClick(item) {
      let favourites = JSON.parse(localStorage.favourites);
      let filtered_favourites = favourites.filter(
        favourite => favourite.id != item.id
      );
      localStorage["favourites"] = JSON.stringify(filtered_favourites);
      this.items = filtered_favourites;
    }
  },
  created() {
    this.items = this.$props.tableData;
    this.headerNames = this.$props.headers;
  }
};
</script>
