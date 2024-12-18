<template>
    <div class="contendor-modal">
        <div class="modal-contenedor-grabar">
            <section class="botones">
                <div class="titulo">
                    Cambiar Contraseña
                </div>
                <span class="material-symbols-outlined" @click="closeModalReset">
                    close
                </span>
            </section>
            <section class="cuerpo-modal-grabar">

                <div class="contenedor-dato">
                    <div class="icono">
                        <span class="material-symbols-outlined">info</span>
                    </div>
                    <div class="contenido">

                        <label class="informacion">Por favor, ingrese el correo electrónico asociado con su cuenta. Le
                            enviaremos un enlace a este correo para restablecer su contraseña.</label>
                    </div>
                </div>

            </section>
            <form id="idForm" @submit.prevent="store" class="needs-validation" novalidate>
                <section class="cuerpo-modal-grabar">

                    <div class="contenedor-dato">
                        <div class="icono">
                            <span class="material-symbols-outlined">alternate_email</span>
                        </div>
                        <div class="contenido">
                            <div class="title">Correo electrónico :</div>
                            <input type="email" class="form-control" id="validationCustom01" v-model="inPassword"
                                placeholder="Ingrese su correo aquí" required>
                        </div>
                        <div class="invalid-feedback">
                            Entre 6-12 caracteres.
                        </div>
                    </div>

                </section>
                <section class="footer-modal-grabar">
                    <button>Enviar</button>
                </section>
            </form>
        </div>
    </div>


</template>


<script>
    import { ref, onMounted, watch, computed, reactive } from 'vue';
    import { BTooltip } from 'bootstrap-vue-next';

    export default {
        name: 'Modal-relacion',
        directives: {
            'b-tooltip': BTooltip
        },

        components: {

        },
        setup() {
            const inPassword = ref('');
            onMounted(async () => {

                /* var usertest = localStorage.user;
                usuarioData.value = usertest !== null ? JSON.parse(usertest) : null;
                generateTimeOptions();
                estadoOnEdit.value = false; */
            });
            return {
                inPassword
            }

        },
        methods: {
            async store(event) {
                var validateForm = this.submitForm(event);
                this.$emit('sendEmail', { validateForm, output: this.inPassword });
            },
            closeModalReset() {
                this.$emit('closeModalReset');
            },
            submitForm(event) {

                const form = event.target;
                var validador = form.checkValidity();
                if (!validador) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                return validador;
            },
        }

    }

</script>

<style lang="scss" scoped>

    .contendor-modal {
        width: 100vw;
        height: 100vh;
        background-color: rgba(72, 72, 72, 0.349);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .modal-contenedor-grabar {
        min-width: 350px;
        max-width: 450px;
        height: auto;
        border-radius: 10px;
        border: 1px solid rgb(210, 210, 210);
        box-shadow: -1px 1px 7px 0px rgba(0, 0, 0, 0.75);
        margin: 10px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
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
        border-radius: 10px 10px 0 0;
    }

    .botones span {
        user-select: none;
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
        background-color: white;
        border-radius: 0 0 10px 10px;
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
        padding: 10px 5px;
        background-color: white;
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
        margin: 5px;
        color: rgb(92, 91, 91);
    }

    .contenido {
        width: 100%;
    }

    .informacion {
        font-size: 14px;
        line-height: 20px;
        color: grey;
    }


</style>