<template>
    <div class="contendor-modal">
        <div class="pop--block">
            <div id="popup" class="popup">
                <div v-if="!estadoOnEdit" class="contenedor-md3">

                    <div class="bontones">

                        <div v-if="datosIn.extendedProps?.editable" class="boton" @click="onEdit" v-b-tooltip.hover
                            title="editar">
                            <span class="material-symbols-outlined">edit</span>
                        </div>
                        <div v-if="datosIn.extendedProps?.editable" class="boton" @click="onDelete" v-b-tooltip.hover
                            title="Eliminar Programación">
                            <span class="material-symbols-outlined">delete</span>
                        </div>
                        <div class="boton" @click="onClose" v-b-tooltip.hover title="cerrar">
                            <span class="material-symbols-outlined">close</span>
                        </div>

                    </div>


                    <div class="cuerpo">

                        <div class="fila">
                            <div class="imagen1">
                                <div :style="{ backgroundColor: hexToRgba(datosIn.backgroundColor, 1.0) }"
                                    class="cuadrado">
                                </div>
                            </div>
                            <div class="contenido">
                                <h3 class="titulo1">{{ datosIn.extendedProps?.meeting || '' }}</h3>
                                <h4 class="valor">
                                    {{ datosIn.start && datosIn.end ?
                                        TimeFunction.stringF1FromDate(datosIn.start) + ' - ' +
                                        TimeFunction.stringF1FromDate(datosIn.end)
                                        : 'Invalid time values'
                                    }}
                                </h4>
                                <!-- <h4 class="valor">{{ datosIn }}</h4> -->
                            </div>
                        </div>

                        <div v-if="datosIn.extendedProps?.editable" class="fila">
                            <div class="imagen">
                                <span class="material-symbols-outlined">link</span>
                            </div>
                            <div class="contenido">
                                <h3 class="titulo"></h3>
                                <h4 class="valor">
                                    <!-- {{ datosIn.extendedProps.link }} -->
                                    <!-- <router-link
                                    :to="{ name: 'video-conference', query: { valor: encodeURIComponent(JSON.stringify(datosIn)), meeting: `Reunion con ${datosIn.title}` } }">Ir
                                    a la
                                    Video Conferencia</router-link> -->
                                    <!-- <router-link
                                    :to="{ name: 'video-conference', query: { valor: encodeURIComponent(JSON.stringify(datosIn)), meeting: `Reunion con ${datosIn?.title || ''}` } }">Ir
                                    a la
                                    Video Conferencia</router-link> -->
                                    <a :href="getConferenceUrl(datosIn)" target="_blank">Ir a la Video Conferencia</a>
                                </h4>
                            </div>
                        </div>


                        <!-- <div v-if="datosIn.extendedProps.description.length > 0" class="fila">
                        <div class="imagen">
                            <span class="material-symbols-outlined">chat</span>
                        </div>
                        <div class="contenido">
                            <h3 class="titulo"></h3>
                            <h4 class="valor">{{ datosIn.extendedProps?.description || '' }}</h4>

                        </div>
                    </div> -->
                        <div v-if="datosIn && datosIn.extendedProps && datosIn.extendedProps.description && datosIn.extendedProps.description.length > 0"
                            class="fila">
                            <div class="imagen">
                                <span class="material-symbols-outlined">chat</span>
                            </div>
                            <div class="contenido">
                                <h3 class="titulo"></h3>
                                <h4 class="valor">{{ datosIn.extendedProps?.description || '' }}</h4>
                            </div>
                        </div>


                        <!-- <div class="fila">
                        <div class="imagen">
                            <span class="material-symbols-outlined">notifications</span>
                        </div>
                        <div class="contenido">
                            <h3 class="titulo"></h3>
                            <h4 class="valorEstado">En curso</h4>

                        </div>
                    </div> -->



                    </div>

                </div>


                <div v-if="estadoOnEdit" class="modal-contenedor-grabar">
                    <section class="botones">
                        <div class="titulo">
                            Actualizando cita
                        </div>
                        <span class="material-symbols-outlined" @click="closeModalCreate">
                            close
                        </span>
                    </section>
                    <form id="idForm" @submit.prevent="store" class="needs-validation formulario" novalidate>
                        <!-- <p>{{ datosIn.title }}</p> -->
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
                                        <!-- <h5>{{ Formatos.ymdFechaToView(inFecha) }}</h5> -->
                                        <h5>{{ datosIn.extendedProps.fecha }}</h5>

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
                                        <select class="form-select" v-model="datosIn.groupId"
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
                                        <select id="startTime" class="form-select" v-model="datosIn.extendedProps.hora"
                                            required>
                                            <option value="" disabled selected>Elija una hora</option>
                                            <option v-for="(time, index) in timeOptions" :key="index" :value="time">{{
                                                time
                                                }}
                                            </option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <!-- <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        notifications_active
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Recordatorio - Consejero :</div>
                                    <div class="">
                                        <select class="form-select" v-model="datosIn.extendedProps.recordar"
                                            aria-label="Default select example" required>
                                            <option value="" disabled selected hidden>Recordatorio</option>
                                            <option v-for="index in listRecordar" :key="index.label"
                                                :value="index.value">
                                                {{ index.value }}</option>
                                        </select>
                                    </div>

                                </div>
                            </div>


                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">
                                        notifications_active
                                    </span>
                                </div>
                                <div class="contenido">
                                    <div class="title">Recordatorio - Cuidador:</div>
                                    <div class="">
                                        <select class="form-select" v-model="datosIn.extendedProps.recordarCuidador"
                                            aria-label="Default select example" required>
                                            <option value="" disabled selected hidden>Recordatorio</option>
                                            <option v-for="index in listRecordar" :key="index.label"
                                                :value="index.value">
                                                {{ index.value }}</option>
                                        </select>
                                    </div>

                                </div>
                            </div> -->
                            <div class="contenedor-dato">
                                <div class="icono">
                                    <span class="material-symbols-outlined">notifications_active</span>
                                </div>

                                <div v-if="loadingRemembers" class="contenedor--remember">
                                    <div class="contenido">
                                        <div class="title">Mi(s) Recordatorio(s) :</div>


                                        <div v-for="(rem, index) in objetoRemember.consejero" :key="index"
                                            :style="{ 'display': (rem.state) ? '' : 'none' }" class="add-remember">

                                            <input type="number" class="form-control remember--box01" min="0" max="60"
                                                :step="rem.type == 'minutos' ? 10 : 1" v-model="rem.scheduletime"
                                                required>
                                            <select class="form-select remember--box02" v-model="rem.type" required>
                                                <option v-for="item in listaTipoRango" :key="item.label"
                                                    :value="item.value">
                                                    {{ item.label }}
                                                </option>
                                            </select>
                                            <div class="icono--remmeber"
                                                @click="eliminarRecordatorio(index, 'consejero')">
                                                <span class="material-symbols-outlined">close</span>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="botton--remember"
                                        :style="{ 'display': (activeConsejerosCount >= 3) ? 'none' : '' }"
                                        @click="onCreateRemember('consejero')">
                                        <p>Agregar Recordatorio</p>
                                    </div>
                                </div>
                                <div v-else class="loader-container">
                                    <div class="loader"></div>
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
                                <div v-if="loadingRemembers" class="contenedor--remember">
                                    <div class="contenido">
                                        <div class="title">Recordatorio - Cuidador :</div>


                                        <div v-for="(rem, index) in objetoRemember.cuidador" :key="index"
                                            :style="{ 'display': (rem.state) ? '' : 'none' }" class="add-remember">

                                            <input type="number" class="form-control remember--box01" min="0" max="60"
                                                :step="rem.type == 'minutos' ? 10 : 1" v-model="rem.scheduletime"
                                                required>
                                            <select class="form-select remember--box02" v-model="rem.type" required>
                                                <option v-for="item in listaTipoRango" :key="item.label"
                                                    :value="item.value">
                                                    {{ item.label }}
                                                </option>
                                            </select>
                                            <div class="icono--remmeber"
                                                @click="eliminarRecordatorio(index, 'cuidador')">
                                                <span class="material-symbols-outlined">close</span>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="botton--remember"
                                        :style="{ display: activeCuidadorCount >= 3 ? 'none' : '' }"
                                        @click="onCreateRemember('cuidador')">
                                        <p>Agregar Recordatorio</p>
                                    </div>
                                </div>
                                <div v-else class="loader-container">
                                    <div class="loader"></div>
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
                                    <textarea class="textarea" maxlength="200"
                                        v-model="datosIn.extendedProps.description" id="message-text"
                                        placeholder="Escriba una nota aquí ..."></textarea>
                                    <div class="contador">{{ datosIn.extendedProps.description.length
                                        }}/<strong>200</strong>
                                    </div>
                                </div>
                            </div>

                        </section>

                        <section class="footer-modal-grabar">
                            <button>Actualizar</button>
                        </section>
                    </form>
                </div>
            </div>
        </div>

    </div>


