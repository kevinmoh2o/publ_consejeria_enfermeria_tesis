<template>
    <div class="tema-consejeria">
        <div class="contenedor">
            <div class="botones">
                <div class="boton" @click="selectedOption = 'opcionOne'"
                    :class="{ botonUno: selectedOption === 'opcionOne' }">
                    <div class="covered"></div>
                    <span>Adherencia</span>
                </div>

                <div class="boton" @click="selectedOption = 'opcionTwo'"
                    :class="{ botonDos: selectedOption === 'opcionTwo' }">
                    <div class="covered"></div>
                    <span>Crianza</span>
                </div>
                <div class="boton" @click="selectedOption = 'opcionThree'"
                    :class="{ botonTres: selectedOption === 'opcionThree' }">
                    <div class="covered"></div>
                    <span>Prevencion</span>
                </div>
                <div class="boton" @click="selectedOption = 'opcionFour'"
                    :class="{ botonCuatro: selectedOption === 'opcionFour' }">
                    <div class="covered"></div>
                    <span>Soporte</span>
                </div>
            </div>

            <div class="mydict">
                <div>
                    <label>
                        <input type="radio" name="radio" v-model="selectedOption" value="opcionOne" />
                        <span>Adherencia</span>
                    </label>
                    <label>
                        <input type="radio" name="radio" v-model="selectedOption" value="opcionTwo" />
                        <span>Crianza</span>
                    </label>
                    <label>
                        <input type="radio" name="radio" v-model="selectedOption" value="opcionThree" />
                        <span>Prevencion</span>
                    </label>
                    <label>
                        <input type="radio" name="radio" v-model="selectedOption" value="opcionFour" />
                        <span>Soporte</span>
                    </label>
                </div>
            </div>

            <div class="deplazadores">
                <div class="control--button">
                    <span class="material-symbols-outlined" id="prev-slide" @click="slide(-1)">
                        chevron_left
                    </span>
                </div>

                <div class="control--button">
                    <span class="material-symbols-outlined" id="next-slide" @click="slide(1)">
                        chevron_right
                    </span>
                </div>
            </div>

            <div class="slider">
                <div class="slider-wrapper">
                    <div class="control--button deplazadores2" @click="slide(-1)">
                        <span class="material-symbols-outlined">chevron_left</span>
                    </div>

                    <transition name="fade" mode="out-in">
                        <div v-if="selectedOption" class="image-container" ref="imageContainer">
                            <img v-for="(image, index) in images[selectedOption]" :key="index" :src="image.src"
                                class="image-item" />
                        </div>
                    </transition>

                    <div class="control--button deplazadores2" @click="slide(1)">
                        <span class="material-symbols-outlined">chevron_right</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import { buttonSound } from "@/utils/Hardware";

    export default {
        name: "temaconsejeria-layout",
        data() {
            return {
                selectedOption: "opcionOne",
                titulo: "TEMAS DE CONSEJERIA",
                images: {
                    opcionOne: [
                        { src: require("../assets/flyers/adherencia/imagen1.jpg"), order: 1 },
                        { src: require("../assets/flyers/adherencia/imagen2.jpg"), order: 2 },
                        { src: require("../assets/flyers/adherencia/imagen3.jpg"), order: 3 },
                    ],
                    opcionTwo: [
                        { src: require("../assets/flyers/crianza/imagen1.jpg"), order: 1 },
                        { src: require("../assets/flyers/crianza/imagen2.jpg"), order: 2 },
                        { src: require("../assets/flyers/crianza/imagen3.jpg"), order: 3 },
                        { src: require("../assets/flyers/crianza/imagen4.jpg"), order: 4 },
                        { src: require("../assets/flyers/crianza/imagen5.jpg"), order: 5 },
                    ],
                    opcionThree: [
                        { src: require("../assets/flyers/prevencion/imagen1.jpg"), order: 1 },
                        { src: require("../assets/flyers/prevencion/imagen2.jpg"), order: 2 },
                        { src: require("../assets/flyers/prevencion/imagen3.jpg"), order: 3 },
                    ],
                    opcionFour: [
                        { src: require("../assets/flyers/soporte/imagen1.jpg"), order: 1 },
                        { src: require("../assets/flyers/soporte/imagen2.jpg"), order: 2 },
                        { src: require("../assets/flyers/soporte/imagen3.jpg"), order: 3 },
                        { src: require("../assets/flyers/soporte/imagen4.jpg"), order: 4 },
                    ],
                }

            };
        },
        components: {},

        methods: {
            initSlider() {
                // Asegúrate de que selectedOption es una clave válida en images
                if (!this.images[this.selectedOption]) {
                    console.error('Las imágenes para la opción seleccionada no están disponibles:', this.selectedOption);
                    return;
                }

                // Ahora sabemos que this.images[this.selectedOption] está definido
                const selectedOptionImages = [...this.images[this.selectedOption]]; // Hacemos una copia para no mutar el original
                selectedOptionImages.sort((a, b) => a.order - b.order);

                const imageContainer = this.$refs.imageContainer;
                if (imageContainer) {
                    this.imageWidth = imageContainer.offsetWidth;
                    this.maxScrollLeft = (selectedOptionImages.length - 1) * this.imageWidth;
                } else {
                    console.error('No se encontró el contenedor de imágenes');
                }
            },

            slide(direction) {
                const imageContainer = this.$refs.imageContainer;
                const scrollWidth = imageContainer.scrollWidth / this.images[this.selectedOption].length;
                imageContainer.scrollBy({ left: scrollWidth * direction, behavior: "smooth" });
            },
            onBackHandle() {
                this.$router.push("/menu-main");
            },
        },
        watch: {
            selectedOption(newValue, oldValue) {
                this.initSlider();  // Inicializa el slider cuando cambia la opción seleccionada
            },
        },
        mounted() {
            this.initSlider();  // También inicializa en el montaje para configurar el slider inicialmente
        },


    };
