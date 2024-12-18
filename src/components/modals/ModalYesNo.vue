<template>
    <div class="contendor-modal">
        <div class="modal-contenedor-grabar">
            <section class="botones">
                <div class="titulo">
                    <span class="material-symbols-outlined">
                        warning
                    </span> {{ title }}
                </div>
            </section>

            <section class="message">
                <p>{{ message }}</p>
            </section>

            <section class="footer-modal-grabar">
                <button class="cerrar" @click="closeModalCreate">Cancelar</button>
                <button class="ok" @click="onSave">Guardar</button>
            </section>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Model-Component',
        props: {
            title: String,
            message: String,
        },

        setup() {
            return {
            };
        },

        methods: {

            closeModal() {
                if (this.$refs.exampleModal) {
                    const closeButton = this.$refs.exampleModal.querySelector('.btn-close');
                    if (closeButton) {
                        closeButton.click();
                    }
                }

            },
            closeModalCreate() {
                this.$emit('closeModalYesNo');
            },
            onSave(){
                this.$emit('onConfirmation');
            }
        },
    }
</script>

<style scoped>
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
        max-width: 550px;
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
        background-color: var(--warning);
        padding-inline: 5px;
        border-radius: 10px 10px 0 0;
    }


    .botones .titulo {
        width: 100%;
        text-align: center;
        font-weight: 900;
        display: flex;
        justify-content: center;
        color: white;
    }

    .botones .titulo span{
        padding-inline: 10px;
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
        width: 90px;
        height: 40px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        font-size: 15px;
        margin-inline: 10px;
    }

    .footer-modal-grabar .cerrar {
        background: var(--color-danger) !important;
    }

    .footer-modal-grabar .ok {
        background: var(--color-success) !important;
    }

    .message {
        background-color: white;
        padding: 20px;
    }
</style>