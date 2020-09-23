<template>
  <v-row>
    <SnackAlert :active="this.showAlert" :text="this.messageSnackBar" />
    <v-col cols="12" xs="12" md="12" lg="12">
      <v-breadcrumbs :items="breadCumbs"></v-breadcrumbs>
    </v-col>

    <v-col xs="12" md="12" lg="12">
      <v-card class="content-card">
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="8" sm="8" lg="8">
                <v-text-field
                  outlined
                  v-model="name"
                  label="Nome do produto"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="2" sm="2" lg="2">
                <v-text-field
                  outlined
                  v-model="id"
                  label="ID do produto"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="2" sm="2" lg="2">
                <v-btn
                  class="ma-2"
                  :loading="loading"
                  :disabled="loading"
                  color="primary"
                  @click="handleSubmit"
                >
                  Buscar
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>

          <v-row class="container">
            <v-col cols="12">
              <v-card class="content-card" v-if="this.products.length > 0">
                <v-data-table
                  class="m-table"
                  :headers="headers"
                  :items="products"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn
                      text
                      icon
                      color="green"
                      x-small
                      @click="handleEdit(item)"
                    >
                      <v-icon>fa-edit</v-icon>
                    </v-btn>
                    <v-btn
                      text
                      icon
                      color="red"
                      x-small
                      @click="handleDelete(item)"
                    >
                      <v-icon>fa-trash</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from "../../services/api";
import SnackAlert from "../../components/SnackAlert";

export default {
  components: {
    SnackAlert,
  },

  data() {
    return {
      loading: false,
      valid: false,
      showAlert: false,
      messageSnackBar: "",

      name: "",
      id: "",
      products: [],

      breadCumbs: [
        {
          text: "Lista de produtos",
          disabled: false,
          href: "/",
        },

        {
          text: "Buscar produto",
          disabled: true,
          href: "",
        },
      ],

      headers: [
        { text: "#", value: "id" },
        { text: "SKU", value: "sku" },
        { text: "Nome", value: "name" },
        { text: "Preço", value: "price" },
        { text: "Ações", value: "actions" },
      ],
    };
  },

  methods: {
    async handleSubmit() {
      this.showAlert = false;
      this.messageSnackBar = "";
      if (!this.$refs.form.validate()) {
        this.showAlert = true;
        this.messageSnackBar = "Formulário preenchido incorretamente";
        return;
      }
      this.loading = true;

      try {
        const res = await api.get(`/products/search`, {
          params: {
            id: this.id,
            name: this.name,
          },
        });

        this.products = res.data;
        if (this.products.length <= 0) {
          return (this.messageSnackBar = "Nenhum produto encontrado...");
        }

        this.messageSnackBar = "Produtos encontrados!";
      } catch (e) {
        this.messageSnackBar = "Tente buscar novamente mais tarde...";
        this.response = null;
        console.log(e);
      } finally {
        this.showAlert = true;
        this.loading = false;
      }
    },
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>