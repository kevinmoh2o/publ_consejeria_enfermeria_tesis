<template>
    <div class="modal fade" ref="modalCambioPassword" id="modalCambioPassword" tabindex="-1" aria-labelledby="modalCambioPassword"
        aria-hidden="true">
        <div class="modal-dialog modal-md modal-lg modal-xl modal-xxl">
            <div class="modal-content personalizado">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cambio de Contraseña</h5>
                    <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <form @submit="submitForm" class="alineamiento" novalidate>
                    <div class="caja">
                        <div class="label">
                            <i class="fas fa-envelope"></i>
                            <input type="email" class="form-control" id="validationCustom01" v-model="inPassword"
                                placeholder="Correo electrónico" required>

                            <div class="invalid-feedback">
                                Escriba un email válido
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success">Enviar</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>


<script>


    export default {
        name: 'Modal-Cuidador',
        components: {
        },
        props: {
            intitulo: String,
            inDescripcion: String
        },
        setup() {
            return {
                inPassword: '',
            };
        },
        methods: {
            isValid(fieldName) {
                return this.validation[fieldName];
            },
            async submitForm(event) {
                //console.log("change pass: ")
                const form = event.target;
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                //console.log("change pass: ", this.inPassword)
                this.$emit('evChangePass', this.inPassword);
            },
            async cerrarModal() {
                //console.log("this.$refs: ", this.$refs.modalCambioPassword.dispatchEvent)
                if (this.$refs.modalCambioPassword) {
                    const closeButton = this.$refs.modalCambioPassword.querySelector('.btn-close');
                    if (closeButton) {
                        closeButton.click();
                    }
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    $color-azul: #1B62BF;


    .alineamiento {
        display: flex;
        justify-content: center;
    }



    .custom-button {
        border: 2px solid rgba($color: grey, $alpha: 0.5);
        border-radius: 50%;
        //padding: 10px;
        width: 30px;
        height: 30px;
        background-color: rgba($color: grey, $alpha: 0.3);
        cursor: pointer;
        transition: all .55s ease;
    }

    .custom-button:hover {
        width: 40px;
        height: 40px;
        border: 2px solid rgba($color: red, $alpha: 0.4);
        background-color: rgba($color: red, $alpha: 0.2);
    }

    .custom-button:hover i {
        color: red;
    }

    .modal-header h5 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .personalizado {
        border-radius: 15px;
    }

    .contenedor {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
    }

    .label {
        display: flex;
        width: 500px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .caja {
        border-radius: 10px;
        display: flex;
        width: 500px;
        align-items: center;
        flex-direction: column;
        margin: 10px 10px 10px 10px;
        padding: 10px 10px 10px 10px;
    }

    .caja i {
        width: 40px;
        margin: 0 10px 0 10px;
        font-size: 25px;
        color: rgba($color: black, $alpha: 0.7);
    }

    button {
        margin: 10px;
    }


    .etq-soft {
        font-weight: 500;
        font-size: 14px;
        word-spacing: 0px;
        letter-spacing: 1px;
        color: rgb(215, 213, 213);
    }


    .etq-bold {
        font-weight: 700;
        font-size: 20px;
        word-spacing: 0px;
        letter-spacing: 0;
        color: white;
    }

    .etq-normal {
        color: white;
    }

    .white-line {
        background-color: white;
        height: 1px;
        border: none;
    }


    /* .caja i{
    width: 40px;
    margin: 0 10px 0 10px;
    font-size: 25px;
    color:--primary;
} */
</style>