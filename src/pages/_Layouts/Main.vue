<template>
  <div class="background">
    <Menu :profile="'get_profile'" />

    <v-app-bar app :color="$vuetify.theme.themes.light.primary" dark>
      <v-spacer />

      <v-btn icon>
        <v-icon color="#fff">fa-user-circle</v-icon>
      </v-btn>

      <div class="person-name">
        <p>Focus Concursos</p>
      </div>
    </v-app-bar>

    <v-content>
      <v-container fluid style="display:flex;">
        <v-row class="container">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Menu from "../../components/Menu";

export default {
  name: "Main",

  components: {
    Menu,
  },

  data() {
    return {
      items: [],
    };
  },
};
</script>

<style>
</style>
