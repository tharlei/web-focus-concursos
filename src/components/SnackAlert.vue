<template>
  <v-snackbar v-model="this.active" top right>{{ this.text }}</v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  props: ["text", "active"],
};
</script>

<style></style>
