<template>
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" class="page-login">
    <div class="loginBox">
      <div class="icono">
        <img src="@/assets/logo.png" width="200" />
      </div>
      <div class="titulo--plataforma">
        <p>PLATAFORMA</p>
        <h1>NUNA SUMAQ</h1>
      </div>

      <div class="formulario">
        <form class="">
          <div class="form-floating mb-3">
            <input type="text" class="form-control rounded-3" id="floatingUsername" placeholder="Username"
              v-model="email" required autocomplete="username" />
            <label for="floatingInput">DNI del usuario...</label>
          </div>

          <div class="form-floating mb-3 mt-4">
            <input :type="showPassword ? 'text' : 'password'" class="form-control rounded-3" id="floatingPassword"
              v-model="password" placeholder="Password" maxlength="15" required autocomplete="current-password" />

            <label for="floatingPassword">Contraseña...</label>
          </div>

          <label class="cont-check">
            <input checked="checked" type="checkbox" v-model="showPassword" />
            <div class="checkmark"></div>
            <span>Mostar Contraseña</span>
          </label>

          <button class="boton" type="button" @click="navegar">
            Iniciar Sesión
          </button>
          <hr class="my-4 text-white" />
          <!--  <button class="boton" type="button" @click="onChange">Cambio</button> -->

          <div class="text-link reset" @click="onReset">
            <a class="a--link">¿Ha olvidado la contraseña?</a>
          </div>

          <div class="text-link">
            <router-link to="/crear-cuenta" class="nav-link">Crear cuenta</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="contenedor-popup" :class="{ 'open-popup': statusModalResetPass }">
    <ModalResetPass class="modal-visor-programacion" @sendEmail="sendEmail" @closeModalReset="closeModalReset">
    </ModalResetPass>
  </div>

  <div v-if="loadingData.status === true">
    <LoadingOverlay :loading="loadingData" />
  </div>
  <div v-else>
    <div v-if="apiResponse.status === true">
      <SuccessView :reponse="apiResponse" />
    </div>
    <div v-if="apiResponse.status === false">
      <ErrorView :reponse="apiResponse" @cerrar-indicador="hadlerCloseIndicator" />
    </div>
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

