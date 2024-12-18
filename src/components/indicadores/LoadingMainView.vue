<template>
  <div v-if="isLoading" class="loading-indicator">
    <LoadingView></LoadingView>
  </div>

  <div v-else-if="isSuccess" class="loading-indicator">
    <SuccessView></SuccessView>
  </div>

  <div v-else-if="isError" class="loading-indicator">
    <ErrorView></ErrorView>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'indicador-layout',
  components: {
    SuccessView: defineAsyncComponent(() => import('@/components/indicadores/SuccessView.vue')),
    ErrorView: defineAsyncComponent(() => import('@/components/indicadores/ErrorView.vue')),
    LoadingView: defineAsyncComponent(() => import('@/components/indicadores/LoadingView.vue')),
  },
  data() {
    return {
      isLoading: false,
      isSuccess: false,
      isError: false,
    };
  },
  props: {
    callback: Function, // Propiedad para recibir la función de retorno de llamada
  },
  mounted() {
    // Inicia automáticamente el proceso al montar el componente
    this.realizarPeticion();
  },

  methods: {
    async realizarPeticion() {
      this.isLoading = true;
      await this.sleep(60000);
      console.log({isLoading:this.isLoading,isSuccess:this.isSuccess,isError:this.isError})
      try {
        // Realizar tu petición asíncrona aquí
        await this.callback();
        // La petición fue exitosa
        this.isSuccess = true;
      } catch (error) {
        // Hubo un error en la petición
        this.isError = true;
      } finally {
        // Independientemente del resultado, la carga ha terminado
        this.isLoading = false;
      }
    },

    /* async miPeticionAsync() {
      // Simular una petición asíncrona (reemplaza con tu lógica real)
      return new Promise((resolve, reject) => {
        console.log(reject)
        setTimeout(() => {
          // Supongamos que la petición es exitosa después de 2 segundos
          resolve();
          // Si hubo un error, puedes llamar a reject() en lugar de resolve()
        }, 2000);
      });
    }, */
    async sleep(ms) {
      return await new Promise(resolve => setTimeout(resolve, ms));
    },
  },
};
</script>
<!-- <script>
import { mapActions, mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'indicador-layout',
  components: {
    SuccessView: defineAsyncComponent(() => import('@/components/indicadores/SuccessView.vue')),
    ErrorView: defineAsyncComponent(() => import('@/components/indicadores/ErrorView.vue')),
    LoadingView: defineAsyncComponent(() => import('@/components/indicadores/LoadingView.vue')),
  },
  props: {
    props: {
      callback: Function, // Propiedad para recibir la función de retorno de llamada
    },
  },
  computed: {
    isLoading() {
      return this.getEstado().loading;
    },
    isSuccess() {
      return this.getEstado().success;
    },
    isError() {
      return this.getEstado().error;
    },
  },
  mounted() {
    this.initializeState();
  },
  methods: {
    ...mapActions('programacionModule', ['deleteEntry', 'setIsLoading']),
    ...mapGetters('programacionModule', ['getEstado']),
    async onPressCrear() {
      // Tu lógica aquí
    },
    async sleep(ms) {
      return await new Promise(resolve => setTimeout(resolve, ms));
    },
    async initializeState() {
      console.log("created");
      console.log(this.getEstado());
      this.setIsLoading({ loading: true, success: false, error: false });
      console.log(this.getEstado());
      await this.sleep(3000);
      this.setIsLoading({ loading: false, success: true, error: false });
    },
    invokeCallback() {
      if (typeof this.callback === "function") {
        this.callback();
      }
    },
  },
}
</script> -->
<style lang="scss" scoped></style>
