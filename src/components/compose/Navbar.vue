<template>
  <nav class="navbar-container" aria-label="Second navbar example">
    <div class="superior">


      <div class="caja1">
        <button class="boton" v-if="estadoFlecha" @click="$emit('volver')">
          <span class="material-symbols-outlined">keyboard_backspace</span>
          <p>Volver</p>
        </button>

      </div>

      <div class="caja2">
        <a v-if="estadoTitulo" class="estiloA">
          {{ titulo }}
        </a>
      </div>

      <!-- <div class="caja3"
        style="display: flex; flex-direction: column; justify-content: center; align-items: center;background-color: #fff;">
      </div> -->

    </div>
    <!-- <div class="linea">
      <a href=""></a>
    </div> -->

  </nav>
</template>

<script>
  export default {
    name: 'navbar-component',
    props: {
      estadoTitulo: Boolean,
      estadoFlecha: Boolean,
      titulo: String

    },
    setup() {

    },
    components: {

    }
  }
</script>


<style lang="scss" scoped>
  $color-amarillo: #f2b749;
  $color-azul: #1B62BF;
  $color-blanco: #f8f9fa;


  .navbar-container {
    width: 100%;
    height: 70px;
    opacity: 1;
    /* background-color: red; */
  }



  a {
    color: $color-blanco;
  }

  .estiloA {
    font-size: 17px;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    color: black;

  }

  .caja2 {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid purple; */
  }

  .caja2 a {
    text-align: center;
  }


  nav .superior {
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: rgb(250, 250, 250);
    /* border: 1px solid blue; */
  }

  .superior .caja1 {
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    /* border: 1px solid green; */
    height: 100%;
  }

  .caja1 p {
    margin: 0;
    padding-inline: 10px;
    color: rgb(78, 78, 78);
    font-weight: bolder;
    font-size: 15px;

  }

  .superior {
    align-items: center;
  }

  .btn-200 {
    width: 200px;
  }

  .containernav>* {
    padding: 10px;
    text-align: center;
    background-color: $color-amarillo;

  }


  .texto {
    grid-area: texto;
    padding: 0;
    color: white;
  }



  .navbar-brand {
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
  }

  .boton {
    width: 120px;
    height: 65px;
    border: none;
    font-size: 10 0px;
    color: var(--color-primary);
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .boton:hover {
    background-color: rgb(238, 238, 238);
  }

  .caja1 span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px !important;
    cursor: pointer;

  }

</style>
