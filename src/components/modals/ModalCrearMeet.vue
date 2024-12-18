<template>
    <div class="contendor-modal">
        <div class="pop--block">
            <div class="modal-contenedor-grabar">
                <section class="botones">
                    <div class="titulo">
                        Agendar una cita
                    </div>
                    <span class="material-symbols-outlined" @click="closeModalCreate">
                        close
                    </span>
                </section>
                <form id="idForm" @submit.prevent="store" class="needs-validation" novalidate>
                    <section class="cuerpo-modal-grabar">

                        <div class="no-editable">
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        ecg
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Licenciado :</div>
                                    <h5>{{ usuarioData.fullName }}</h5>

                                </div>
                            </div>
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        calendar_month
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Fecha de cita :</div>
                                    <h5>{{ Formatos.ymdFechaToView(inFecha) }}</h5>
                                </div>
                            </div>
                        </div>

                        <line class="divisor"></line>

                        <div class="contenedor-dato">
                            <div class="icono">
                                <span class="material-symbols-outlined">
                                    stethoscope
                                </span>
                            </div>
                            <div class="contenido">
                                <div class="title">Cuidador :</div>
                                <div class="">
                                    <select class="form-select" v-model="selectedCuidador"
                                        aria-label="Default select example" @change="updateOutput" required>
                                        <option value="" disabled selected hidden>Cuidador</option>
                                        <option v-for="paciente in listPaciente" :key="paciente.value"
                                            :value="paciente.value">
                                            {{ paciente.label }}</option>
                                    </select>
                                </div>
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                        </div>

                        <div class="contenedor-dato">
                            <div class="icono">
                                <span class="material-symbols-outlined">
                                    schedule
                                </span>
                            </div>
                            <div class="contenido">
                                <div class="title">Hora :</div>
                                <div class="">
                                    <select id="startTime" class="form-select" v-model="selectedTime" required>
                                        <option value="" disabled selected>Elija una hora</option>
                                        <option v-for="(time, index) in timeOptions" :key="index" :value="time">{{ time
                                            }}
                                        </option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        <div class="contenedor-dato">
                            <div class="icono">
                                <span class="material-symbols-outlined">notifications_active</span>
                            </div>

                            <div class="contenedor--remember">
                                <div class="contenido">
                                    <div class="title">Mi(s) Recordatorio(s) :</div>


                                    <div v-for="(rem, index) in listaRememberConsejero" :key="index"
                                        class="add-remember">

                                        <input type="number" class="form-control remember--box01" min="0" max="60"
                                            :step="rem.type == 'minutos' ? 10 : 1" v-model="rem.scheduletime" required>
                                        <select class="form-select remember--box02" v-model="rem.type" required>
                                            <option v-for="item in listaTipoRango" :key="item.label"
                                                :value="item.value">
                                                {{ item.label }}
                                            </option>
                                        </select>
                                        <div class="icono--remmeber" @click="eliminarRecordatorio(index, 'consejero')">
                                            <span class="material-symbols-outlined">close</span>
                                        </div>

                                    </div>

                                </div>

                                <div class="botton--remember"
                                    :style="{ 'display': (listaRememberConsejero.length >= 3) ? 'none' : '' }"
                                    @click="onCreateRemember('consejero')">
                                    <p>Agregar Notificación</p>
                                </div>
                            </div>

                        </div>


                        <div class="contenedor-dato">
                            <div class="icono">
                                <span class="material-symbols-outlined">
                                    notifications_active
                                </span>
                            </div>
                            <!-- <div class="contenido">
                                <div class="title">Recordatorio - Cuidador:</div>
                                <div class="">
                                    <select class="form-select" v-model="output.extendedProps.recordarCuidador"
                                        aria-label="Default select example" required>
                                        <option v-for="index in listRecordar" :key="index.label" :value="index.value">
                                            {{ index.value }}</option>
                                    </select>
                                </div>
                            </div> -->
                            <div class="contenedor--remember">
                                <div class="contenido">
                                    <div class="title">Recordatorio - Cuidador :</div>


                                    <div v-for="(rem, index) in listaRememberCuidador" :key="index"
                                        class="add-remember">

                                        <input type="number" class="form-control remember--box01" min="0" max="60"
                                            :step="rem.type == 'minutos' ? 10 : 1" v-model="rem.scheduletime" required>
                                        <select class="form-select remember--box02" v-model="rem.type" required>
                                            <option v-for="item in listaTipoRango" :key="item.label"
                                                :value="item.value">
                                                {{ item.label }}
                                            </option>
                                        </select>
                                        <div class="icono--remmeber" @click="eliminarRecordatorio(index, 'cuidador')">
                                            <span class="material-symbols-outlined">close</span>
                                        </div>

                                    </div>

                                </div>

                                <div class="botton--remember"
                                    :style="{ 'display': (listaRememberCuidador.length >= 3) ? 'none' : '' }"
                                    @click="onCreateRemember('cuidador')">
                                    <p>Agregar Notificación</p>
                                </div>
                            </div>
                        </div>


                        <div class="contenedor-dato">
                            <div class="icono">
                                <span class="material-symbols-outlined">
                                    sort
                                </span>
                            </div>
                            <div class="contenido">
                                <div class="title">Notas :</div>
                                <textarea class="textarea" maxlength="200" v-model="output.extendedProps.description"
                                    id="message-text" placeholder="Escriba una nota aquí ..."></textarea>
                                <div class="contador">{{ output.extendedProps.description.length }}/<strong>200</strong>
                                </div>
                            </div>
                        </div>

                    </section>

                    <section class="footer-modal-grabar">
                        <button>Guardar</button>
                    </section>
                </form>
            </div>
        </div>

    </div>


