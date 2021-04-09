<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <div class="d-flex align-center">
        <h1>TwiStory</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2 white--text font-weight-bold">シェア</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-tabs fixed-tabs background-color="blue darken-3" dark>
        <v-tab>
          <router-link
            to="/"
            class="text-decoration-none white--text font-weight-bold"
          >
            注目の作品
          </router-link>
        </v-tab>
        <v-tab>
          <router-link
            to="/complete"
            class="text-decoration-none white--text font-weight-bold"
          >
            完結した作品
          </router-link>
        </v-tab>
      </v-tabs>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
