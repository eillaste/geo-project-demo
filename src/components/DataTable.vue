<template>
  <v-data-table
    :headers="headers"
    :items="table_data"
    :items-per-page="15"
    class="elevation-1"
    style="display:block"
  >
    <template v-slot:item="text">
      <tr>
        <td>
          <router-link :to="'/geo/locality/' + text.item.id" :country="1234">{{
            text.item.id
          }}</router-link>
        </td>
        <td>{{ text.item.country__value_en }}</td>

        <td>
          {{ text.item.maakond__maakond_en }}
        </td>

        <td>
          <router-link :to="'/geo/locality/' + text.item.id" country="1234">{{
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
            <v-icon dark>mdi-heart</v-icon>
          </v-btn>
        </td>
        <td>{{ table_data.id }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ["color", "country"],
  data() {
    return {
      table_data: this.$attrs.table_data,
      // page:1,
      headers: [
        { text: "id", align: "start", sortable: false, value: "id" },
        { text: "Country", value: "id" },
        { text: "County", value: "maakond__maakond_en" },
        { text: "Locality", value: "locality_en" },
        { text: "Settlement", value: "asustusyksus__asustusyksus_en" },
        { text: "Type", value: "type__value_en" }
        // { text: "Iron (%)", value: "iron" }
      ]
    };
  },
  methods: {
    onButtonClick(item) {
      if (localStorage.favourites) {
        let favourites = JSON.parse(localStorage.favourites);
        favourites.push({
          id: item.id,
          country__value_en: item.country__value_en,
          maakond__maakond_en: item.maakond__maakond_en,
          locality_en: item.locality_en,
          asustusyksus__asustusyksus_en: item.asustusyksus__asustusyksus_en,
          type__value_en: item.type__value_en
        });
        localStorage["favourites"] = JSON.stringify(favourites);
      } else {
        localStorage["favourites"] = JSON.stringify([
          {
            id: item.id,
            country__value_en: item.country__value_en,
            maakond__maakond_en: item.maakond__maakond_en,
            locality_en: item.locality_en,
            asustusyksus__asustusyksus_en: item.asustusyksus__asustusyksus_en,
            type__value_en: item.type__value_en
          }
        ]);
      }
    }
  }
};
</script>
