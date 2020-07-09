<template>
  <div style="max-width:900px;">
    <v-carousel height="auto">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  props: ["images"],
  data() {
    return {
      items: this.$props.images
    };
  }
};
</script>
