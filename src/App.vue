<template>
  <div class="app">
    <transition name="slide" mode="out-in">
      <div v-show="isLoading == 1">
        <LoadingPage :text="textLoading" key="loading-page" />
      </div>
    </transition>
    <!-- <transition name="slide" mode="out-in">
      <div v-show="isLoading == 2">
        <LoadingErrorPage :text="textLoading" key="loading-page" />
      </div>
    </transition> -->
    <div v-show="isLoading == 3">
      <router-view />
    </div>
  </div>


  <v-snackbar v-model="snackbar.status" :multi-line="snackbar.multiLine" :timeout="snackbar.timeout"
    :color="snackbar.color">
    {{ snackbar.message }}
    <template v-slot:actions>
      <v-btn :style="{ backgroundColor: snackbar.buttonColor }" :color="snackbar.color" variant="text"
        @click="snackbar.status = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>

</template>



<script>
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  import { onMounted, onUnmounted, computed } from "vue";
  import { isAuthenticated } from "@/helpers/SecurityFunc";
  import LoadingPage from "@/views/loading/LoadingPage.vue";
  import { logOut } from "@/helpers/LoginFunctions";

  export default {
    name: "app-main",
    components: {
      LoadingPage,
    },
    setup() {
      const router = useRouter();
      const store = useStore();

      let inactivityTimeout;

      const resetInactivityTimeout = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
          if (isAuthenticated()) {
            logOut(store, router);
            console.log("logOut por inactividad");
          }
        }, 30 * 60 * 1000);
        //}, 0.25 * 60 * 1000);
      };

      const handleActivity = () => {
        resetInactivityTimeout();
      };

      const isLoading = computed(() => store.getters["appModule/isLoading"]);
      const textLoading = computed(() => store.getters["appModule/data"]);
      const snackbar = computed(() => store.getters["appModule/snackbar"]);


      onMounted(() => {
        resetInactivityTimeout();
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);
        window.addEventListener("click", handleActivity);
      });

      onUnmounted(() => {
        clearTimeout(inactivityTimeout);
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keydown", handleActivity);
        window.removeEventListener("click", handleActivity);
      });

      const onLogOut = () => {
        window.onpopstate = function () {
          history.go(1);
        };
      };

      return {
        isLoading,
        textLoading,
        snackbar,
      };
    },
  };
</script>

<style>

  .slide-enter-active,
  .slide-leave-active {
    position: absolute;
    width: 100%;
    transition: transform 1s ease-in-out;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(-100%);
    width: 100%;
    background-color: white;
    z-index: 10000;
  }

  .fc .fc-toolbar-title {
    font-size: 20px;
    text-transform: uppercase;
    margin: 0px;
  }

  .fc .fc-col-header-cell-cushion,
  .fc .fc-daygrid-day-number {
    text-decoration: none;
    color: var(--color-primary);
  }

  .fc .fc-col-header-cell-cushion {
    text-transform: capitalize;
  }

  .fc-direction-ltr .fc-toolbar>*> :not(:first-child),
  .fc-direction-ltr .fc-button-group>.fc-button:not(:last-child),
  .fc-direction-ltr .fc-button-group>.fc-button:not(:first-child) {
    border-color: var(--color-primary);
    background: var(--color-primary);
  }

  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:not(:disabled):active {
    background: #2c3e50;
  }

  /* .column-container .full-calendar a {
  text-decoration: none !important;
  color: var(--warning) !important;
}

.column-container .full-calendar button {
  text-decoration: none !important;
  color: white !important;
  background-color: #F2B749;
  border-color: white;
}

.column-container .full-calendar button:hover {
  color: white !important;
  background-color: #bd974f;
}

.column-container .full-calendar button::after {
  color: white !important;
  background-color: red;
}

.inpE6 .ipt .dp__input {
  border: 1px solid #ffffff;
}

.custom-container {
  height: 100vh;
}
 */
</style>