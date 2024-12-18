<template>
    <div class="contendor-modal">
        <div class="pop--block">
            <div id="popup" class="modal-contenedor-grabar">
                <section class="botones">
                    <div class="titulo">
                        Editando datos del Cuidador / paciente
                    </div>
                    <span class="material-symbols-outlined" @click="closePopup">
                        close
                    </span>
                </section>
                <form @submit="submitForm" class="needs-validation" novalidate>
                    <section class="usuarios">
                        <h5 class="titulo">Estado de equipo:</h5>
                        <div class="label-cab">
                            <SwitchOne v-model="objeto.state"></SwitchOne>
                        </div>
                        <h5 class="titulo">Datos del Cuidador</h5>
                        <div class="cuidador-box">

                            <div class="caja3">
                                <label for="idSel01"><span class="material-symbols-outlined">id_card</span> Tipo
                                    Documento: </label>
                                <select class="form-select entrada" id="idSel01" aria-placeholder="Tipo de documento"
                                    v-model="perCui.tipoDoc" required>
                                    <option selected disabled value="">Tipo de documento</option>
                                    <option value="2">DNI</option>
                                    <option value="3">Carne de Extranjeria</option>
                                </select>
                            </div>

                            <div class="caja">
                                <label for="idSel02"><span class="material-symbols-outlined">pin</span> Valor Doc.:
                                </label>
                                <input type="number" class="form-control entrada" id="idSel02"
                                    placeholder="Documento de Identidad" min="0" max="1000000000000000"
                                    v-model="perCui.dni" required>
                            </div>

                            <div class="caja">
                                <label for="idSel03"><span class="material-symbols-outlined">person_add</span> Nombre:
                                </label>
                                <input type="text" class="form-control entrada" id="idSel03" placeholder="Nombre"
                                    v-model.trim="perCui.name" required>
                            </div>

                            <div class="caja">
                                <label for="idSel04"><span class="material-symbols-outlined">badge</span> Ap. Paterno:
                                </label>
                                <input type="text" class="form-control entrada" id="idSel04"
                                    placeholder="Apellido Paterno" v-model.trim="perCui.apelPaterno" required>
                            </div>

                            <div class="caja">
                                <label for="idSel05"><span class="material-symbols-outlined">badge</span> Ap. Materno:
                                </label>
                                <input type="text" class="form-control entrada" id="idSel05"
                                    placeholder="Apellido Materno" v-model.trim="perCui.apelMaterno" required>
                            </div>

                            <div class="caja3">
                                <label for="idSel06"><span class="material-symbols-outlined">calendar_month</span> Fecha
                                    de Nacimiento: </label>
                                <input id="idSel06" class="form-control entrada" type="date" v-model="perCui.birthDate"
                                    required />
                                <span id="startDateSelected"></span>
                            </div>

                            <div class="caja">
                                <label for="idSel07"><span class="material-symbols-outlined">wc</span> Sexo: </label>
                                <select class="form-select entrada" id="idSel07" v-model="perCui.gender" required>
                                    <option selected disabled value="">Sexo</option>
                                    <option value="2"> Masculino</option>
                                    <option value="3">Femenino</option>
                                </select>
                            </div>


                            <div class="caja">
                                <label for="idSel08"><span class="material-symbols-outlined">business_center</span>
                                    Ocupación: </label>
                                <select class="form-select entrada" name="ocupacion" id="idSel08"
                                    v-model="perCui.ocupation" required>
                                    <option selected disabled value="">Ocupación</option>
                                    <option value="estudiante">Estudiante</option>
                                    <option value="empleado">Empleado</option>
                                    <option value="desempleado">Desempleado</option>
                                    <option value="freelancer">Freelancer</option>
                                </select>
                            </div>

                            <div class="caja">
                                <label for="idSel09"><span class="material-symbols-outlined">call</span> Celular:
                                </label>
                                <input type="number" class="form-control entrada" id="idSel09" placeholder="Celular"
                                    min="0" v-model="perCui.phone" required>
                            </div>


                            <div class="caja2">
                                <label for="idSel09"><span class="material-symbols-outlined">alternate_email</span>
                                    Correo electrónico: </label>
                                <input type="email" class="form-control entrada" id="validationCustom01"
                                    placeholder="Correo electrónico" v-model="perCui.email" required>
                            </div>

                            <div class="caja">
                                <label for="idSel01"><span class="material-symbols-outlined">family_restroom</span>
                                    Parentesco:</label>
                                <select class="form-select entrada" name="ocupacion" id="ocupacion"
                                    v-model="perCui.relationship" required>
                                    <option selected disabled value="">Selecciona un parentesco</option>
                                    <option value="padre">Padre</option>
                                    <option value="madre">Madre</option>
                                    <option value="hijo">Hijo</option>
                                    <option value="hija">Hija</option>
                                    <option value="abuelo">Abuelo</option>
                                    <option value="abuela">Abuela</option>
                                    <option value="tío">Tío</option>
                                    <option value="tía">Tía</option>
                                </select>
                            </div>

                        </div>

                        

                        <h5 class="titulo">Datos del Paciente</h5>
                        <div class="cuidador-box">

                            <div class="caja2">
                                <label for="idSel01"><span class="material-symbols-outlined">id_card</span> Tipo
                                    dcoumento:</label>
                                <select class="form-select entrada" id="validationCustom06"
                                    aria-placeholder="Tipo de documento" v-model="perPac.tipoDoc" required>
                                    <option selected disabled value="">Tipo de documento</option>
                                    <option value="2">DNI</option>
                                    <option value="3">Carne de Extranjeria</option>
                                </select>
                            </div>

                            <div class="caja">
                                <label for="idSel01"><span class="material-symbols-outlined">pin</span> Valor
                                    DNI:</label>
                                <input type="number" class="form-control entrada" id="validationCustom01"
                                    placeholder="Documento de Identidad" min="0" max="1000000000000000"
                                    v-model="perPac.dni" required>
                            </div>


                            <div class="caja">
                                <label for="validationCustom01"><span
                                        class="material-symbols-outlined">person_add</span> Nombre:</label>
                                <input type="text" class="form-control" id="validationCustom01" placeholder="Nombre"
                                    v-model.trim="perPac.name" required>
                            </div>

                            <div class="caja">
                                <label for="idSel01"><span class="material-symbols-outlined">badge</span> Ap.
                                    Paterno:</label>
                                <input type="text" class="form-control entrada" id="validationCustom01"
                                    placeholder="Apellido Paterno" v-model.trim="perPac.apelPaterno" required>
                            </div>

                            <div class="caja">
                                <label for="idSel01"><span class="material-symbols-outlined">badge</span> Ap.
                                    Materno:</label>
                                <input type="text" class="form-control entrada" id="validationCustom01"
                                    placeholder="Apellido Materno" v-model.trim="perPac.apelMaterno" required>
                            </div>

                            <div class="caja3">
                                <label for="idSel01"><span class="material-symbols-outlined">calendar_month</span> Fecha
                                    de Nacimiento:</label>
                                <input id="startDate" class="form-control entrada" type="date"
                                    v-model="perPac.birthDate" required />
                                <span id="startDateSelected"></span>
                            </div>

                            <div class="caja">
                                <label for="idSel01"><span class="material-symbols-outlined">wc</span> Sexo: </label>
                                <select class="form-select entrada" id="validationCustom06" v-model="perPac.gender"
                                    required>
                                    <option selected disabled value="">Sexo</option>
                                    <option value="2"> Masculino</option>
                                    <option value="3">Femenino</option>
                                </select>
                            </div>



                            <div class="caja">
                                <label for="idSel01"><span class="material-symbols-outlined">business_center</span>
                                    Ocupación:</label>
                                <select class="form-select entrada" name="ocupacion" id="ocupacion"
                                    v-model="perPac.ocupation" required>
                                    <option selected disabled value="">Ocupación</option>
                                    <option value="estudiante">Estudiante</option>
                                    <option value="empleado">Empleado</option>
                                    <option value="desempleado">Desempleado</option>
                                    <option value="freelancer">Freelancer</option>
                                </select>
                            </div>

                            <div class="caja">
                                <label for="idSel01"><span class="material-symbols-outlined">call</span>
                                    Celular:</label>
                                <input type="number" class="form-control entrada" id="validationCustom01"
                                    placeholder="Celular" min="0" v-model="perPac.phone" required>
                            </div>


                        </div>

                        
                        
                    </section>
                    <section class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="closePopup()">Cancelar</button>
                        <button type="submit" class="save">Guardar</button>
                    </section>
                </form>

            </div>
        </div>
    </div>