<script lang="js">
  import { defineAsyncComponent, reactive, ref, onMounted } from 'vue'
  import { mapActions, mapGetters } from 'vuex'
  import { login } from '@/helpers/LoginFunctions';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { initializeVisitedSections } from '@/helpers/TesisFunctions';
  import { adjustHeightForPcandMobile, buttonSound } from '@/utils/Hardware';
  import { shellLoadingWhileExecution, setSnackbarState } from "@/helpers/UserFlow";

  export default {
    name: 'login-layout',
    setup() {
      const router = useRouter();
      const store = useStore();


      const snackbar = reactive({
        status: false,
        message: "",
        color: "success",
        multiLine: true,
        timeout: 5000
      });

      const email = ref('');
      const password = ref('');

      const loadingData = reactive({
        status: false,
        title: "Autenticando usuario..."
      });

      const apiResponse = reactive({
        status: null,
        title: "Autenticando usuario..."
      })

      const navegar = async () => {
        buttonSound()
        loadingData.status = true;
        loadingData.title = "Autenticando usuario...";
        const { status, data, message, token } = await login(store, { dni: email.value, password: password.value });
        //console.log("login: ", { status, data, message, token });
        if (status) {
          initializeVisitedSections(store)
          router.push('/menu-main');
        } else {
          Object.assign(apiResponse, { status, data, message, title: '¡ OoPs !', btnText: 'Cerrar', navTo: '' });
        }
        loadingData.status = false;
      }


      const onChange = async () => {
        router.push('/change-password');
      }

      onMounted(() => {
        adjustHeightForPcandMobile()
      });


      const startY = ref(0);
      const touching = ref(false);

      const onTouchStart = (e) => {
        if (window.scrollY === 0) {
          startY.value = e.touches[0].clientY;
          touching.value = true;
        }
      };

      const onTouchMove = (e) => {
        if (touching.value && e.touches[0].clientY - startY.value > 50) {
          //console.log('Refresh action here');
          window.location.reload(true);
        }
      };

      const onTouchEnd = () => {
        touching.value = false;
      };

      return {
        snackbar,
        navegar,
        loadingData,
        apiResponse,
        email,
        password,

        adjustHeightForPcandMobile,

        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onChange,
      }
    },
    data() {
      return {
        showPassword: false,
        statusModalResetPass: false,
      };
    },
    /* mounted() {
        console.log("Login Page")
        localStorage.setItem('user', JSON.stringify(null));
        localStorage.setItem('entries', JSON.stringify(null));
    }, */
    components: {
      LoadingOverlay: defineAsyncComponent(() => import('@/components/indicadores/LoadingOverlay.vue')),
      SuccessView: defineAsyncComponent(() => import('@/components/indicadores/SuccessView.vue')),
      ErrorView: defineAsyncComponent(() => import('@/components/indicadores/ErrorView.vue')),
      ModalResetPass: defineAsyncComponent(() => import('@/components/modals/ModalResetPass.vue')),
    },
    methods: {
      ...mapActions('programacionModule', ['deleteEntry', 'setIsLoading', 'getUserByEmail']),
      ...mapActions('authModule', ['resetAccount']),
      ...mapGetters('programacionModule', ['getEstado', 'getUser', 'getStatte']),
      async sleep(ms) {
        return await new Promise(resolve => setTimeout(resolve, ms));
      },
      onReset() {
        this.statusModalResetPass = true;
      },
      async sendEmail(val) {
        const { validateForm, output } = val
        if (validateForm) {
          this.statusModalResetPass = false;
          this.loadingData.status = true;
          this.loadingData.title = "Por favor, revice su email para continuar con el cambio de contraseña...";
          await shellLoadingWhileExecution(
            this.$store,
            async () => {
              const { status, message } = await this.resetAccount(output);

              setSnackbarState(this.$store, {
                status: true,
                message: message,
                color: status ? "success" : "red",
                buttonColor: "white",
              })
            },
            { title: "Generando proceso para cambio de contraseña" }
          );

        } else {
          setSnackbarState(this.$store, {
            status: true,
            message: 'Por favor, ingrese un email válido',
            color: "red",
            buttonColor: "white",
            timeout: 10000
          })
        }

        this.loadingData.status = false;
      },
      closeModalReset() {
        this.statusModalResetPass = false;
      },
      hadlerCloseIndicator(value) {
        this.apiResponse.status = null;
      },
      async evChangePass(val) {
        this.statusModalResetPass = true;//activar modal
      },
    },

  }


</script>


