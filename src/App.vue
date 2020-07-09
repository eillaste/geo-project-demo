<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/geo/"
          ><img src="./assets/img/logo2.png" alt="Lamp" height="42"
        /></router-link>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <div>
        <h1>Geoscience collections of Estonia – Localities</h1>
        <p>
          <router-link to="/geo/">Search Form</router-link><br />
          <router-link to="/geo/favourites">Favourites</router-link><br />
          <router-link to="/geo/about">About</router-link><br />
        </p>
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({})
};
</script>
