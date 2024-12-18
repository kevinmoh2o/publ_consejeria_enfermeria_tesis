<template>
    <div class="modal fade" ref="modalCuidadorSeleccion" id="modalCuidadorSeleccion" tabindex="-1" aria-labelledby="modalCuidadorLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" @selectedObjConsejeria="selectedObjConsejeria">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Seleccione un Cuidador - Paciente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <div class="contenedor" v-for="(item, index) in listPacCui" :key="index"
                        @click="capturarValores(item, index)">
                        <div class="cont-card">
                            <div class="flip-card ">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="notification">
                                            <div class="notititle">Cuidador</div>
                                            <div class="notibody">{{ item.cuidador.name }}</div>
                                            <br>
                                            <div class="notititle">Paciente</div>
                                            <div class="notibody">{{ item.paciente.name }}</div>
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <p class="title" lin>N° <br>CONSEJERIA</p>
                                        <p class="nro-consejeria">{{ item.nroConsejeria }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>


<script>

    import { defineAsyncComponent, ref, onMounted, watch } from 'vue';

    export default {
        name: 'Modal-Cuidador',
        components: {
        },
        setup(props) {
            const listPacCui = ref([]);

            onMounted(() => {
                //console.log("valor modal: ", props.lista)
                listPacCui.value = props.lista;
            });
            watch(() => props.lista, (newValue) => {
                listPacCui.value = newValue;
            });

            return {
                listPacCui
            };
        },
        props: {
            lista: Object,
        },
        methods: {
            isValid(fieldName) {
                return this.validation[fieldName];
            },

            async cerrarModal() {
                /* const modal = document.getElementById('modalCuidadorSeleccion');
                modal.classList.remove('show');
                modal.style.display = 'none';
                const backdrop = document.getElementsByClassName('modal-backdrop')[0];
                document.body.removeChild(backdrop); */
                /* const modal = document.getElementById('modalCuidadorSeleccion');
                modal.style.display = 'none'; */
                //console.log("this.$refs: ", this.$refs.modalCuidadorSeleccion.dispatchEvent)
                if (this.$refs.modalCuidadorSeleccion) {
                    const closeButton = this.$refs.modalCuidadorSeleccion.querySelector('.btn-close');
                    if (closeButton) {
                        closeButton.click();
                    }
                }
            },
            async capturarValores(item, index) {
                await this.cerrarModal();
                this.$emit('selectedObjConsejeria', item);
            }

        }
    }

</script>
<style lang="scss" scoped>
    $color-azul: #1B62BF;

    .modal-body {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .btn-close {
        color: white !important;
    }

    h5 {
        width: 100%;
        color: rgb(37, 35, 35);
        display: flex;
        justify-content: center;
        align-content: center;
        font-weight: bold;
        font-size: 15px;
    }



    button {
        color: white;
    }

    .id-letter {
        color: white;
        letter-spacing: 3px;
        font-size: 13px;
    }

    .id-box {
        background-color: black;
        padding: 5px 10px 5px 10px;
        border-radius: 10px;
    }

    .modal-content {
        background: white;
        width: 100%;
        height: 100%;
    }

    .separador {
        color: var(--primary);
        //height: 2px;
        width: 100%;
        border-top: 3px solid var(--primary);
    }

    .contenedor {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        justify-content: center;
        width: 200px;
    }

    .caja {
        border-radius: 10px;
        //background: radial-gradient(circle, var(--warning), var(--primary));
        background: var(--light);
        display: flex;
        width: 350px;
        align-items: start;
        flex-direction: column;
        margin: 10px 10px 10px 10px;
        padding: 10px 10px 10px 10px;
        transition: all .55s ease;
        cursor: pointer;
    }

    .caja:hover {
        background: #d6d9dd; //
    }


    .etq-soft {
        font-weight: 500;
        font-size: 14px;
        word-spacing: 0px;
        letter-spacing: 1px;
        color: rgb(101, 94, 94);
    }


    .etq-bold {
        font-weight: 700;
        font-size: 18px;
        word-spacing: 0px;
        letter-spacing: 0;
        color: rgb(42, 38, 38);
    }

    .etq-normal {
        color: rgb(28, 27, 27);
    }

    .white-line {
        background-color: white;
        height: 1px;
        border: none;
    }

    .cont-card {
        margin: 10px;
        width: 200px;
    }

    .nro-consejeria {
        font-size: 50px;
        font-weight: bold;
        color: white;
    }


    .notification {
        display: flex;
        flex-direction: column;
        isolation: isolate;
        border-radius: 10px;
        padding-top: 10px;
        width: auto;
        height: auto;
        background: #29292c;
        border-radius: 1rem;
        cursor: pointer;
        overflow: hidden;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 16px;
        --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
        --color: #32a6ff
    }

    .notification:before {
        content: "";
        inset: 0.0625rem;
        background: #18181b;
        z-index: 2
    }

    .notification:after {
        content: "";
        width: 0.25rem;
        inset: 0.65rem auto 0.65rem 0.5rem;
        background: var(--gradient);
        transition: transform 300ms ease;
        z-index: 4;
    }

    .notification:hover:after {
        transform: translateX(0.15rem)
    }

    .notititle {
        color: var(--color);
        padding: 0 0.25rem 0.4rem 1.25rem;
        font-weight: 500;
        font-size: 1.1rem;
        transition: transform 300ms ease;
        z-index: 5;
    }

    .notification:hover .notititle {
        transform: translateX(0.15rem)
    }

    .notibody {
        color: #99999d;
        padding: 0 1.25rem;
        transition: transform 300ms ease;
        z-index: 5;
    }

    .notification:hover .notibody {
        transform: translateX(0.25rem)
    }

    .notiglow,
    .notiborderglow {
        position: absolute;
        width: 20rem;
        height: 20rem;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle closest-side at center, white, transparent);
        opacity: 0;
        transition: opacity 300ms ease;
    }

    .notiglow {
        z-index: 3;
    }

    .notiborderglow {
        z-index: 1;
    }

    .notification:hover .notiglow {
        opacity: 0.1
    }

    .notification:hover .notiborderglow {
        opacity: 0.1
    }

    .note {
        color: var(--color);
        position: fixed;
        top: 80%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-size: 0.9rem;
        width: 75%;
    }







    .flip-card {
        background-color: transparent;
        width: 190px;
        height: 150px;
        perspective: 1000px;
        font-family: sans-serif;
    }

    .title {
        font-size: 1em;
        font-weight: 900;
        text-align: center;
        margin: 0;
        color: white;
    }

    .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .flip-card:hover .flip-card-inner {
        transform: rotateY(180deg);
    }

    .flip-card-front,
    .flip-card-back {
        box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border: 1px solid #18181b;
        border-radius: 1rem;
        cursor: pointer;
    }

    .flip-card-front {
        background: #18181b;
        color: #18181b;
    }

    .flip-card-back {
        background: #24242b;
        color: white;
        transform: rotateY(180deg);
    }

</style>