<style lang="scss" scoped>
  $button-padding: 10px;
  $button-background: #4caf50;
  $color-blanco: #f8f9fa;
  $button-border-radius: 4px;
  $color-amarillo: #f2b749;
  $color-azul: #1b62bf;
  $color-azul-ligth: #62a1d9;
  $color-azul-intermedio: #616c8c;
  $color-placeholder: #4f4d4db5;
  $color-negro: #2c3e50;

  .titulo--plataforma h1 {
    font-family: "Merienda";
    color: #2c3e50;
    font-size: 40px;
    margin: 0;
  }

  .titulo--plataforma P {
    padding: 0;
    margin: 0;
    text-align: center;
    font-weight: bolder;
    color: grey;
  }

  .contenedor-popup {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.1);
    visibility: hidden;
  }

  .open-popup {
    visibility: visible !important;
    transform: translate(-50%, -50%) scale(1) !important;
    transition: transform 0.4s, top 0.4s;
    z-index: 1000;
    width: 100%;
  }

  .a--link {
    color: white;
  }

  .reset {
    cursor: pointer;
  }

  .formulario {
    width: 70%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .cont-check input {
    display: none;
  }

  .cont-check {
    //padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .cont-check span {
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 10px;
    font-size: 14px;
    color: white;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: relative;
    top: 0;
    left: 0;
    height: 1.3em;
    width: 1.3em;
    background-color: white;
    border-radius: 0.25em;
    transition: all 0.25s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* When the checkbox is checked, add a blue background */
  .cont-check input:checked~.checkmark {
    background-color: #2196f3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    transform: rotate(0deg);
    border: 0.1em solid white;
    left: 0;
    top: 0;
    width: 1.05em;
    height: 1.05em;
    border-radius: 0.25em;
    transition: all 0.25s, border-width 0.1s;
  }

  /* Show the checkmark when checked */
  .cont-check input:checked~.checkmark:after {
    left: 0.45em;
    top: 0.25em;
    width: 0.3em;
    height: 0.7em;
    border-color: #fff0 white white #fff0;
    border-width: 0 0.15em 0.15em 0;
    border-radius: 0em;
    transform: rotate(45deg);
  }

  .cabecera {
    margin-bottom: 10px;
  }

  .auth {
    /* margin: 10px; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loginBox {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #c5c4c47f;
    border: 2px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 25px;
  }

  .page-login {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    //border: 2px solid red;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //border: 1px solid blue;
    flex-wrap: wrap;
    background: url("@/assets/fondo/fondo9.png");
    background-size: cover;
    background-position: center;
  }

  .icono {
    background-color: rgba(255, 255, 255, 0.053);
    font-size: 50px;
    margin: 25px;
  }

  .pantalla {
    /* border: 2px solid red; */
    height: 100%;
    overflow: hidden;
  }

  .nav-link {
    transition: color 0.3s ease-in-out;
  }

  .contenedor-body {
    /* border: 2px solid blue; */
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .boton {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background-color: $color-negro;
    color: white;
  }

  i {
    padding: 10px;
    color: var(--light);
    font-size: 20px;
    transition: all 0.55s ease;

    &:hover {
      font-size: 30px;
    }
  }

  .creditos {
    display: flex;
    justify-content: center;
  }

  .text-link a {
    padding: 5px 0 5px 0;
    justify-content: center;
    display: flex;
    transition: all 0.55s ease;
    text-decoration: none;
    color: $color-blanco;
    font-size: 14px;
  }

  .text-link a:hover {
    transform: translateY(-10px);
    text-decoration: underline;
    font-size: 15px;
    color: white;
    text-decoration: none;
  }

  button {
    transition: all 0.55s ease;
  }

  button:hover {
    transform: translateY(-10px);
  }

  .cuerpo {
    flex: 1;
    /* indica que el segundo div debe tomar todo el espacio disponible */
    //background-color: blue;
  }

  .container {
    width: 100%;
    height: 100%;
    margin: 0;
    max-width: 1600px;
    /* agregue un ancho máximo para evitar que la cuadrícula exceda el ancho de la ventana del navegador */
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .column-left {
    display: flex;
    /* establacer display flex */
    justify-content: center;
    /* centrar horizontalmente */
    align-items: center;
    /* centrar verticalmente */
  }

  // Crear la clase base del botón
  .btnLogin {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    background-color: $color-azul-intermedio;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: $color-azul;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 5px #555;
    }

    &.secondary {
      background-color: #fff;
      color: #333;
      border: 1px solid #333;

      &:hover {
        background-color: #eee;
      }
    }

    &.large {
      padding: 15px 30px;
      font-size: 20px;
    }
  }

  .login {
    height: 500px;
    width: 300px;
    border-radius: 15px;
    background: $color-azul-ligth;
    display: flex;
    padding: 20px;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2),
      0 10px 20px 0 rgba(0, 0, 0, 0.19);

    .imgBx {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      margin-top: -130px;
      box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2),
        0 10px 20px 0 rgba(0, 0, 0, 0.19);

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .formBx {
      width: 100%;
      height: 80%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;

      h2 {
        font-size: 1.3em;
        color: #fff;
      }

      .inputBx {
        padding: 5px;
        margin: 5px 0;
        width: 70%;

        p {
          color: #fff;
        }

        input {
          padding: 10px;
          background: $color-blanco;
          width: 100%;
          border: none;
          margin: 5px 0;
          outline: none;
          border-radius: 5px;
          color: $color-negro;

          &::placeholder {
            color: $color-placeholder;
          }
        }
      }

      a {
        background: rgba(255, 255, 255, 0);
        color: $color-negro;
        padding: 5px 30px;
        border-radius: 5px;
        text-decoration: none;
        margin: 5px 0;
        transition: 0.5s;

        &:hover {
          letter-spacing: 2px;
          transform: translateY(-5px);
        }
      }
    }
  }

  .custom-center {
    text-align: center !important;
  }

  .responsive-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }

  .modal-dialog {
    width: 380px;
    height: 100%;
    transition: bottom 0.75s ease-in-out;
  }

  .modal-sheet .modal-footer {
    padding-bottom: 2rem;
  }

  .responsive-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* @media (max-width: 650) */
</style>
