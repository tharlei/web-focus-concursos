<template>
  <div class="row container">
    <div class="col-md-4 col-12">
      <div class="v-card v-card--outlined v-sheet theme--light">
        <router-link
          :to="this.path"
          class="v-list-item--doc v-list-item v-list-item--link theme--light primary--text"
          tabindex="0"
        >
          <div
            class="v-avatar v-list-item__avatar amber primary"
            style="height: 40px; min-width: 40px; width: 40px;"
          >
            <i
              style="font-size: 15px;"
              aria-hidden="true"
              :class="`v-icon notranslate ${this.icon} theme--dark`"
            ></i>
          </div>

          <div class="v-list-item__content">
            <div class="v-list-item__title">
              <span>{{ this.title }}</span>
            </div>
            <div class="v-list-item__subtitle">
              <span>{{ this.description }}</span>
            </div>
          </div>

          <div class="v-list-item__action">
            <i aria-hidden="true" class="v-icon notranslate mdi mdi-arrow-right theme--light"></i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "path", "icon"],
};
</script>

<style></style>
