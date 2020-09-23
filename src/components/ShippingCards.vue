<template>
  <v-row v-if="services">
    <v-col xs="12">
      <v-card class="content-card" height="250">
        <div class="container-icon">
          <v-icon size="70" color="#ff8514">fa-dolly</v-icon>
        </div>

        <v-card-subtitle class="text-center number">
          <p>R$ {{ services.ValorSemAdicionais }}</p>
        </v-card-subtitle>

        <v-card-text class="text--primary text-center">
          <div>Valor do frete</div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col xs="12">
      <v-card class="content-card" height="250">
        <div class="container-icon">
          <v-icon size="70" color="#19AE67">fa-exclamation-triangle</v-icon>
        </div>

        <v-card-subtitle class="text-center number">
          <p>R$ {{ services.ValorAvisoRecebimento }}</p>
        </v-card-subtitle>

        <v-card-text class="text--primary text-center">
          <div>Valor do aviso de recebimento</div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col xs="12">
      <v-card class="content-card" height="250">
        <div class="container-icon">
          <v-icon size="70" color="#5e35bc">fa-handshake</v-icon>
        </div>

        <v-card-subtitle class="text-center number">
          <p>R$ {{ services.ValorMaoPropria }}</p>
        </v-card-subtitle>

        <v-card-text class="text--primary text-center">
          <div>Valor de mão própria</div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col xs="12">
      <v-card class="content-card" height="250">
        <div class="container-icon">
          <v-icon size="70" color="#D46554">fa-money-bill-wave</v-icon>
        </div>

        <v-card-subtitle class="text-center number">
          <p>R$ {{ services.Valor }}</p>
        </v-card-subtitle>

        <v-card-text class="text--primary text-center">
          <div>Total do frete</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["services"],
};
</script>

<style scoped>
.container-icon {
  display: flex;
  justify-content: center;
  margin-top: 9px;
  padding: 10px;
}

.number {
  font-size: 30px;
}

.content-card {
  padding: 20px;
}
</style>