</script>

<style lang="scss" scoped>

    .deplazadores {
        display: none !important;
    }



    .control--button {
        user-select: none;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: rgb(255, 255, 255);
        transition: background-color 0.1s ease;
        cursor: pointer;
    }

    .control--button span {
        color: rgb(96, 95, 95);
        transition: background-color 0.5s ease;
        font-size: 30px;
    }

    .control--button:hover {
        width: 40px;
        height: 40px;
        background-color: rgb(231, 231, 231);
    }

    .tema-consejeria {
        overflow-x: hidden;
        display: flex;
        height: 100%;
        flex-direction: column;
    }

    .cabecera {
        width: 100%;
        height: 70px !important;
        /* position: fixed; */
    }

    .contenedor {
        /* border: 2px solid red; */
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .contenedor .botones {
        /* border: 2px solid blue; */
        height: 100vh;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        display: flex;
        transition: width 0.9s ease;
    }

    .contenedor .botones .boton {
        position: relative;
        overflow: hidden;
        /* border: 2px solid purple; */
        height: 70px;
        width: 160px;
        margin: 20px 10px 20px 0;
        border-radius: 0 10px 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.5s ease;
        background-color: rgb(244, 241, 241);
    }

    .botonUno {
        background-color: #e5004b !important;
        color: white;
    }

    .botonDos {
        background-color: #007f73 !important;
        color: white;
    }

    .botonTres {
        background-color: #4ccd99 !important;
        color: white;
    }

    .botonCuatro {
        background-color: #ffc700 !important;
        color: white;
    }

    /*********** COLOR PARA CADA BOTON ***********/
    .contenedor .botones .boton:nth-child(1) .covered {
        background-color: #e5004b;
    }

    .contenedor .botones .boton:nth-child(2) .covered {
        background-color: #007f73;
    }

    .contenedor .botones .boton:nth-child(3) .covered {
        background-color: #4ccd99;
    }

    .contenedor .botones .boton:nth-child(4) .covered {
        background-color: #ffc700;
    }

    /*********** HOVER A LOS BOTONES***********/
    .contenedor .botones .boton:nth-child(1):hover .covered {
        background-color: #e5004b;
    }

    .contenedor .botones .boton:nth-child(2):hover .covered {
        background-color: #007f73;
    }

    .contenedor .botones .boton:nth-child(3):hover .covered {
        background-color: #4ccd99;
    }

    .contenedor .botones .boton:nth-child(4):hover .covered {
        background-color: #ffc700;
    }

    .contenedor .botones .boton:hover>span {
        position: relative;
        color: white;
    }

    .contenedor .botones .boton .covered {
        left: 0;
        position: absolute;
        height: 70px;
        width: 15px;
        background-color: blue;
        transition: width 0.35s ease;
    }

    .contenedor .botones .boton:hover .covered {
        width: 100%;
        color: white;
    }

    .contenedor .slider {
        overflow-y: auto;
        /* border: 2px solid green; */
        //border: 1px solid blue;
        min-height: 80vh;
        height: calc(auto - 10px);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: row;
        object-fit: cover;

        //padding-block: 10px;
    }

    .container {
        /* max-width: 600px; */
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .slider-wrapper {

        /* border: 3px solid orange; */
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        /* max-width: 400px !important; */
        min-height: 100%;
        height: 50vh;
        margin: 0;
        flex-direction: row;
        flex-wrap: nowrap;
        /* border: 3px solid green; */
    }

    .slider-wrapper ion-icon {
        width: 50px;
        height: 50px;
    }

    .image-container {
        /* border: 2px solid blue; */
        display: flex;
        overflow-x: none;
        scroll-snap-type: x mandatory;
        max-width: 500px;
        width: auto;
        overflow-x: hidden;
    }

    .image-item {
        flex: 0 0 auto;
        width: 100%;
        object-fit: cover;
    }

    .slider-wrapper .slider .slide-button {
        /* border: 3px solid green; */
        position: absolute;
        top: 50%;
        outline: none;
        border: none;
        height: 50px;
        width: 100px;
        z-index: 5;
        color: #fff;
        display: flex;
        cursor: pointer;
        font-size: 2.2rem;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transform: translateY(-50%);
    }

    .slider-wrapper .slide-button#prev-slide {
        left: -0px;
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
        /* margin-bottom: 30px; */
        overflow-x: auto;
        scrollbar-width: none;
    }

    .slider-wrapper .image-list::-webkit-scrollbar {
        display: none;
    }

    .slider-wrapper .image-list .image-item {
        width: 100%;
        height: 100%;
        /*  object-fit: cover; */
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

    :focus {
        outline: 0;
        border-color: #2260ff;
        box-shadow: 0 0 0 4px #b5c9fc;
    }

    .mydict div {
        flex-wrap: wrap;
        margin: 0.5rem 0.5rem;
        justify-content: center;
        display: none;
    }

    .mydict input[type="radio"] {
        clip: rect(0 0 0 0);
        clip-path: inset(100%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }

    .mydict input[type="radio"]:checked+span {
        box-shadow: 0 0 0 0.0625em #0043ed;
        background-color: #dee7ff;
        z-index: 1;
        color: #0043ed;
    }

    label span {
        display: block;
        cursor: pointer;
        background-color: #fff;
        padding: 0.375em 0.75em;
        position: relative;
        margin-left: 0.0625em;
        box-shadow: 0 0 0 0.0625em #b5bfd9;
        letter-spacing: 0.05em;
        color: #3e4963;
        text-align: center;
        transition: background-color 0.5s ease;
    }

    label:first-child span {
        border-radius: 0.375em 0 0 0.375em;
    }

    label:last-child span {
        border-radius: 0 0.375em 0.375em 0;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    @media (max-width: 800px) {
        .deplazadores {
            display: flex !important;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .deplazadores2 {
            display: none;
        }

        .contenedor .botones {
            display: none;
            width: 0;
        }


        /* .slider-wrapper {
                flex-direction: column;
            } */

        .mydict div {
            display: flex;
        }

        .contenedor {
            //margin: 10px;
            display: block;
            flex-direction: column;
        }
    }
</style>
