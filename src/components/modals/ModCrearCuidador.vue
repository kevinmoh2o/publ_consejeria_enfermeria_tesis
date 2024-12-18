<template>
    <div class="contendor-modal">
        <div class="pop--block">
            <div class="modal-contenedor-grabar">
                <section class="botones">
                    <div class="titulo">
                        Agregar datos del Cuidador / paciente
                    </div>
                    <span class="material-symbols-outlined" @click="cerrarModal">
                        close
                    </span>
                </section>
                <form id="idForm" @submit.prevent="onPressCrear" class="needs-validation" novalidate>
                    <section class="cuerpo-modal-grabar">

                        <h5 class="modal-title" id="exampleModalLabel">Datos del Cuidador</h5>
                        <!-- <hr class="solid"> -->

                        <div class="cuidador-box">

                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">article</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Tipo de documento :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perCui.tipoDoc"
                                            :data-has-content="perCui.tipoDoc ? 'true' : 'false'" required>
                                            <option v-for="option in listaTipodoc" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">keyboard</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Número de Documento :</div>
                                    <div class="">
                                        <input type="text" class="form-control" id="validationCustom01"
                                            :maxlength="perCui.tipoDoc == '2' ? 8 : 16" v-model="perCui.dni"
                                            :data-has-content="perCui.dni ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">face</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Nombre :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perCui.name"
                                            :data-has-content="perCui.name ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">supervisor_account</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Apellido Paterno :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perCui.apelPaterno"
                                            :data-has-content="perCui.apelPaterno ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">supervisor_account</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Apellido Materno :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perCui.apelMaterno"
                                            :data-has-content="perCui.apelMaterno ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">date_range</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Fecha de Nacimiento :</div>
                                    <div class="">
                                        <input id="startDate" class="form-control" type="date"
                                            v-model="perCui.birthDate"
                                            :data-has-content="perCui.birthDate ? 'true' : 'false'" required />
                                        <div class="invalid-feedback">
                                            Campo Obligatorio.
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">wc</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Sexo :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perCui.gender" :data-has-content="perCui.gender ? 'true' : 'false'"
                                            required>
                                            <option v-for="option in listaSexo" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        work
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Ocupación :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perCui.ocupation"
                                            :data-has-content="perCui.ocupation ? 'true' : 'false'" required>
                                            <option v-for="option in listaOcupacion" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div v-if="perCui.ocupation == 'otros'" class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        engineering
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Otra ocupación :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize"
                                            v-model.trim="perCui.otroOcupation"
                                            :data-has-content="perCui.otroOcupation ? 'true' : 'false'" required>
                                    </div>

                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">call</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Celular :</div>
                                    <div class="">
                                        <input type="text" class="form-control" pattern="\d{9}" id="validationCustom01"
                                            v-model="perCui.phone" :data-has-content="perCui.phone ? 'true' : 'false'"
                                            required>
                                        <div class="invalid-feedback">
                                            Ingrese exactamente 9 dígitos.
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">email</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Correo electrónico :</div>
                                    <div class="">
                                        <input type="email" class="form-control" v-model="perCui.email"
                                            :data-has-content="perCui.email ? 'true' : 'false'" required>
                                        <div class="invalid-feedback">
                                            Ingrese un correo válido.
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        person
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Parentesco :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perCui.relationship"
                                            :data-has-content="perCui.relationship ? 'true' : 'false'" required>
                                            <option v-for="option in listParentezco" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            <div v-if="perCui.relationship == 'otros'" class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        family_restroom
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Otro parentesco :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize"
                                            v-model.trim="perCui.otroParentesco"
                                            :data-has-content="perCui.otroParentesco ? 'true' : 'false'" required>
                                    </div>

                                </div>
                            </div>



                        </div>


                        <h5 class="modal-title" id="exampleModalLabel">Datos del Paciente</h5>
                        <!-- <hr class="solid"> -->

                        <div class="cuidador-box">

                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">article</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Tipo de documento :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perPac.tipoDoc"
                                            :data-has-content="perPac.tipoDoc ? 'true' : 'false'" required>
                                            <option v-for="option in listaTipodoc" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">keyboard</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Número de Documento :</div>
                                    <div class="">
                                        <input type="text" class="form-control" id="validationCustom01"
                                            v-model="perPac.dni" :data-has-content="perPac.dni ? 'true' : 'false'"
                                            required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">face</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Nombre :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perPac.name"
                                            :data-has-content="perPac.name ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">supervisor_account</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Apellido Paterno :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perPac.apelPaterno"
                                            :data-has-content="perPac.apelPaterno ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">supervisor_account</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Apellido Materno :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perPac.apelMaterno"
                                            :data-has-content="perPac.apelMaterno ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">date_range</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Fecha de Nacimiento :</div>
                                    <div class="">
                                        <input id="startDate" class="form-control" type="date"
                                            v-model="perPac.birthDate"
                                            :data-has-content="perPac.birthDate ? 'true' : 'false'" required />
                                        <div class="invalid-feedback">
                                            Campo Obligatorio.
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">wc</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Sexo :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perPac.gender" :data-has-content="perPac.gender ? 'true' : 'false'"
                                            required>
                                            <option v-for="option in listaSexo" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        work
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Ocupación :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perPac.ocupation"
                                            :data-has-content="perPac.ocupation ? 'true' : 'false'" required>
                                            <option v-for="option in listaOcupacion" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div v-if="perPac.ocupation == 'otros'" class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        engineering
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Otra ocupación :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize"
                                            v-model.trim="perPac.otroOcupation"
                                            :data-has-content="perPac.otroOcupation ? 'true' : 'false'" required>
                                    </div>

                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">call</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Celular :</div>
                                    <div class="">
                                        <input type="text" class="form-control" pattern="\d{9}" id="validationCustom01"
                                            v-model="perPac.phone" :data-has-content="perPac.phone ? 'true' : 'false'"
                                            required>
                                        <div class="invalid-feedback">
                                            Ingrese exactamente 9 dígitos.
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </section>

                    <section class="footer-modal-grabar">
                        <!-- <button>Guardar</button> -->
                        <div class="modal-footer">
                            <button type="button" class="cancel" @click="cerrarModal">Cancelar</button>
                            <button type="submit" class="save">Guardar</button>
                        </div>
                    </section>
                </form>
            </div>
        </div>

    </div>