</template>


<script>
    import { ref, onMounted, watch, computed } from 'vue';
    import SwitchOne from '@/components/atomic/SwitchOne.vue';
    export default {
        name: 'Modal-relacion',
        props: {
            paciente: Object,
            cuidador: Object,
            userToUpdate: Object,
        },
        components: {
            SwitchOne,
        },
        setup(props, { emit }) {

            const perPac = ref(props.userToUpdate.paciente || {});
            const perCui = ref(props.userToUpdate.cuidador || {});
            const objeto = ref(props.userToUpdate || {});
            const estado = ref(props.userToUpdate.state);

            onMounted(async () => {
                //console.log("onMounted")
                //console.log("perPac: ", perPac.value)
                //console.log("perCui: ", perCui.value)
            });

            watch(() => props.paciente, (newPaciente) => {
                perPac.value = newPaciente || {};
            });

            watch(() => props.cuidador, (newCuidador) => {
                perCui.value = newCuidador || {};
            });

            watch(() => props.userToUpdate.state, (newState) => {
                estado.value = newState;
            });

            watch(() => props.userToUpdate, (newState) => {
                objeto.value = newState;
            });

            const closePopup = () => {
                //console.log("desde el hijo")
                emit('cerrarModal', true);
            }

            const onPressCrear = async () => {
                //console.log("onPressCrear: ",props.userToUpdate)
                objeto.value = {
                    ...props.userToUpdate,
                    cuidador: perCui.value,
                    paciente: perPac.value,

                }
                //props.userToUpdate.state=estado.value;
                closePopup();
                emit('updateUser', objeto.value);
            }

            const submitForm = (event) => {

                event.preventDefault();
                event.stopPropagation();
                const form = event.target;
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                //console.log("perPac - perCui: ",perPac,perCui)
                onPressCrear()
            }

            return {
                perPac,
                perCui,
                closePopup,
                submitForm,
                objeto,
                estado,
            }
        }

    }

