<template>
  <v-navigation-drawer v-model="menu" app>
    <div class="wrapper-image">
      <router-link :to="redirectHome">
        <img src="../assets/logo.jpg" alt="icon" />
      </router-link>
    </div>

    <template>
      <v-list>
        <div>
          <v-list-item
            style="margin-top: 15px"
            v-for="item in menu"
            :key="item.title"
            @click="handleRedirect(item.url)"
          >
            <v-list-item-icon>
              <v-icon size="16">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["profile"],

  data() {
    return {
      drawer: true,
      menu: [
        {
          title: "Produtos",
          url: "/",
          icon: "fa-list",
        },
        {
          title: "Novo produto",
          url: "/product/new",
          icon: "fa-plus",
        },
        {
          title: "Buscar produto",
          url: "/product/search",
          icon: "fa-search",
        },
        {
          title: "Calcular frete",
          url: "/product/shipping",
          icon: "fa-shipping-fast",
        },
      ],
    };
  },

  computed: {
    redirectHome() {
      return "/";
    },
  },

  methods: {
    handleRedirect(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style>
.fa-chevron-down {
  font-size: 13px !important;
}

.v-list-group {
  margin-top: 20px;
}

.v-list-item__icon > .v-icon {
  font-size: 18px !important;
}
</style>
