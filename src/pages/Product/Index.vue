<template>
  <v-row>
    <SnackAlert :active="this.showAlert" :text="this.messageSnackBar" />

    <v-col cols="12" xs="12" md="12" lg="12">
      <div class="row container">
        <CardNew
          title="Adicionar novo"
          description="Adicionar novo produto"
          path="/product/new"
          icon="fa fa-plus"
        />
      </div>

      <v-row class="container">
        <v-col cols="12">
          <v-card class="content-card" v-if="this.products.length > 0">
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              class="m-table"
              :headers="headers"
              :items="products"
              :search="search"
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
    </v-col>
  </v-row>
</template>

<script>
import api from "../../services/api";
import CardNew from "../../components/CardNew.vue";
import SnackAlert from "../../components/SnackAlert";

export default {
  components: {
    CardNew,
    SnackAlert,
  },

  data() {
    return {
      messageSnackBar: "",
      showAlert: false,
      deleted: false,
      search: "",
      products: [],
      headers: [
        { text: "#", value: "id" },
        { text: "SKU", value: "sku" },
        { text: "Nome", value: "name" },
        { text: "Preço", value: "price" },
        { text: "Ações", value: "actions" },
      ],
    };
  },

  async mounted() {
    try {
      const response = await api.get("/products");

      this.products = response.data;
    } catch (e) {
      this.messageSnackBar = "Tente carregar novamente mais tarde...";
      this.showAlert = true;
    }
  },

  methods: {
    async handleEdit(item) {
      this.$router.push(`/product/${item.id}/edit`);
    },

    handleDelete(item) {
      this.$swal({
        showClass: {
          popup: "animated fadeInDown faster",
        },

        icon: "question",
        text: "Você realmente deseja excluir?",
        confirmButtonText: "Sim, vou excluir",

        preConfirm: async () => {
          try {
            await api.delete(`/products/${item.id}`);

            const products = this.products.filter(
              (product) => product.id !== item.id
            );

            this.products = products;

            this.deleted = true;

            setTimeout(() => {
              this.deleted = false;
            }, 2000);
          } catch (e) {
            this.messageSnackBar = "Tente deletar novamente mais tarde...";
            this.showAlert = true;
          }
        },
      });
    },
  },
};
</script>
