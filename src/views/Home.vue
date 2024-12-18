<template>
  <LoginPage></LoginPage>

</template>

<script>
  import LoginPage from '../layouts/LoginPage.vue';
  import { mapActions, mapGetters, mapMutations } from 'vuex'



  export default {
    name: 'home-view',
    components: {
      LoginPage,
    },
    data() {
      return {
        modalActive: true,
        windowWidth: window.innerWidth,
        popUp: true,
        playing: true,
        loading: true,
        contador: 0,
      }
    },
    computed: {
      youtubeWidth() {
        return this.windowWidth * 0.7;
      },
      youtubeHeight() {
        return this.windowWidth * 5 / 16;
      },
    },
    created() {

    },
    unmounted() {

    },
    methods: {
      ...mapActions('programacionModule', ['deleteEntry', 'setIsLoading']),
      ...mapGetters('programacionModule', ['getEstado', 'getCounter']),
      ...mapMutations('programacionModule', ['setCounter']),
      togglePopUp() {
        this.popUp = !this.popUp;
        console.log("pressed");
      },
      close() {
        console.log("Close");
        this.$refs.youtube.stopVideo();
        this.modalActive = false;
        this.setCounter(this.contador + 1);
      },
    },
  }
</script>


<style lang="scss" scoped>
  .aplication {

    background-color: yellow;
  }

  .container-video {
    margin: 10px;
  }

  .modal-animation-enter-active,
  .modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }


  .modal-animation-enter-from,
  .modal-animation-leave-to {
    opacity: 0;
  }

  .modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }

  .modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }



  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(229, 229, 229, 0.7);

    .modal-inner {
      position: relative;
      //max-width: 670px;
      //width: 80%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      background-color: #fff;
      padding: 64px 16px;

      i {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 30px;
        cursor: pointer;

        &:hover {
          color: crimson;
        }
      }

      button {
        padding: 20px 30px;
        border: none;
        font-size: 16px;
        background-color: crimson;
        color: #fff;
        cursor: pointer;
      }
    }
  }

  .modal-animation-inner-leave-to {
    transform: scale(0.8);
  }


  .custom-youtube {
    width: 900px !important;
    height: 700px !important;
  }

  /* .loading-indicator{
  background: var(--gradient-primary);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
} */


  /* iframe.custom-youtube {
  width: 900px !important;
  height: 700px !important;
} */
</style>