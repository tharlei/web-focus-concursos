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
            <ShippingCards :services="response" />
            <v-row>
              <v-col xs="12" md="12" lg="12">
                <v-select
                  :rules="[(v) => !!v || 'Escolha um produtos']"
                  v-model="selectedProduct"
                  :items="products"
                  label="Produto escolhido"
                  required
                  outlined
                  item-text="name"
                  persistent-hint
                  single-line
                  return-object
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col xs="6" md="6" lg="6">
                <v-select
                  :rules="[(v) => !!v || 'Escolha um formato']"
                  v-model="selectedFormat"
                  :items="formats"
                  label="Formatos"
                  required
                  outlined
                  item-text="name"
                  persistent-hint
                  single-line
                  return-object
                />
              </v-col>

              <v-col xs="6" md="6" lg="6">
                <v-select
                  :rules="[(v) => !!v || 'Escolha um serviço']"
                  v-model="selectedService"
                  :items="services"
                  label="Serviços"
                  required
                  outlined
                  item-text="name"
                  persistent-hint
                  single-line
                  return-object
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" sm="6" lg="6">
                <v-text-field
                  :rules="[(v) => !!v || 'Você deve informar um CEP de origem']"
                  outlined
                  v-model="zipCodeSource"
                  label="Remetente (CEP)"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6" sm="6" lg="6">
                <v-text-field
                  :rules="[
                    (v) => !!v || 'Você deve informar um CEP de destino',
                  ]"
                  outlined
                  v-model="zipCodeDestiny"
                  label="Destinário (CEP)"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12">
                <v-divider />
                <section class="configs">
                  <p>Serviços adicionais</p>
                </section>

                <v-row>
                  <v-col cols="6" sm="6" md="4" lg="4">
                    <v-switch
                      v-model="serviceHands"
                      label="Entrega em mãos próprias"
                    />
                  </v-col>

                  <v-col cols="6" sm="6" md="4" lg="4">
                    <v-switch
                      v-model="serviceAlert"
                      label="Aviso de recebimento"
                    />
                  </v-col>
                </v-row>
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
                  Calcular
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
import ShippingCards from "../../components/ShippingCards";

export default {
  components: {
    SnackAlert,
    ShippingCards,
  },

  data() {
    return {
      loading: false,
      valid: false,
      showAlert: false,
      messageSnackBar: "",

      products: [],
      selectedProduct: null,

      services: [
        {
          id: "04014",
          name: "SEDEX à vista",
        },
        {
          id: "04510",
          name: "PAC à vista",
        },
        {
          id: "04782",
          name: "SEDEX 12 (à vista)",
        },
        {
          id: "04790",
          name: "SEDEX 10 (à vista)",
        },
        {
          id: "04804",
          name: "SEDEX à vista",
        },
      ],
      selectedService: null,

      formats: [
        {
          id: "1",
          name: "Formato caixa/pacote",
        },
        {
          id: "2",
          name: "Formato rolo/prisma",
        },
        {
          id: "3",
          name: "Envelope",
        },
      ],
      selectedFormat: null,

      zipCodeSource: "",
      zipCodeDestiny: "",
      serviceAlert: false,
      serviceHands: false,
      response: null,

      breadCumbs: [
        {
          text: "Lista de produtos",
          disabled: false,
          href: "/",
        },

        {
          text: "Calcular frete",
          disabled: true,
          href: "",
        },
      ],
    };
  },

  async mounted() {
    const response = await api.get(`/products`);
    this.products = response.data;
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
        const {
          zipCodeDestiny,
          zipCodeSource,
          serviceAlert,
          serviceHands,
          selectedService,
          selectedFormat,
        } = this;

        const res = await api.get(
          `/products/${this.selectedProduct.id}/shipping`,
          {
            params: {
              zipCodeDestiny,
              zipCodeSource,
              serviceAlert: serviceAlert ? "S" : "N",
              serviceHands: serviceHands ? "S" : "N",
              service: selectedService.id,
              format: selectedFormat.id,
            },
          }
        );

        if (res.data.error) {
          this.messageSnackBar = res.data.error;
          this.response = null;
          return;
        }

        this.response = res.data;

        this.messageSnackBar = "Calculado com sucesso!";
      } catch (e) {
        this.messageSnackBar = "Tente calcular novamente mais tarde...";
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