<template>
  <div class="container">
    <ModalResetPass></ModalResetPass>
  </div>
</template>

<script>
  /* eslint-disable */
  import { ref, onMounted, defineAsyncComponent } from 'vue'

  export default {
    name: 'test-component',
    components: {
      ModalResetPass: defineAsyncComponent(() => import('@/components/modals/ModalResetPass.vue')),
    },
    data() {
      return {
        images: [
          { src: require("../assets/flyers/adherencia/imagen1.jpg") },
          { src: require("../assets/flyers/adherencia/imagen2.jpg") },
          { src: require("../assets/flyers/adherencia/imagen3.jpg") },
        ]
      };
    },
    mounted() {
      console.log("TEST PAGE")
  
    },
    methods: {
    }
  };
</script>

<style scoped>

  .container {
    max-width: 700px;
    width: 95%;
    overflow: hidden;
    /* Evita que las imágenes desborden horizontalmente */
  }

  .slider-wrapper {
    display: flex;
    align-items: center;
  }

  .image-container {
    display: flex;
    overflow-x: auto;
    /* Permite el desplazamiento horizontal */
    scroll-snap-type: x mandatory;
    /* Se asegura de que cada imagen se desplaza completamente en lugar de quedarse a medias */
  }

  .image-item {
    flex: 0 0 auto;
    /* Evita que las imágenes se ajusten automáticamente */
    width: 100%;
    /* Cada imagen ocupa el ancho completo del contenedor */
    scroll-snap-align: start;
    /* Alinea el comienzo de cada imagen con el comienzo del contenedor */
  }

  .slider-wrapper .slide-button {
    position: absolute;
    top: 50%;
    outline: none;
    border: none;
    height: 50px;
    width: 50px;
    z-index: 5;
    color: #fff;
    display: flex;
    cursor: pointer;
    font-size: 2.2rem;
    background: #000;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transform: translateY(-50%);
  }

  .slider-wrapper .slide-button:hover {
    background: #404040;
  }

  .slider-wrapper .slide-button#prev-slide {
    left: -0px;
    /* display: none; */
  }

  .slider-wrapper .slide-button#next-slide {
    right: -0px;
  }

  .slider-wrapper .image-list {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 18px;
    font-size: 0;
    list-style: none;
    margin-bottom: 30px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .slider-wrapper .image-list::-webkit-scrollbar {
    display: none;
  }

  .slider-wrapper .image-list .image-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .container .slider-scrollbar {
    height: 24px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .slider-scrollbar .scrollbar-track {
    background: #ccc;
    width: 100%;
    height: 2px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    position: relative;
  }

  .slider-scrollbar:hover .scrollbar-track {
    height: 4px;
  }

  .slider-scrollbar .scrollbar-thumb {
    position: absolute;
    background: #000;
    top: 0;
    bottom: 0;
    width: 50%;
    height: 100%;
    cursor: grab;
    border-radius: inherit;
  }

  .slider-scrollbar .scrollbar-thumb:active {
    cursor: grabbing;
    height: 8px;
    top: -2px;
  }

  .slider-scrollbar .scrollbar-thumb::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -10px;
    bottom: -10px;
  }

  @media only screen and (max-width: 1023px) {

    .slider-wrapper .image-list {
      gap: 10px;
      margin-bottom: 15px;
      scroll-snap-type: x mandatory;
    }

    .slider-wrapper .image-list .image-item {
      width: 100%;
      height: 100%;
    }

    .slider-scrollbar .scrollbar-thumb {
      width: 20%;
    }
  }
</style>