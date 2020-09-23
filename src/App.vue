<template>
  <v-app id="inspire">
    <transition name="slide-fade">
      <component v-bind:is="layout"></component>
    </transition>
  </v-app>
</template>

<script>
import Main from "./pages/_Layouts/Main";

export default {
  name: "App",

  components: {
    "main-layout": Main,
  },

  computed: {
    layout() {
      return "main-layout";
    },
  },
};
</script>

<style>
#inspire {
  background-color: #fafafa;
}
.person-name {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.person-name p {
  margin-top: 15px;
}

.wrapper-image {
  padding: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.wrapper-image img {
  width: 120px;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