</template>


<script>
    import { ref, onMounted, watch, computed, reactive } from 'vue';
    import { useStore } from 'vuex'
    import { BTooltip } from 'bootstrap-vue-next';
    import * as TimeFunction from '@/helpers/timeFunction'
    import { useRouter } from 'vue-router';
    import * as GlobalFunc from '@/helpers/GlobalFunc';
    import { LIST_REMEMBERS } from '@/helpers/Constantes';
    import { putStateRememberListService, getEventosByIdMeetingService, setStateOnLoadingService } from '@/helpers/AgendaFunc';
    import { calculatedRememberTime } from "@/utils/Formatter";

    export default {
        name: 'Modal-relacion',
        directives: {
            'b-tooltip': BTooltip
        },
        props: {
            datos: Object,
            fechaProgramar: String,
            listPaciente: Array,
            eventoInfo: Object,
        },
        components: {

        },
        setup(props, { emit }) {
            const router = useRouter();
            const stores = useStore();
            const listaTipoRango = ref(LIST_REMEMBERS);
            const listaRememberConsejero = ref([]);
            const listaRememberCuidador = ref([]);

            const activeConsejerosCount = computed(() => {
                const remembers = stores.getters['meetingModule/getRemmemberList'].consejero;
                return remembers.filter(rem => rem.state === true).length;
            });

            const activeCuidadorCount = computed(() => {
                const remembers = stores.getters['meetingModule/getRemmemberList'].cuidador;
                return remembers.filter(rem => rem.state === true).length;
            });



            const loadingRemembers = computed(() => stores.getters['meetingModule/getOnLoading']);
            const objetoRemember = computed(() => stores.getters['meetingModule/getRemmemberList']);
            onMounted(async () => {
                //console.log("onMounted")
                //console.log("perPac: ", perPac.value)
                //console.log("perCui: ", perCui.value)
                const { state, userProv } = await GlobalFunc.userProviderToVuex(stores);
                if (state) {
                    usuarioData.value = userProv;
                }
                //var usertest = localStorage.user;
                //usuarioData.value = usertest !== null ? JSON.parse(usertest) : null;
                generateTimeOptions();
                estadoOnEdit.value = false;
            });

            const datosIn = ref(props.datos);
            const usuarioData = ref({});
            const fech = ref(props.fechaProgramar);
            const timeOptions = ref([]);
            //const selectedTime = ref(props.datos.extendedProps.hora||'');


            const estadoOnEdit = ref(false);
            const listRecordar = ref([
                { label: "1", value: "No" },
                { label: "2", value: "10 min antes" },
                { label: "3", value: "30 min antes" },
                { label: "4", value: "1 hora antes" },
                { label: "5", value: "12 horas antes" },
                { label: "6", value: "1 día antes" },
            ]);

            const onEdit = async () => {
                setStateOnLoadingService(stores, false);
                putStateRememberListService(stores, {
                    consejero: [],
                    cuidador: []
                });
                estadoOnEdit.value = true;
                datosIn.value = JSON.parse(JSON.stringify(props.datos));
                const { status, message, data } = await getEventosByIdMeetingService(stores, { idUsuario: datosIn.value.extendedProps.idConsejero, idEvento: datosIn.value.id })
                putStateRememberListService(stores, data);
                //console.log("onEdit", datosIn.value, { status, message, data });

                setStateOnLoadingService(stores, true);
            }


            const onCreateRemember = (userType) => {
                //console.log("onCreateRemember", userType)
                const rememberData = buildJsonRemember(userType);
                stores.dispatch('meetingModule/addRemember', { userType, rememberData });
            };

            const eliminarRecordatorio = (index, userType) => {
                stores.dispatch('meetingModule/removeRemember', { userType, index });
            };


            function buildJsonRemember(argTipoUser) {
                return {
                    idUsuario: usuarioData.value.id,
                    action: "C",
                    scheduletime: 0,
                    userType: argTipoUser,
                    state: true,
                    type: 'minutos',
                    isActive: true,
                }
            }

            const updateRemember = (index, userType, updatedData) => {
                stores.dispatch('meetingModule/updateRemember', { index, userType, updatedData });
            };


            watch(objetoRemember, (newVal) => {
                newVal.consejero.forEach((rem, index) => {
                    // Crear watchers internos solo para las propiedades específicas
                    const oldData = { ...rem }; // Hacer una copia del estado anterior (simplificado)
                    watch(() => [rem.scheduletime, rem.type], () => {
                        // Verifica si se debe actualizar
                        if (rem.action !== 'C' && rem.action !== 'D' && (oldData.scheduletime !== rem.scheduletime || oldData.type !== rem.type)) {
                            //console.log("Detectando una actualización");
                            stores.dispatch('meetingModule/updateRemember', {
                                index,
                                userType: 'consejero',
                                updatedData: { ...rem, action: 'U' }
                            });
                        }
                    }, { deep: true });
                });
            }, { deep: true });


            watch(objetoRemember, (newVal) => {
                newVal.cuidador.forEach((rem, index) => {
                    const oldData = { ...rem };
                    watch(() => [rem.scheduletime, rem.type], () => {
                        if (rem.action !== 'C' && rem.action !== 'D' && (oldData.scheduletime !== rem.scheduletime || oldData.type !== rem.type)) {
                            //console.log("Detectando una actualización en consejero");
                            stores.dispatch('meetingModule/updateRemember', {
                                index,
                                userType: 'cuidador',
                                updatedData: { ...rem, action: 'U' }
                            });
                        }
                    }, { deep: true });
                });
            }, { deep: true });



            watch(
                () => {
                    // Se asegura que tanto extendedProps como hora existen antes de acceder a ellos
                    if (datosIn.value && datosIn.value.extendedProps && datosIn.value.extendedProps.hora) {
                        return [datosIn.value.groupId, datosIn.value.extendedProps.hora];
                    }
                    return [datosIn.value.groupId, undefined]; // Retorna undefined para hora si no está disponible
                },
                ([newGroupId, newHora], [oldGroupId, oldHora]) => {
                    if (newGroupId !== oldGroupId) {
                        //console.log("Detectando cambio en groupId:", newGroupId);
                        updateActions('consejero');
                        updateActions('cuidador');
                    }
                    if (newHora !== undefined && newHora !== oldHora) {
                        //console.log("Detectando cambio en hora:", newHora);
                        updateActions('consejero');
                        updateActions('cuidador');
                    }
                }
            );

            function updateActions(userType) {
                if (objetoRemember.value[userType] && Array.isArray(objetoRemember.value[userType])) {
                    objetoRemember.value[userType].forEach((item, index) => {
                        if (item.action === 'E') {
                            item.action = 'U';
                            stores.dispatch('meetingModule/updateRemember', {
                                index,
                                userType: userType,
                                updatedData: { ...item }
                            });
                        }
                    });
                } else {
                    console.error(`El array ${userType} no está definido o no es un array.`);
                }
            }




            /* watch(
                () => [datosIn.value.groupId, datosIn.value.extendedProps.hora],
                ([newGroupId, newHora], [oldGroupId, oldHora]) => {
                    if (newGroupId !== oldGroupId) {
                        //console.log("Detectando cambio en groupId:", newGroupId);
                        updateActions('consejero');
                        updateActions('cuidador');
                    }
                    if (newHora !== oldHora) {
                        //console.log("Detectando cambio en hora:", newHora);
                        updateActions('consejero');
                        updateActions('cuidador');
                    }
                }
            );

            function updateActions(userType) {
                //console.log(userType)
                
                if (objetoRemember._value[userType] && Array.isArray(objetoRemember._value[userType])) {
                    
                    objetoRemember._value[userType].forEach((item, index) => {
                        //console.log(item)
                        if (item.action === 'E') {
                            item.action = 'U';
                            //console.log(item)
                            stores.dispatch('meetingModule/updateRemember', {
                                index,
                                userType: userType,
                                updatedData: { ...item }
                            });
                            //console.log(`Actualizado ${userType} en index ${index}:`, item);
                        }
                    });
                } else {
                    console.error(`El array ${userType} no está definido o no es un array.`);
                }
            } */








            /* watch(objetoRemember, (newVal) => {
                newVal.consejero.forEach((rem, index) => {
                    // Crear watchers internos solo para las propiedades específicas
                    const oldData = { ...rem }; // Hacer una copia del estado anterior (simplificado)
                    watch(() => [rem.scheduletime, rem.type], () => {
                        // Verifica si se debe actualizar
                        if (rem.action !== 'C' && rem.action !== 'D' && (oldData.scheduletime !== rem.scheduletime || oldData.type !== rem.type)) {
                            //console.log("Detectando una actualización");
                            stores.dispatch('meetingModule/updateRemember', {
                                index,
                                userType: 'consejero',
                                updatedData: { ...rem, action: 'U' }
                            });
                        }
                    }, { deep: true });
                });
            }, { deep: true });

            watch(objetoRemember, (newVal) => {
                newVal.cuidador.forEach((rem, index) => {
                    const oldData = { ...rem };
                    watch(() => [rem.scheduletime, rem.type], () => {
                        if (rem.action !== 'C' && rem.action !== 'D' && (oldData.scheduletime !== rem.scheduletime || oldData.type !== rem.type)) {
                            //console.log("Detectando una actualización en consejero");
                            stores.dispatch('meetingModule/updateRemember', {
                                index,
                                userType: 'cuidador',
                                updatedData: { ...rem, action: 'U' }
                            });
                        }
                    }, { deep: true });
                });
            }, { deep: true }); */


            const onDelete = () => {
                //console.log({ data: datosIn.value, evento: props.eventoInfo })
                emit('deleteModalVisor', { status: true, msg: "Eliminar Modal Visor Prog", data: datosIn.value, evento: props.eventoInfo });
                estadoOnEdit.value = false;
            }



            const onClose = () => {
                emit('closeModalVisor', { status: true, msg: "Cerrar Modal Visor Prog", id: null });
                estadoOnEdit.value = false;
            }

            const setEstadoOnEdit = (value) => {
                estadoOnEdit.value = value;
            }


            const closeModalCreate = () => {
                emit('closeModalVisor');
                estadoOnEdit.value = false;
            };

            const generateTimeOptions = () => {
                for (let hour = 0; hour <= 23; hour++) {
                    for (let minute = 0; minute < 60; minute += 10) {
                        const formattedHour = (hour < 10 ? '0' : '') + hour;
                        const formattedMinute = (minute < 10 ? '0' : '') + minute;
                        const timeValue = `${formattedHour}:${formattedMinute}`;
                        timeOptions.value.push(timeValue);
                    }
                }
            }

            const resetForm = () => {
                console.log("reset values")
            }


            const store = async (event) => {
                //console.log("objetoRemember ", objetoRemember.consejero)
                //console.log("objetoRemember ", objetoRemember.value.consejero)
                //console.log("objetoRemember ", objetoRemember.value.cuidador)
                //console.log("{ output: datosIn.value, evento: props.eventoInfo } ", { output: datosIn.value, evento: props.eventoInfo })
                /* console.log("objetoRemember ", {
                    "datosActualizados": datosIn.value,
                    listaRememberCuidador: objetoRemember.value.cuidador,
                    listaRememberPaciente: objetoRemember.value.consejero
                }) */
                const [hour, minute] = datosIn.value.extendedProps.hora.split(':').map(Number);
                datosIn.value.start = new Date(datosIn.value.start);
                datosIn.value.start.setHours(hour, minute);
                var tiempos = TimeFunction.calcalarFecIniAndFin(datosIn.value.start);
                datosIn.value.end = tiempos.fecFin;
                obtenderDescripcion();
                datosIn.value.extendedProps.meeting = `Reunión con  ${datosIn.value.title} - ${TimeFunction.stringF2OnlyDate(tiempos.fecIni)}`;

                if (objetoRemember.value.cuidador.length > 0) {
                    objetoRemember.value.cuidador.forEach(element => {
                        element.idCuidador = datosIn.value.groupId;
                        element['time'] = calculatedRememberTime(element.type, element.scheduletime, datosIn.value.start);
                        element.start = datosIn.value.start;
                    });
                }
                if (objetoRemember.value.consejero.length > 0) {
                    objetoRemember.value.consejero.forEach(element => {
                        element.idCuidador = datosIn.value.groupId;
                        element['time'] = calculatedRememberTime(element.type, element.scheduletime, datosIn.value.start);
                        element.start = datosIn.value.start;
                    });
                }
                /* console.log("objetoRemember ", {
                    datosActualizados: datosIn.value,
                    listaRememberCuidador: objetoRemember.value.cuidador,
                    listaRememberPaciente: objetoRemember.value.consejero
                }) */
                emit('updateMeeting', {
                    output: {
                        datosActualizados: datosIn.value,
                        listaRememberCuidador: objetoRemember.value.cuidador,
                        listaRememberPaciente: objetoRemember.value.consejero
                    },
                    evento: props.eventoInfo,
                    eventId: datosIn.value.id
                });
            };


            watch(() => props.datos, (newValue) => {
                datosIn.value = newValue;
            });

            watch(() => props.fechaProgramar, (newValue) => {
                fech.value = newValue || '';
            });


            const obtenderDescripcion = () => {
                const pacienteSeleccionado = props.listPaciente.find(paciente => paciente.value === datosIn.value.groupId);
                datosIn.value.title = pacienteSeleccionado ? pacienteSeleccionado.label : '';
            }

            const getConferenceUrl = (datosIn) => {
                const route = router.resolve({
                    name: 'video-conference',
                    query: {
                        valor: encodeURIComponent(JSON.stringify(datosIn)),
                        meeting: `Reunion con ${datosIn?.title || ''}`
                    }
                });
                return window.location.origin + route.href;
            };

            const hexToRgba = (hex, alpha) => {
                if (!hex) return 'rgba(0, 0, 0, 0)';
                hex = hex.replace('#', '');
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }




            return {
                datosIn,
                listRecordar,
                usuarioData,
                timeOptions,
                listaRememberConsejero,
                listaRememberCuidador,
                objetoRemember,
                listaTipoRango,
                loadingRemembers,
                activeConsejerosCount,
                activeCuidadorCount,
                //selectedTime,

                estadoOnEdit,
                onEdit,
                onDelete,
                onClose,
                TimeFunction,
                closeModalCreate,
                generateTimeOptions,
                resetForm,
                store,
                setEstadoOnEdit,
                getConferenceUrl,

                hexToRgba,
                onCreateRemember,
                eliminarRecordatorio,
            }

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


    .needs-validation {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .pop--block {
        display: block;
        overflow-y: auto;
        height: 90vh;
        padding: 10px;
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


    .popup {
        min-width: 420px;
        //width: 90%;
        min-height: 90%;
        background: transparent;
        border-radius: 15px;
        border: none;
        text-align: center;
        padding: 10px;
        color: #333;
        transition: transform 0.4s, top 0.4s;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .contenedor-md3 {
        width: 448px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        //border: 15px solid red;
        border-radius: 15px;
        box-shadow: 0px 0px 8px 5px rgba(0, 0, 0, 0.2);
        margin: 10px;
        background-color: #fff;

    }


    .bontones {
        width: 100%;
        /* border: 1px solid blue; */
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding-inline: 5px;
    }

    .bontones .boton {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .bontones .boton:hover {
        background-color: rgb(215, 215, 215);
        border-radius: 50%;
    }


    .boton span {
        font-size: 20px;
    }

    .cuerpo {
        width: 100%;
        height: 100%;
        /* border: 1px solid green; */

    }


    /*  cuerpo */

    .fila .imagen {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .imagen span {
        color: rgb(88, 87, 87);
        display: flex;
    }

    .imagen1 {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: start;
        height: 100% !important;
    }

    .contenido {
        margin-inline: 5px;
    }

    .contenido .titulo1 {
        font-size: 18px;
        font-weight: 800;
        text-align: start;
    }

    .contenido .titulo {
        font-size: 15px;
        margin: 0;
    }

    .contenido .valor {
        font-size: 14px;
        font-weight: 400;
        text-align: start;
        padding: 0;
        margin-top: 5px;
        margin-bottom: 5px;
        line-height: 20px;
    }

    .fila {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin: 10px;
    }

    .cuadrado {
        width: 17px;
        height: 17px;
        /* background-color: rgb(232, 15, 3); */
        border-radius: 5px;
    }

    .contenido .valorEstado {
        color: red;
        font-size: 14px;
    }

    .circulo {
        width: 17px;
        height: 17px;
        border-radius: 50%;
        color: red;
        background-color: red;
    }


    /* CREAR MEETING */
    .needs-validation {
        margin: 0 !important;
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

    .needs-validation {
        background-color: white;
        border-radius: 0 0 10px 10px;
    }

    .modal-contenedor-grabar {
        min-width: 420px;
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
        background-color: rgb(247, 243, 203);
        padding-inline: 5px;
        border-radius: 10px 10px 0 0;
    }

    .botones span {
        user-select: none;
        display: flex;
        min-width: 40px;
        min-height: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        color: #F2B749;
        font-weight: bolder;
    }

    .botones span:hover {
        width: 40px;
        height: 40px;
        color: white;
        background-color: rgb(194, 194, 194);
    }

    .botones .titulo {
        width: 100%;
        text-align: center;
        font-weight: 900;
        color: #F2B749;
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
        width: 150px;
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
        width: 30px;
        height: 100%;
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
        text-align: start;
    }

    textarea {
        outline: none;
        border-style: none;
        padding: 0.5em;
        background-color: rgb(240, 240, 240);
        border-radius: 5px;
        height: 100px;
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

    .loader-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        /* Ajusta la altura según necesites */
    }

    .loader {
        border: 0.2em solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 0.2em solid #3498db;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }


    @media (max-width:105px) {}

</style>