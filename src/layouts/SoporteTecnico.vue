<script>
  import * as SoporteFunc from '@/helpers/SoporteTecnicoFunc';
  import * as GlobalFunc from '@/helpers/GlobalFunc';

  import { ref, onMounted, defineAsyncComponent } from 'vue'
  import { useStore } from 'vuex';
  import { buttonSound } from '@/utils/Hardware';


  export default {
    components: {
      LoadCuy: defineAsyncComponent(() => import('@/components/indicadores/LoadCuy.vue')),
    },
    setup() {
      const store = useStore();
      const vTextArea = ref('');
      const cMaxLength = ref(500);
      const userProvider = ref(null);
      const loadingLocal = ref(false);
      const snackbar = ref({
        status: false,
        message: "",
        color: "success",
        multiLine: true,
        timeout: 5000
      });

      const onSend = async () => {
        buttonSound();
        //console.log("onSend");
        if (vTextArea.value.length > 0) {
          loadingLocal.value = true;
          const { message, status } = await SoporteFunc.sendConsulta(store, { message: vTextArea.value, usr: userProvider.value.id, fullName: userProvider.value.fullName })
          vTextArea.value = '';
          loadingLocal.value = false;
          snackbar.value.status = true;
          snackbar.value.color = status ? "success" : "red";
          snackbar.value.message = message;
        } else {
          snackbar.value.status = true;
          snackbar.value.color = "red";
          snackbar.value.message = "Por favor, ingrese algún comentario o sugerencia";
        }

      }

      onMounted(async () => {
        console.log("Soporte Téctino")
        const { state, userProv } = await GlobalFunc.userProviderToVuex(store);
        if (state) {
          userProvider.value = userProv;
        }
      })

      return {
        vTextArea,
        cMaxLength,
        userProvider,
        snackbar,
        loadingLocal,

        store,
        onSend,
      }
    },
  }
</script>

<template>

  <div v-if="!loadingLocal" class="modal-contenedor-grabar">
    <section class="botones">
      <div class="titulo">
        Escribanos una consulta o inconveniente
      </div>
    </section>

    <section class="cuerpo-modal-grabar">
      <div class="contenedor-dato">
        <div class="contenido">
          <textarea class="textarea" :maxlength="cMaxLength" v-model="vTextArea"></textarea>
          <div class="contador">{{ vTextArea.length }}/<strong>{{ cMaxLength }}</strong></div>
        </div>
      </div>

    </section>
    <section class="footer-modal-grabar">
      <button @click="onSend">Enviar</button>
    </section>
  </div>
  <div v-else class="cui--loading">
    <LoadCuy></LoadCuy>
  </div>



  <v-snackbar v-model="snackbar.status" :multi-line="snackbar.multiLine" :timeout="snackbar.timeout"
    :color="snackbar.color">
    {{ snackbar.message }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="snackbar.status = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>

</template>





<style lang='css' scoped>

  .cui--loading {
    height: 100vh;
  }


  .botones {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    height: 45px;
    background-color: rgb(242, 242, 242);
    padding-inline: 5px;

  }

  .botones span {
    display: flex;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
  }

  .botones span:hover {
    background-color: rgb(202, 202, 202);
  }

  .botones .titulo {
    width: 100%;
    text-align: center;
    font-weight: 900;
    color: rgb(80, 80, 80);
  }


  .footer-modal-grabar {
    height: 50px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    padding-inline: 16px;
  }

  .footer-modal-grabar button {
    border-style: none;
    width: 105px;
    height: 40px;
    border-radius: 5px;
    background-color: #1B66C9;
    color: white;
    font-weight: bold;
    font-size: 15px;
  }

  .cuerpo-modal-grabar {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: auto;
    padding: 10px 16px;
  }


  .contenedor-dato {
    /* border: 1px solid blue; */
    /* box-sizing: border-box; */
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;
    overflow: hidden;
    line-height: 30px;
    padding: 5px;
  }

  .contenedor-dato .icono {
    width: 30px;
    height: 100%;
    margin: 10px;
  }

  .contenido {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .contenido .title {
    font-size: 14px;
    font-weight: 700;
    color: rgb(90, 90, 90);
  }

  textarea {
    outline: none;
    border-style: none;
    padding: 0.5em;
    background-color: rgb(240, 240, 240);
    border-radius: 5px;
    height: 200px;
    resize: none;
    border: 1px solid #e7e6e6;
  }

  textarea:focus {
    border-color: #a8c0e2;
    box-shadow: 0 0 0 0.25rem rgba(29, 104, 207, 0.25);
  }

  .icono span {
    color: rgb(128, 128, 128);
  }

  .contador {
    text-align: end;
  }

  .contador strong {
    font-weight: 700;
    color: rgb(86, 86, 86);
  }

  .form-select {
    font-size: 14px;
  }


  .no-editable {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .no-editable .contenedor-dato {
    width: 50%;
  }

  .contenido h5 {
    font-size: 14px;
  }

  .divisor {
    width: 100%;
    height: 1.5px;
    border-radius: 10px;
    background-color: rgb(220, 220, 220);
  }


  @media (max-width: 700px) {
    textarea {
      outline: none;
      border-style: none;
      padding: 0.5em;
      background-color: rgb(240, 240, 240);
      border-radius: 5px;
      height: 500px;
      resize: none;
      border: 1px solid #e7e6e6;
    }
  }

</style>