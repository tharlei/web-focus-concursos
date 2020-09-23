<template>
  <v-row>
    <SnackAlert :active="this.showAlert" :text="this.messageSnackBar" />
    <v-col cols="12" xs="12" md="12" lg="12">
      <v-breadcrumbs :items="breadCumbs"></v-breadcrumbs>
    </v-col>

    <v-col xs="12" md="12" lg="12">
      <v-card class="content-card">
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" lg="12">
                <v-text-field
                  :rules="[(v) => !!v || 'Você deve informar um nome']"
                  outlined
                  v-model="product.name"
                  label="Nome do produto"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" sm="6" lg="6">
                <v-text-field
                  :rules="[(v) => !!v || 'Você deve informar um peso em kg']"
                  outlined
                  v-model="product.weight"
                  label="Peso (kg)"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6" lg="6">
                <v-text-field
                  :rules="[
                    (v) => !!v || 'Você deve informar um comprimento em cm',
                  ]"
                  outlined
                  v-model="product.length"
                  label="Comprimento (cm)"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" sm="6" lg="6">
                <v-text-field
                  :rules="[(v) => !!v || 'Você deve informar uma altura em cm']"
                  outlined
                  v-model="product.height"
                  label="Altura (cm)"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6" lg="6">
                <v-text-field
                  :rules="[
                    (v) => !!v || 'Você deve informar uma largura em cm',
                  ]"
                  outlined
                  v-model="product.width"
                  label="Largura (cm)"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" sm="6" lg="6">
                <v-text-field
                  :rules="[(v) => !!v || 'Você deve informar um código único']"
                  outlined
                  v-model="product.sku"
                  label="SKU"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6" lg="6">
                <v-text-field
                  :rules="[(v) => !!v || 'Você deve informar um preço em R$']"
                  outlined
                  v-model="product.price"
                  label="Preço (R$)"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn
                  class="ma-2"
                  :loading="loading"
                  :disabled="loading"
                  color="primary"
                  @click="handleSubmit"
                >
                  Salvar
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from "../../services/api";
import SnackAlert from "../../components/SnackAlert";

export default {
  props: ["id"],

  components: {
    SnackAlert,
  },

  data() {
    return {
      loading: false,
      valid: false,
      showAlert: false,
      messageSnackBar: "",

      product: {},

      breadCumbs: [
        {
          text: "Lista de produtos",
          disabled: false,
          href: "/",
        },

        {
          text: "Editar produto",
          disabled: true,
          href: "",
        },
      ],
    };
  },

  async mounted() {
    const response = await api.get(`/products/${this.id}`);
    this.product = response.data;
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
        await api.put(`/products/${this.id}`, this.product);

        this.messageSnackBar = "Editado com sucesso!";
      } catch (e) {
        this.messageSnackBar = "Tente editar novamente mais tarde...";
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
