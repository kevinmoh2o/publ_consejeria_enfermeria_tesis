<template>

    <div class="container">
        <div class="contendor-carrusel">
            <div class="left" @click="slide(-1)">
                <span class="material-symbols-outlined">chevron_left</span>
            </div>

            <div class="images-body">
                <transition name="fade" mode="out-in">
                    <img :src="opcionOne[currentImageIndex].src" :alt="'img-' + (currentImageIndex + 1)"
                        :key="opcionOne[currentImageIndex].src" class="image-item">
                </transition>
            </div>

            <div class="right" @click="slide(1)">
                <span class="material-symbols-outlined">chevron_right</span>
            </div>
        </div>
    </div>


</template>


<script>
    import { reactive, ref, onMounted } from 'vue'

    export default {
        name: 'about-layout',
        setup() {
            const opcionOne = reactive([
                { src: require("@/assets/workteam/uno.png"), order: 1 },
                { src: require("@/assets/workteam/dos.png"), order: 2 },
                { src: require("@/assets/workteam/tres.png"), order: 3 },
                { src: require("@/assets/workteam/cuatro.jpg"), order: 4 },
            ]);

            const currentImageIndex = ref(0);

            const slide = (direction) => {
                let newIndex = currentImageIndex.value + direction;
                if (newIndex >= opcionOne.length) {
                    newIndex = 0;
                } else if (newIndex < 0) {
                    newIndex = opcionOne.length - 1;
                }
                currentImageIndex.value = newIndex;
            };

            onMounted(() => {
                console.log("Sobre Nosotros")
            });

            return {
                opcionOne,
                currentImageIndex,
                slide,
                isMobile: false,
            }
        },
        props: {
            isMaxBarraLateral: Boolean,
            rectWidth: Number,
        },
        computed: {
            widthStyle() {
                return this.isMobile ? `calc(100%)` : `calc(100vw - ${this.rectWidth}px)`;
            },
            leftStyle() {
                return this.isMobile ? 0 : `${this.rectWidth}px`;
            },

        },
    }
</script>
<style lang="scss" scoped>

    .container {
        max-width: 100%;
        height: 100vh;
        font-size: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
        /* border: 1px solid red; */
        position: relative;
    }

    .contendor-carrusel {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .images-body {
        width: 100%; // Asegura que el contenedor de imágenes no exceda el ancho del contenedor padre
        overflow: hidden; // Evita el desbordamiento visual de las imágenes
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-item {
        max-height: 100vh; // Asegura que la imagen no sea más ancha que su contenedor
        width: auto; // Mantiene la proporción de aspecto de la imagen
        display: block; // Evita cualquier espacio extra debajo de la imagen
    }


    .container .left,
    .container .right {
        user-select: none;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border-radius: 100px;
        cursor: pointer;
        position: absolute; // Posiciona absolutamente los botones dentro del contenedor.
        top: 50%; // Centra verticalmente
        transform: translateY(-50%);
    }

    .container .left {
        left: 10px; // Posición desde el lado izquierdo
    }

    .container .right {
        right: 10px; // Posición desde el lado derecho
    }

    .container .left:hover,
    .container .right:hover {
        background-color: rgb(225, 225, 225);
    }


    @media only screen and (max-width: 1050px) {

        .image-item {
            height: auto; // Asegura que la imagen no sea más ancha que su contenedor
            max-width: 90%; // Mantiene la proporción de aspecto de la imagen
            display: block; // Evita cualquier espacio extra debajo de la imagen
        }
    }








    /*.scaled-image {
        max-width: 100%;
        height: auto;
    }

     .container {
        border: 1px solid red;
        position: relative;
        width: auto;
        height: 100vh;
        background-color: white;
        padding: 0;
        margin: 0;
    } */

    /*    .slider input {
        visibility: hidden;
        display: none;

    }

    .buttons {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        bottom: 50px;
        gap: 10px;
    }

    .buttons label {
        width: 20px;
        height: 20px;
        background-color: blue;
        border-radius: 7px;
        cursor: pointer;
        z-index: 1;
        transition: 300ms ease-in-out;
    }

    .buttons label:hover {
        scale: 1.2;
        opacity: 1;
    }

    .slider input:nth-child(1):checked~.buttons label:nth-child(1),
    .slider input:nth-child(2):checked~.buttons label:nth-child(2),
    .slider input:nth-child(3):checked~.buttons label:nth-child(3),
    .slider input:nth-child(4):checked~.buttons label:nth-child(4) {
        opacity: 1;
        scroll-margin: 1.2;
        width: 40px;
    }

    .content {
        position: relative;
        width: 400vw;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        height: 100vh;
        transition: 400ms ease-in-out;
    }


    .firstslide,
    .secondslide,
    .thirdslide,
    .fourthslide {
        position: relative;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .firstslide {
        background-color: white;
    }

    .secondslide {
        background-color: white;
    }

    .thirdslide {
        background-color: white;
    }

    .fourthslide {
        background-color: white;
    }

    .slider input:nth-child(1):checked~.content {
        left: 0;
    }

    .slider input:nth-child(2):checked~.content {
        left: -100vw;
    }

    .slider input:nth-child(3):checked~.content {
        left: -200vw;
    }

    .slider input:nth-child(4):checked~.content {
        left: -300vw;
    }


    @media only screen and (min-width: 1201px) {
        .scaled-image {
            max-width: 70%;
            height: auto;
        }
    } */

</style>