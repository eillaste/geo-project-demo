<template>
  <div>
    <h1>{{ page_data.locality_en }}</h1>
    <v-container>
      <v-card class="mx-auto" max-width="600" style="display:inline-block">
        <v-card-text>
          <div></div>

          <blockquote class="blockquote">
            <span style="font-weight: bold;">Type:</span>
            {{ page_data.type__value_en }}
          </blockquote>
          <!-- <blockquote class="blockquote">{{ page_data.localitystratigraphy__stratigraphy__stratigraphy_en }}</blockquote> -->
          <blockquote class="blockquote">
            <span style="font-weight: bold;">County:</span>
            {{ page_data.maakond__maakond_en }}
          </blockquote>
          <blockquote class="blockquote">
            <span style="font-weight: bold;">Municipality:</span>
            {{ page_data.vald__vald_en }}
          </blockquote>
          <blockquote class="blockquote">
            <span style="font-weight: bold;">Settlement:</span>
            {{ page_data.asustusyksus__asustusyksus_en }}
          </blockquote>
          <blockquote class="blockquote">
            <span style="font-weight: bold;">Stratigraphy base:</span>
            {{ page_data.stratigraphy_base__stratigraphy_en }}
          </blockquote>
          <blockquote class="blockquote">
            <span style="font-weight: bold;">Stratigraphy top:</span>
            {{ page_data.stratigraphy_top__stratigraphy_en }}
          </blockquote>
          <blockquote class="blockquote">
            <span style="font-weight: bold;">Remarks:</span>
            {{ page_data.remarks }}
          </blockquote>
          <blockquote class="blockquote">
            <span style="font-weight: bold;">Additional remarks:</span>
            {{ page_data.remarks_location }}
          </blockquote>
        </v-card-text>
      </v-card></v-container
    ><br />
    <br />
    <div v-if="fetched">
      <Table
        :descriptiveData="page_data"
        :tableData="related_data.drillcore"
        :headers="drillcore_headers"
        tableName="Drillcores"
      />

      <Table
        :descriptiveData="page_data"
        :tableData="related_data.sample"
        :headers="sample_headers"
        tableName="Samples"
      />

      <Table
        :descriptiveData="page_data"
        :tableData="related_data.specimen"
        :headers="specimen_headers"
        tableName="Specimens"
      />
    </div>
    <h1 v-else>No Related Data 😢</h1>
    <br />
    <div v-if="fetched">
      <LocationMap
        :marker="[page_data.latitude, page_data.longitude]"
      ></LocationMap
      ><br />
    </div>
    <h1 v-else>none</h1>
    <div v-if="item_photos.length > 0">
      <h1>Images:</h1>

      <Carousel :images="item_photos" height="auto"></Carousel>
    </div>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import Table from "../components/Table";
import LocationMap from "../components/LocationMap";
export default {
  props: ["color", "country"],
  data() {
    return {
      page_data: "",
      related_data: undefined,
      item_photos: [],
      fetched: false,
      drillcore_headers: [
        { text: "id", value: "id" },
        { text: "Depth (m)", value: "depth" },
        { text: "Agent", value: "agent" },
        { text: "Name", value: "drillcore_en" },

        { text: "Depository", value: "depository__value_en" },
        {
          text: "Storage location",
          value: "storage__location"
        },
        {
          text: "Locality country",
          value: "locality__country__value_en"
        }
      ],

      sample_headers: [
        { text: "id", value: "id" },

        { text: "Depth (m)", value: "depth" },
        { text: "Agent Collected", value: "agent_collected__agent" },
        {
          text: "Classification",
          value: "classification_rock__name_en"
        },
        {
          text: "Lithostratigraphy",
          value: "lithostratigraphy__stratigraphy_en"
        },
        {
          text: "Stratigraphy",
          value: "stratigraphy__stratigraphy_en"
        },
        { text: "rock", value: "rock" }
      ],

      specimen_headers: [
        { text: "id", value: "id" },
        // { text: "date_collected_free", value: "date_collected_free" },
        { text: "Depth (m)", value: "depth" },
        { text: "Agent Collected", value: "agent_collected__agent" },
        { text: "Classification", value: "classification__class_en" },

        {
          text: "Lithostratigraphy",
          value: "lithostratigraphy__stratigraphy_en"
        },
        {
          text: "Stratigraphy",
          value: "stratigraphy__stratigraphy_en"
        },
        { text: "Specimen id", value: "specimen_id" },
        { text: "Coll name", value: "coll__name" }
      ]
    };
  },
  methods: {
    update_data(data_from_request) {
      this.page_data = data_from_request.results[0];
      this.related_data = data_from_request.related_data;
      this.item_photos = data_from_request.related_data.attachment.map(i =>
        Object.fromEntries(
          new Map([
            [
              "src",
              "https://files.geocollections.info/large/" +
                i.filename.substring(0, 2) +
                "/" +
                i.filename.substring(2, 4) +
                "/" +
                i.filename
            ]
          ])
        )
      );
      this.fetched = true;
    }
  },
  components: { Carousel, Table, LocationMap },
  beforeMount() {
    let queryString = `https://api.geocollections.info/locality/${this.$route.params.id}?fields=asustusyksus__asustusyksus,asustusyksus__asustusyksus_en,coord_det_agent__agent,coord_det_method__value,coord_det_method__value_en,coord_det_precision__value,coord_system,coordx,coordy,country__iso_code,country__value,country__value_en,date_added,date_changed,depth,eelis,elevation,id,latitude,locality,locality_en,localityreference__reference__reference,localitystratigraphy__stratigraphy__stratigraphy,localitystratigraphy__stratigraphy__stratigraphy_en,longitude,maaamet_pa_id,maakond__maakond,maakond__maakond_en,number,parent__locality,remarks,remarks_location,stratigraphy_base__stratigraphy,stratigraphy_base__stratigraphy_en,stratigraphy_base_free,stratigraphy_base_id,stratigraphy_top__stratigraphy,stratigraphy_top__stratigraphy_en,stratigraphy_top_free,stratigraphy_top_id,type__value,type__value_en,user_added,vald__vald,vald__vald_en&paginate_by=1&related_data=attachment&related_data=attachment_link&related_data=drillcore&related_data=locality_reference&related_data=locality_synonym&related_data=sample&related_data=specimen&related_data=stratigraphy_stratotype`;
    fetch(queryString)
      .then(response => response.json())
      .then(json => this.update_data(json));
  },
  mounted() {}
};
</script>