</template>

<script>
    import { defineAsyncComponent } from 'vue'
    import { LIST_PARENTESCO, LIST_OCUPACION, LIST_TIPO_DOC, LIST_SEXO } from '@/helpers/Constantes'
    import { Modal } from 'bootstrap';

    export default {
        name: 'Modal-Cuidador',
        components: {

        },
        props: {
            intitulo: String,
            inDescripcion: String
        },
        data() {
            return {
                showModal: false,
                loading: {
                    statusLodingData: false,
                    statusSuccessApi: false,
                    statusErrorApi: false,
                    descripccion: 'Usuario correctmente autenticado',
                    btnText: 'Continuar',
                    navTo: '',
                },
                perPac: {
                    dni: '',
                    tipoDoc: "",
                    name: "",
                    apelPaterno: "",
                    apelMaterno: "",
                    birthDate: "",
                    gender: "",
                    ocupation: "",
                    phone: "",
                    //relationship: "",
                    //email: "",
                    tipo: "1",
                    otroOcupation: '',
                },
                perCui: {
                    dni: '',
                    tipoDoc: "",
                    name: "",
                    apelPaterno: "",
                    apelMaterno: "",
                    birthDate: "",
                    gender: "",
                    ocupation: "",
                    phone: "",
                    relationship: "",
                    email: "",
                    tipo: "0",
                    otroParentesco: '',
                    otroOcupation: '',
                },
                listParentezco: LIST_PARENTESCO,
                listaOcupacion: LIST_OCUPACION,
                listaTipodoc: LIST_TIPO_DOC,
                listaSexo: LIST_SEXO,
            }
        },
        methods: {
            isValid(fieldName) {
                return this.validation[fieldName];
            },
            async onPressCrear(event) {
                var validateForm = this.submitForm(event);

                this.perPac.name = this.capitalizeText(this.perPac.name);
                this.perPac.apelPaterno = this.capitalizeText(this.perPac.apelPaterno);
                this.perPac.apelMaterno = this.capitalizeText(this.perPac.apelMaterno);

                this.perCui.name = this.capitalizeText(this.perCui.name);
                this.perCui.apelPaterno = this.capitalizeText(this.perCui.apelPaterno);
                this.perCui.apelMaterno = this.capitalizeText(this.perCui.apelMaterno);

                //console.log("valores antes de grabar: ", { state: validateForm, perPac: this.perPac, perCui: this.perCui })
                this.$emit('createRegister', { state: validateForm, perPac: this.perPac, perCui: this.perCui });
                if (validateForm) {
                    this.cerrarModal();
                }

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
            hadlerCloseIndicator(value) {
                this.errorApi.status = value;
            },
            closeModal() {
                this.showModal = false;
                if (this.$refs.modalCuidadorPaciente) {
                    const closeButton = this.$refs.modalCuidadorPaciente.querySelector('.btn-close');
                    if (closeButton) {
                        closeButton.click();
                    }
                }
            },
            cerrarModal() {
                this.$emit('cerrarModal');
            },
            funciondePrueba() {
                console.log("Funcion de Prueba hijo");
            },
            capitalizeText(text) {
                return text.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
            },
            async sleep(ms) {
                return await new Promise(resolve => setTimeout(resolve, ms));
            },
            /* openModal() {
                const modalElement = document.getElementById('modalCuidadorPaciente');
                if (modalElement) {
                    const modalInstance = new Modal(modalElement, {
                        keyboard: true
                    });
                    modalInstance.show();
                } else {
                    console.error("Modal element not found");
                }
            }, */

            resetForm() {
                this.perPac = {
                    dni: '',
                    tipoDoc: "",
                    name: "",
                    apelPaterno: "",
                    apelMaterno: "",
                    birthDate: "",
                    gender: "",
                    ocupation: "",
                    phone: "",
                    //relationship: "",
                    //email: "",
                    tipo: "1",
                    otroOcupation: '',
                };
                this.perCui = {
                    dni: '',
                    tipoDoc: "",
                    name: "",
                    apelPaterno: "",
                    apelMaterno: "",
                    birthDate: "",
                    gender: "",
                    ocupation: "",
                    phone: "",
                    relationship: "",
                    email: "",
                    tipo: "0",
                    otroParentesco: '',
                    otroOcupation: '',
                };

                const form = document.getElementById('idForm');
                if (form) {
                    form.classList.remove('was-validated');
                }
            }
        },
        watch: {
            'perCui.dni'(val) {
                this.perCui.dni = this.perCui.tipoDoc == '2' ? val.replace(/\D/g, '').slice(0, 8) : val.replace(/\D/g, '').slice(0, 15);
            },
            'perPac.dni'(val) {
                this.perPac.dni = this.perPac.tipoDoc == '2' ? val.replace(/\D/g, '').slice(0, 8) : val.replace(/\D/g, '').slice(0, 15);
            },
            'perCui.phone'(val) {
                this.perCui.phone = val.replace(/\D/g, '').slice(0, 9);
            },
            'perPac.phone'(val) {
                this.perPac.phone = val.replace(/\D/g, '').slice(0, 9);
            },


            'perCui.name'(val) {
                this.perCui.name = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'perCui.apelPaterno'(val) {
                this.perCui.apelPaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'perCui.apelMaterno'(val) {
                this.perCui.apelMaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },


            'perPac.name'(val) {
                this.perPac.name = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'perPac.apelPaterno'(val) {
                this.perPac.apelPaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'perPac.apelMaterno'(val) {
                this.perPac.apelMaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
        }
    }
</script>


<style lang="scss" scoped>

    .needs-validation {
        display: flex;
        flex-direction: column;
    }

    .pop--block {
        width: 95%;
        max-width: none;
        display: block;
        overflow-y: auto;
        height: 95vh;
        //padding: 10px;
        overflow-x: hidden;
    }

    .pop--block::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: #f9f9f9;
    }

    .pop--block::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 10px !important;
    }

    .pop--block::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
        border: 2px solid #f1f1f1;
    }

    .pop--block::-webkit-scrollbar-thumb:hover {
        background-color: #8b8a8a;
        border-radius: 10px;
    }



    .needs-validation {
        margin: 0 !important;
        padding: 0 !important;
        background-color: white;
        border-radius: 10px;
    }

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
        min-width: 100%;
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        border: 1px solid rgb(210, 210, 210);
        box-shadow: -1px 1px 7px 0px rgba(0, 0, 0, 0.75);
        //margin: 10px;
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
        height: 100%;
        //padding: 10px 16px;
        background-color: white;
    }

    .cuerpo-modal-grabar h5 {
        padding: 10px;

        width: 100%;
        display: flex;
        color: rgb(77, 77, 77);
        font-weight: 700;
        font-size: 17px;
        align-items: center;
        justify-content: center;
        border-radius: 5px;

    }

    .cuerpo-modal-grabar h5:nth-of-type(1) {
        background-color: #a8d5ff;
    }

    .cuerpo-modal-grabar h5:nth-of-type(2) {
        margin-block: 20px;
        background-color: #bbfcbb;
    }



    .contenedor-dato {
        width: 270px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: nowrap;
        overflow: hidden;
        line-height: 30px;
        padding: 5px;
    }

    .contenedor-dato .icono {
        min-width: 50px;
        min-height: 50px;
        max-width: 50px;
        max-height: 50px;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(245, 245, 245);
        border-radius: 50%;
    }

    .contenido {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .contenido .title {
        font-size: 14px;
        font-weight: 700;
        color: rgb(90, 90, 90);
    }

    textarea {
        outline: none;
        border-style: none;
        padding: 0.5em;
        background-color: rgb(240, 240, 240);
        border-radius: 5px;
        height: 120px;
        /* resize: none; */
        border: 1px solid #e7e6e6;
    }

    textarea:focus {
        border-color: #a8c0e2;
        box-shadow: 0 0 0 0.25rem rgba(29, 104, 207, 0.25);
    }

    .icono span {
        color: rgb(128, 128, 128);
    }

    .contador {
        text-align: end;
        font-size: 14px;
    }

    .contador strong {
        font-weight: 700;
        color: rgb(86, 86, 86);
    }

    .form-select {
        font-size: 14px;
    }


    .no-editable {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .no-editable .contenedor-dato {
        width: 50%;
    }

    .contenido h5 {
        font-size: 14px;
    }

    .divisor {
        width: 100%;
        height: 1.5px;
        border-radius: 10px;
        background-color: rgb(220, 220, 220);
    }

    .cuidador-box {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
    }

    .modal-footer {
        gap: 10px
    }



    .modal-footer .cancel {
        background-color: red;
    }


    .form-select {
        border: 1.7px solid #cdcdcd;
        background-color: #f3f3f3;
    }

    .form-select[data-has-content="true"] {
        border: 1.7px solid #a8c0e2;
        box-shadow: 0 0 0 0.25rem rgba(29, 104, 207, 0.25);
        background-color: #fff;
        color: #000;
        font-style: normal;
    }

    .form-control {
        border: 1.7px solid #cdcdcd;
        background-color: #f3f3f3;
    }

    .form-control:focus {
        border-color: #a8c0e2;
        box-shadow: 0 0 0 0.25rem rgba(29, 104, 207, 0.25);
    }

    .form-control[data-has-content="true"] {
        border: 1.7px solid #a8c0e2;
        box-shadow: 0 0 0 0.25rem rgba(29, 104, 207, 0.25);
        background-color: #fff;
        color: #000;
        font-style: normal;
    }


    .capitalize {
        text-transform: capitalize;
    }


    @media (max-width:650px) {

        .contendor-modal {
            width: 100%;
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
            min-width: 400px;
            max-width: 400px;
            height: auto;
            border-radius: 10px;
            border: 1px solid rgb(210, 210, 210);
            box-shadow: -1px 1px 7px 0px rgba(0, 0, 0, 0.75);
            //margin: 10px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
        }

        .cuerpo-modal-grabar {
            width: auto;
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: start;
            flex-wrap: wrap;
            height: 100%;
            //padding: 10px 16px;
            background-color: white;
        }

        .needs-validation {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: start;
        }




    }
</style>

<!-- 
<template>
    <div class="modal fade" id="modalCuidadorPaciente" ref="modalCuidadorPaciente" tabindex="-1"
        aria-labelledby="modalCuidadorPaciente" aria-hidden="true">
        <div class="modal-dialog modal-md modal-lg modal-xl modal-xxl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Datos del Cuidador</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">


                    <form id="idFormCrearPAcCui" @submit.prevent="onPressCrear" class="needs-validation" novalidate>
                        <div class="cuidador-box">

                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">article</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Tipo de documento :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perCui.tipoDoc"
                                            :data-has-content="perCui.tipoDoc ? 'true' : 'false'" required>
                                            <option v-for="option in listaTipodoc" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">keyboard</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Documento de Identidad :</div>
                                    <div class="">
                                        <input type="text" class="form-control" id="validationCustom01"
                                            v-model="perCui.dni" :data-has-content="perCui.dni ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>


                            
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">face</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Nombre :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perCui.name" :data-has-content="perCui.name ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>


                            
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">supervisor_account</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Apellido Paterno :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perCui.apelPaterno" :data-has-content="perCui.apelPaterno ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>


                            
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">supervisor_account</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Apellido Materno :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perCui.apelMaterno" :data-has-content="perCui.apelMaterno ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>


                            
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">date_range</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Fecha de Nacimiento :</div>
                                    <div class="">
                                        <input id="startDate" class="form-control" type="date"
                                            v-model="perCui.birthDate" :data-has-content="perCui.birthDate ? 'true' : 'false'" required />
                                    </div>
                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">wc</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Sexo :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perCui.gender" :data-has-content="perCui.gender ? 'true' : 'false'"
                                            required>
                                            <option v-for="option in listaSexo" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        work
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Ocupación :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perCui.ocupation"
                                            :data-has-content="perCui.ocupation ? 'true' : 'false'" required>
                                            <option v-for="option in listaOcupacion" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div v-if="perCui.ocupation == 'otros'" class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        engineering
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Otra ocupación :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" v-model.trim="perCui.otroOcupation" 
                                        :data-has-content="perCui.otroOcupation ? 'true' : 'false'" required>
                                    </div>

                                </div>
                            </div>


                            
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">call</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Celular :</div>
                                    <div class="">
                                        <input type="text" class="form-control" pattern="\d{9}" id="validationCustom01" v-model="perCui.phone" 
                                        :data-has-content="perCui.phone ? 'true' : 'false'" required>
                                        <div class="invalid-feedback">
                                            Ingrese exactamente 9 dígitos.
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">email</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Correo electrónico :</div>
                                    <div class="">
                                        <input type="email" class="form-control" v-model="perCui.email" 
                                        :data-has-content="perCui.email ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        person
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Parentesco :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perCui.relationship"
                                            :data-has-content="perCui.relationship ? 'true' : 'false'" required>
                                            <option v-for="option in listParentezco" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            <div v-if="perCui.relationship == 'otros'" class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        family_restroom
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Otro parentesco :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" v-model.trim="perCui.otroParentesco"
                                        :data-has-content="perCui.otroParentesco ? 'true' : 'false'" required>
                                    </div>

                                </div>
                            </div>



                        </div>

                        <hr class="solid">
                        <h5 class="modal-title" id="exampleModalLabel">Datos del Paciente</h5>
                        <hr class="solid">

                        <div class="cuidador-box">


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">article</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Tipo de documento :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perPac.tipoDoc"
                                            :data-has-content="perPac.tipoDoc ? 'true' : 'false'" required>
                                            <option v-for="option in listaTipodoc" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">keyboard</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Documento de Identidad :</div>
                                    <div class="">
                                        <input type="text" class="form-control" id="validationCustom01"
                                            v-model="perPac.dni" :data-has-content="perPac.dni ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">face</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Nombre :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perPac.name" :data-has-content="perPac.name ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">supervisor_account</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Apellido Paterno :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perPac.apelPaterno" :data-has-content="perPac.apelPaterno ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">supervisor_account</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Apellido Materno :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" id="validationCustom01"
                                            v-model.trim="perPac.apelMaterno" :data-has-content="perPac.apelMaterno ? 'true' : 'false'" required>
                                    </div>
                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">date_range</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Fecha de Nacimiento :</div>
                                    <div class="">
                                        <input id="startDate" class="form-control" type="date"
                                            v-model="perPac.birthDate" :data-has-content="perPac.birthDate ? 'true' : 'false'" required />
                                    </div>
                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">wc</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Sexo :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perPac.gender" :data-has-content="perPac.gender ? 'true' : 'false'" required>
                                            <option v-for="option in listaSexo" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>



                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        work
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Ocupación :</div>
                                    <div class="">
                                        <select class="form-select" name="ocupacion" id="ocupacion"
                                            v-model="perPac.ocupation"
                                            :data-has-content="perPac.ocupation ? 'true' : 'false'" required>
                                            <option v-for="option in listaOcupacion" :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div v-if="perPac.ocupation == 'otros'" class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        engineering
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Otra ocupación :</div>
                                    <div class="">
                                        <input type="text" class="form-control capitalize" v-model.trim="perPac.otroOcupation" 
                                        :data-has-content="perPac.otroOcupation ? 'true' : 'false'" required>
                                    </div>

                                </div>
                            </div>


       
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">call</span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Celular :</div>
                                    <div class="">
                                        <input type="text" class="form-control" pattern="\d{9}" id="validationCustom01" v-model="perPac.phone" 
                                        :data-has-content="perPac.phone ? 'true' : 'false'" required>
                                        <div class="invalid-feedback">
                                            Ingrese exactamente 9 dígitos.
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-success">Guardar</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    </div>
</template>


<script>
    import { defineAsyncComponent } from 'vue'
    import { LIST_PARENTESCO, LIST_OCUPACION, LIST_TIPO_DOC, LIST_SEXO } from '@/helpers/Constantes'
    import { Modal } from 'bootstrap';

    export default {
        name: 'Modal-Cuidador',
        components: {
            
        },
        props: {
            intitulo: String,
            inDescripcion: String
        },
        data() {
            return {
                showModal: false,
                loading: {
                    statusLodingData: false,
                    statusSuccessApi: false,
                    statusErrorApi: false,
                    descripccion: 'Usuario correctmente autenticado',
                    btnText: 'Continuar',
                    navTo: '',
                },
                perPac: {
                    dni: '',
                    tipoDoc: "",
                    name: "",
                    apelPaterno: "",
                    apelMaterno: "",
                    birthDate: "",
                    gender: "",
                    ocupation: "",
                    phone: "",
                    //relationship: "",
                    //email: "",
                    tipo: "1",
                    otroOcupation: '',
                },
                perCui: {
                    dni: '',
                    tipoDoc: "",
                    name: "",
                    apelPaterno: "",
                    apelMaterno: "",
                    birthDate: "",
                    gender: "",
                    ocupation: "",
                    phone: "",
                    relationship: "",
                    email: "",
                    tipo: "0",
                    otroParentesco: '',
                    otroOcupation: '',
                },
                listParentezco: LIST_PARENTESCO,
                listaOcupacion: LIST_OCUPACION,
                listaTipodoc: LIST_TIPO_DOC,
                listaSexo: LIST_SEXO,
            }
        },
        methods: {
            isValid(fieldName) {
                return this.validation[fieldName];
            },
            async onPressCrear(event) {
                var validateForm = this.submitForm(event);

                //console.log("this.$refs: ", this.$refs.modalCuidadorPaciente.dispatchEvent)
                /* if (this.$refs.modalCuidadorPaciente) {
                    const closeButton = this.$refs.modalCuidadorPaciente.querySelector('.btn-close');
                    if (closeButton) {
                        closeButton.click();
                    }
                } */
                //console.log("mmm: ",{state: validateForm, perPac: this.perPac, perCui: this.perCui })
                this.$emit('createUSer', { state: validateForm, perPac: this.perPac, perCui: this.perCui });
                if (validateForm) {
                    this.closeModal();
                }
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
            hadlerCloseIndicator(value) {
                this.errorApi.status = value;
            },
            closeModal() {
                this.showModal = false;
                if (this.$refs.modalCuidadorPaciente) {
                    const closeButton = this.$refs.modalCuidadorPaciente.querySelector('.btn-close');
                    if (closeButton) {
                        closeButton.click();
                    }
                }
            },
            funciondePrueba() {
                console.log("Funcion de Prueba hijo");
            },
            async sleep(ms) {
                return await new Promise(resolve => setTimeout(resolve, ms));
            },
            openModal() {
                const modalElement = document.getElementById('modalCuidadorPaciente');
                if (modalElement) {
                    const modalInstance = new Modal(modalElement, {
                        keyboard: true
                    });
                    modalInstance.show();
                } else {
                    console.error("Modal element not found");
                }
            },
            resetForm() {
                const form = document.getElementById('idFormCrearPAcCui');
                if (form) {
                    form.classList.remove('was-validated');
                }
            }
        },
        watch: {
            'perCui.dni'(val) {
                this.perCui.dni = val.replace(/\D/g, '').slice(0, 8);
            },
            'perPac.dni'(val) {
                this.perPac.dni = val.replace(/\D/g, '').slice(0, 8);
            },
            'perCui.phone'(val) {
                this.perCui.phone = val.replace(/\D/g, '').slice(0, 9);
            },
            'perPac.phone'(val) {
                this.perPac.phone = val.replace(/\D/g, '').slice(0, 9);
            },


            'perCui.name'(val) {
                this.perCui.name = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'perCui.apelPaterno'(val) {
                this.perCui.apelPaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'perCui.apelMaterno'(val) {
                this.perCui.apelMaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },

            'perPac.name'(val) {
                this.perPac.name = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'perPac.apelPaterno'(val) {
                this.perPac.apelPaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'perPac.apelMaterno'(val) {
                this.perPac.apelMaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
        }
    }
</script>
<style lang="scss" scoped>

    .select-placeholder {
        color: gray;
        font-style: italic;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .modal-header {
        padding: 10px !important;
    }


    .cuidador-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .caja {
        display: flex;
        width: 250px;
        align-content: center;
        align-items: center;
        flex-direction: row;
        margin: 10px 10px 10px 10px;
    }


    .caja i {
        width: 40px;
        margin: 0 10px 0 10px;
        font-size: 25px;
        color: rgb(133, 133, 133);
    }

    .caja span {
        width: 40px;
        margin: 0 10px 0 10px;
        font-size: 25px;
        color: rgb(133, 133, 133);
    }

    i {
        color: var(--warning);
    }

    .capitalize {
        text-transform: capitalize;
    }



    .contenedor-dato {
        width: 300px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: nowrap;
        overflow: hidden;
        line-height: 30px;
        padding: 5px;
    }

    .contenedor-dato .icono {
        min-width: 50px;
        min-height: 50px;
        max-width: 50px;
        max-height: 50px;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(245, 245, 245);
        border-radius: 50%;
    }

    .icono span {
        color: rgb(99, 99, 99);
    }

    .contenido {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .contenido .title{
        color: rgb(69, 69, 69);
        font-weight: 500;
    }


    .form-select {
        border: 1.7px solid #cdcdcd;
        background-color: #f3f3f3;
    }

    .form-select[data-has-content="true"] {
        border: 1.7px solid #a8c0e2;
        box-shadow: 0 0 0 0.25rem rgba(29, 104, 207, 0.25);
        background-color: #fff;
        color: #000;
        font-style: normal;
    }

    .form-control{
        border: 1.7px solid #cdcdcd;
        background-color: #f3f3f3;
    }

    .form-control:focus {
        border-color: #a8c0e2;
        box-shadow: 0 0 0 0.25rem rgba(29, 104, 207, 0.25);
    }

    .form-control[data-has-content="true"] {
        border: 1.7px solid #a8c0e2;
        box-shadow: 0 0 0 0.25rem rgba(29, 104, 207, 0.25);
        background-color: #fff;
        color: #000;
        font-style: normal;
    }

</style> -->