</script>

<style lang="scss" scoped>


    .usuarios h5{
        text-align: center;
        padding-block: 10px;
        font-size: 15px
    }


    .usuarios h5:nth-of-type(2) {
        background-color: #a8d5ff;
    }

    .usuarios h5:nth-of-type(3) {
        margin-block: 20px;
        background-color: #bbfcbb;
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

    .label-cab {
        margin-bottom: 10px;
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
        background-color: white;
    }

    /* .popup .img { 
        width: 100px;
        margin-top: -50px;
        border-radius: 15px;
        box-shadow: 0 2px 5px red;
        position: absolute;
        background-color: white;
        transform: translate(100%,30px)
    } */

    .titulo {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        width: 100%;
        background-color: rgb(241, 241, 241);
        border-radius: 5px;
    }

    /* .entrada {
        font-size: 14px !important;
    } */

    .diviosr {
        width: 100%;
        height: 1.5px;
        background-color: rgb(202, 199, 199);
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .contendor-modal {
        width: 100vw;
        height: 100vh;
        background-color: rgba(72, 72, 72, 0.349);
        /* background-color: #E2A318; */
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-footer {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
    }

    .modal-footer .save{
        background-color: var(--color-primary)
    }



    .caja {
        display: flex;
        width: 120px;
        align-content: center;
        align-items: start;
        flex-direction: column;
        margin: 5px;
    }

    .caja label {
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: 700;
        color: rgb(75, 74, 74);
        font-size: 13px;
    }

    .caja2 {
        display: flex;
        width: 160px;
        align-content: center;
        align-items: start;
        flex-direction: column;
        margin: 5px;
    }

    .caja2 label {
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: 700;
        color: rgb(75, 74, 74);
        font-size: 13px;
    }


    .caja3 {
        display: flex;
        width: 180px;
        align-content: center;
        align-items: start;
        flex-direction: column;
        margin: 5px;
    }

    .caja3 label {
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: 700;
        color: rgb(75, 74, 74);
        font-size: 13px;
    }

    .cuidador-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .cuidador-box span {
        font-size: 20px;
        padding-inline: 5px;
        color: rgba(var(--warning), 0.1);
    }

    .cuidador-box label {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--warning);
    }

    .cuidador-box select,
    input {
        font-size: 13px !important;
    }


    .needs-validation {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        //margin-top: 10px;
        
    }

    .usuarios {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .usuarios .usuario {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
    }


    .popup {
        width: 90%;
        height: auto;
        background: #fff;
        border-radius: 15px;
        border: 1px solid rgb(223, 223, 223);
        text-align: center;
        padding: 10px;
        color: #333;
        transition: transform 0.4s, top 0.4s;
        overflow-y: auto;
        box-shadow: -1px 1px 7px 2px rgb(231, 168, 32);
    }

    .open-popup {
        top: 50%;
        visibility: visible;
        transform: translate(-50%, -50%) scale(1);
        transition: transform 0.4s, top 0.4s;
    }


    .popup h2 {
        font-size: 38px;
        font-weight: 500;
        margin: 30px 0 10px;
    }

    .modal-footer button {
        width: 150px;
        margin: 10px;
        padding: 10px 0;
        //background: #6fd649;
        border-radius: 10px;
        color: #fff;
        border: 0;
        outline: none;
        font-size: 18px;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }


    .botones {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
        height: 45px;
        background-color: rgb(247, 243, 203);
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
        background-color: rgb(247, 243, 203);
    }




    @media (max-width:105px) {
        .usuarios {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
        }
    }

</style>