</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { Formatos } from '@/utils/Formatos.js';
    import * as TimeFunction from '@/helpers/timeFunction';
    import * as GlobalFunc from '@/helpers/GlobalFunc';
    import { LIST_REMEMBERS } from '@/helpers/Constantes'
    import { ref } from 'vue';
    import { calculatedRememberTime } from "@/utils/Formatter";



    export default {
        name: 'Model-Component',
        props: {
            msg: String,
            inFecha: String,
            listPaciente: Array,
            fecInicio: Date,
            eventoInfo: Object,
        },
        async mounted() {
            const { state, userProv } = await GlobalFunc.userProviderToVuex(this.$store);
            if (state) {
                this.usuarioData = userProv;
            }

            this.generateTimeOptions();
        },
        setup() {
            const listaRememberConsejero = ref([]);
            const listaRememberCuidador = ref([]);
            const usuarioData = ref({});
            const onCreateRemember = (argTipoUser) => {
                if (!(listaRememberConsejero.value.length >= 3) && argTipoUser == "consejero") {
                    listaRememberConsejero.value.push(buildJsonRemember(argTipoUser))
                }
                if (!(listaRememberCuidador.value.length >= 3) && argTipoUser == "cuidador") {
                    listaRememberCuidador.value.push(buildJsonRemember(argTipoUser))
                }
            };

            function buildJsonRemember(argTipoUser) {
                return {
                    idUsuario: usuarioData.value.id,
                    action: "C",
                    scheduletime: 0,
                    userType: argTipoUser,
                    state: true,
                    type: 'minutos'
                }
            }

            const eliminarRecordatorio = (index, argTipoUser) => {
                if (argTipoUser == "consejero") {
                    listaRememberConsejero.value.splice(index, 1);
                }
                if (argTipoUser == "cuidador") {
                    listaRememberCuidador.value.splice(index, 1);
                }

            };

            return {
                usuarioData,
                listaRememberConsejero,
                listaRememberCuidador,
                onCreateRemember,
                eliminarRecordatorio,

            }
        },
        data() {
            return {
                //usuarioData: {},
                Formatos,
                form: this.selectedOpt,
                fecIni: this.fecInicio || new Date(),
                selectedTime: '',
                timeOptions: [],
                selectedCuidador: '',
                listRecordar: [
                    { label: "1", value: "No" },
                    { label: "2", value: "10 min antes" },
                    { label: "3", value: "30 min antes" },
                    { label: "4", value: "1 hora antes" },
                    { label: "5", value: "12 horas antes" },
                    { label: "6", value: "1 día antes" },
                ],
                listaTipoRango: LIST_REMEMBERS,
                output: {
                    backgroundColor: "#85D94A",
                    borderColor: "#85D94A",
                    end: "",
                    extendedProps: {
                        description: "",
                        link: "/video-conference",
                        recordar: "",
                        recordarCuidador: "",
                        hora: "",
                        fecha: this.inFecha,
                        meeting: "",
                        statusRemember: false,
                        consejeroName: '',
                        duracion: 0,
                    },
                    groupId: "",
                    start: "",
                    title: "",
                    id: ""
                }
            };
        },

        methods: {
            ...mapActions('programacionModule', ['createEntry', 'updateEntry', 'setIsLoading']),
            ...mapGetters('programacionModule', ['getEstado', 'getUser']),
            async store(event) {
                //console.log("this.fecIni: ", { fecIni: this.fecIni, fecInicio: this.fecInicio })
                var validateForm = this.submitForm(event);
                var tiempos = TimeFunction.calcalarFecIniAndFin(this.fecIni)

                this.output.end = tiempos.fecFin;//fecha de finalizacion
                this.output.start = tiempos.fecIni;//Fecha inicio
                this.output.groupId = this.selectedCuidador;//id del cuidador
                this.output.extendedProps.idConsejero = this.usuarioData.id;//ID del consejero
                this.output.extendedProps.fecha = this.inFecha;
                this.output.extendedProps.hora = this.selectedTime;
                this.output.extendedProps.meeting = `Reunión con  ${this.output.title} - ${TimeFunction.stringF2OnlyDate(tiempos.fecIni)}`;
                this.output.extendedProps['editable'] = true;
                this.output.extendedProps.consejeroName = this.usuarioData.fullName;
                //console.log("validateForm: ", { output: this.output, selectedCuidador: this.selectedCuidador, usuarioData: this.usuarioData })
                this.listaRememberConsejero.forEach(element => {
                    element.time = calculatedRememberTime(element.type, element.scheduletime, this.output.start);
                    element.idCuidador = this.output.groupId ;
                    element.start = this.output.start ;
                });
                this.listaRememberCuidador.forEach(element => {
                    element.time = calculatedRememberTime(element.type, element.scheduletime, this.output.start);
                    element.idCuidador = this.output.groupId ;
                    element.start = this.output.start ;
                });

                /* console.log("salida: ",{
                    validateForm,
                    output: this.output,
                    evento: this.eventoInfo,
                    consejero: this.listaRememberConsejero,
                    cuidador: this.listaRememberCuidador,
                    idConsejero: this.usuarioData.id
                }); */
  
                this.$emit('grabarProgramacionReunion', {
                    validateForm,
                    output: this.output,
                    evento: this.eventoInfo,
                    consejero: this.listaRememberConsejero,
                    cuidador: this.listaRememberCuidador,
                    idConsejero: this.usuarioData.id
                });
            },
            closeModal(valu) {
                if (this.$refs.exampleModal) {
                    const closeButton = this.$refs.exampleModal.querySelector('.btn-close');
                    if (closeButton) {
                        closeButton.click();
                    }
                }

            },
            closeModalCreate() {
                this.$emit('closeModalCreate');
            },
            generateTimeOptions() {
                for (let hour = 0; hour <= 23; hour++) {
                    for (let minute = 0; minute < 60; minute += 10) {
                        const formattedHour = (hour < 10 ? '0' : '') + hour;
                        const formattedMinute = (minute < 10 ? '0' : '') + minute;
                        const timeValue = `${formattedHour}:${formattedMinute}`;
                        this.timeOptions.push(timeValue);
                    }
                }
            },
            isValid(fieldName) {
                return this.validation[fieldName];
            },
            updateOutput(event) {
                // Verificamos que listPaciente tenga datos antes de acceder a él
                if (this.listPaciente && this.listPaciente.length > 0) {
                    const selectedValue = event.target.value;
                    if (selectedValue !== -1) {
                        const selectedOption = this.listPaciente.find(paciente => paciente.value === selectedValue);
                        this.output.groupId = selectedOption.value;
                        this.output.title = selectedOption.label;
                    }
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
            resetForm() {
                //console.log("reset values")

                this.selectedCuidador = '';
                this.selectedTime = '';
                this.output.extendedProps.recordar = '';
                this.output.extendedProps.description = '';
                this.listaRememberConsejero = [];
                this.listaRememberCuidador = [];

                const form = document.getElementById('idForm');
                if (form) {
                    form.classList.remove('was-validated');
                }
            }
        },

        watch: {
            inFecha(newFecha) {
                // Actualizar la propiedad en el objeto output cuando inFecha cambia
                this.output.extendedProps.fecha = newFecha;
            },
            selectedTime(newTime) {
                /* this.output.start = `${this.output.extendedProps.fecha}T${valor}:00`
                this.output.extendedProps.hora = `${valor}:00` */
                if (newTime) {
                    const [hour, minute] = newTime.split(':').map(Number);
                    this.fecIni.setHours(hour, minute);
                    //console.log('Nueva fecha y hora de fecIni:', this.fecIni);
                }
            },
            listPaciente: function (newListPaciente) {
                if (newListPaciente.length > 0) {
                    this.output.title = newListPaciente[0].value; // Establecer el primer valor como seleccionado
                }
            },
            fecInicio: {
                handler(newValue) {
                    // Cuando fecInicio cambia, actualiza fecIni con el nuevo valor
                    if (newValue) {
                        this.fecIni = newValue;
                    }
                },
                immediate: true, // Ejecuta el handler inmediatamente cuando se monta el componente
            },
        },
    }
</script>

<style lang="scss" scoped>

    .contenedor--remember {
        width: 100%;
    }

    .botton--remember {
        user-select: none;
        width: 100%;
        height: 40px;
        margin-block: 5px;
        border: 1px solid grey;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        cursor: pointer;
    }

    .botton--remember:hover {
        transition: all 0.5s ease;
        background-color: rgb(237, 237, 237);
    }

    .botton--remember p {
        margin: 0;
        font-size: 14px
    }

    .add-remember {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .icono--remmeber {
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 35px;
        max-height: 35px;
        min-width: 35px;
        min-height: 35px;
        border-radius: 50%;
        cursor: pointer;
        background-color: rgb(243, 243, 243);
    }

    .icono--remmeber span {
        font-size: 17px;
        color: rgb(133, 133, 133);
        font-weight: 900;
    }

    .icono--remmeber:hover {
        background-color: rgb(205, 211, 255);
    }

    .icono--remmeber:hover span {
        color: #1229f3;
    }


    .remember--box01 {
        width: 100px;
    }

    .remember--box02 {
        width: 100%;
    }

    .pop--block {
        //width: auto;
        display: block;
        overflow-y: auto;
        height: 95vh;
        padding: 10px;
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
        min-width: 450px;
        max-width: 550px;
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
        padding: 10px 16px;
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
        min-width: 30px;
        max-width: 30px;
        min-height: 100%;
        max-height: 100%;
        margin: 10px;
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
</style>