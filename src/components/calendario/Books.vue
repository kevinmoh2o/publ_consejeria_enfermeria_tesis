<template>
    <div class="book">
        <Calendar ref="calendarRefenrece" v-if="laodingDataDelCalendar" @eventToCreateNew="eventToCreateNew"
            @enventToModify="enventToModify">
        </Calendar>
        <LoadCuy v-else></LoadCuy>
    </div>


    <div class="contenedor-popup" :class="{ 'open-popup': statusModalCreate }">
        <ModalCrearMeet ref="modalPrincipal" class="modal-visor-programacion" :inFecha="fechaProgramar"
            @grabarProgramacionReunion="grabarProgramacionReunion" @closeModalCreate="closeModalCreate"
            :listPaciente="ddbOpts" :fecInicio="fechaProgramar2" :eventoInfo="selectInfoEventCreate"></ModalCrearMeet>
    </div>

    <div class="contenedor-popup" :class="{ 'open-popup': statusModalModify }">
        <VisorProgramacion ref="refModalModify" class="modal-visor-programacion" @deleteModalVisor="deleteModalVisor"
            @closeModalVisor="closeModalVisor" @updateMeeting="updateMeeting" :datos="dataForVisorModel"
            :inFecha="fechaProgramar" :listPaciente="ddbOpts" :eventoInfo=selectInfoEventDeleteUpdate>
        </VisorProgramacion>
    </div>



    <div v-if="loadingData.status === true">
        <LoadingOverlay :loading="loadingData" />
    </div>
    <div v-else>
        <div v-if="apiResponse.status === true">
            <SuccessView :reponse="apiResponse" />
        </div>
        <div v-if="apiResponse.status === false">
            <ErrorView :reponse="apiResponse" @cerrar-indicador="hadlerCloseIndicator" />
        </div>
    </div>

    <v-snackbar v-model="snackbar.status" :multi-line="snackbar.multiLine" :timeout="5000" color="success">
        {{ snackbar.message }}
        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="snackbar = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>

</template>

<script>
    import { defineAsyncComponent, ref, onUpdated } from 'vue'
    import { Hardware, buttonSound } from '@/utils/Hardware.js';
    import { mapActions, mapGetters, useStore } from 'vuex'
    import jQuery from "jquery";
    import LoadCuy from '@/components/indicadores/LoadCuy.vue';
    import * as GlobalFunc from '@/helpers/GlobalFunc';

    const $ = jQuery;
    window.$ = $;

    export default {
        name: 'book-list',
        inheritAttrs: false,
        props: {
        },
        async mounted() {
            this.laodingDataDelCalendar = false;
            const { state, userProv } = await GlobalFunc.userProviderToVuex(this.$store);
            if (state) {
                this.usuarioData = userProv;
                this.ddbOpts = await this.getListaRelacionesDdb({ id: this.usuarioData.id, isActive: true });
                const { data } = await this.cargarListProgramacionesById({ idConsejero: this.usuarioData.id });
                this.listaEventos = data;
            }
            this.laodingDataDelCalendar = true;
        },
        components: {
            LoadCuy,
            Calendar: defineAsyncComponent(() => import('./Calendar.vue')),
            ModalCrearMeet: defineAsyncComponent(() => import('@/components/modals/ModalCrearMeet.vue')),
            VisorProgramacion: defineAsyncComponent(() => import('@/components/modals/VisorProgramacion.vue')),
            LoadingOverlay: defineAsyncComponent(() => import('@/components/indicadores/LoadingOverlay.vue')),
            SuccessView: defineAsyncComponent(() => import('@/components/indicadores/SuccessView.vue')),
            ErrorView: defineAsyncComponent(() => import('@/components/indicadores/ErrorView.vue')),
        },
        created() {
            if (Hardware.isMobile()) {
                const screenWidth = Hardware.getScreenWidth();
            } else {
                console.log("No se está abriendo desde un dispositivo móvil en mi phone");
            }
        },
        setup(props, { emit }) {
            const store = useStore();
            const calendarRefenrece = ref();
            var laodingDataDelCalendar = ref(true);
            var listaEventos = ref([]);

            const loadingData = ref({
                status: false,
                title: "Creando programación de reunión ...",
            });

            const apiResponse = ref({ status: null });

            const usuarioData = ref({});
            const userId = ref('');
            const fechaProgramar = ref('');
            const fechaProgramar2 = ref(null);

            const itemVar = ref({
                backgroundColor: "#FD1F64",
                borderColor: "#FD1F64",
                end: "",
                extendedProps: {
                    description: "",
                    encargado: '',
                    link: "",
                },
                groupId: '',
                start: "",
                title: "",
                id: ""
            });
            const ddbOpts = ref([]);

            const statusModalModify = ref(false);
            const statusModalCreate = ref(false);

            const dataForVisorModel = ref({})
            const snackbar = ref({
                status: false,
                title: "",
                multiLine: true,
            });


            const deleteModalVisor = async (valor) => {
                buttonSound()
                //console.log("valor deleteModalVisor: ", valor);
                var { data, evento } = valor;
                statusModalModify.value = false;
                loadingData.value = {
                    status: true,
                    title: "Eliminando reunión ..."
                };
                try {
                    //const { message, status } = await store.dispatch('meetingModule/eliminarProgramacionesById', { id: data.id });
                    const { message, status } = await store.dispatch('meetingModule/eliminarProgramacionesNewVersion', { id: data.id });
                    if (status) {
                        await store.dispatch('meetingModule/removeEvent', data.id);
                    }
                    snackbar.value = {
                        status: true,
                        message,
                        multiLine: true,
                    };
                } catch (error) {
                    console.error("error: " + error)
                }
                loadingData.value.status = false;
                emit('eventoEliminado');
            }
            const closeModalVisor = (valor) => {
                buttonSound()
                modalPrincipal.value.resetForm();
                statusModalModify.value = false;
            }



            const ejecutarFiltroCuidadorFecha = async (value) => {
                //console.log("ejecutarFiltroCuidadorFecha: ", value);
                laodingDataDelCalendar.value = false;
                if (value) {
                    const { message, status, data } = await store.dispatch('meetingModule/cargarListProgramacionesPorIdDeConsejero', { groupId: value.cuidador });
                    //console.log("{ message, status, data }: ", { message, status, data })
                    laodingDataDelCalendar.value = true;

                    setTimeout(() => {
                        calendarRefenrece.value.setCalendarOptionsNew(data);
                        laodingDataDelCalendar.value = true;
                    }, 100);
                }
                laodingDataDelCalendar.value = true;
            }


            const selectInfoEventCreate = ref({});
            const selectInfoEventDeleteUpdate = ref({});
            const modalPrincipal = ref(null);
            const refModalModify = ref(null);

            const eventToCreateNew = (selectInfo) => {
                buttonSound()
                //console.log("eventToCreateNew: ", selectInfo)
                statusModalCreate.value = true;
                modalPrincipal.value.resetForm();

                fechaProgramar.value = selectInfo.startStr;
                fechaProgramar2.value = selectInfo.start;
                itemVar.value.groupId = usuarioData.value.id;
                selectInfoEventCreate.value = selectInfo;
            };

            const enventToModify = (arg1) => {
                buttonSound()
                //console.log("enventToModify BOOKS: ");
                //console.log("enventToModify BOOKS: ", arg1);
                const { event } = arg1;
                dataForVisorModel.value = event;
                statusModalModify.value = true;
                selectInfoEventDeleteUpdate.value = arg1;
            };

            const closeModalCreate = () => {
                //console.log("closeModalCreate")
                statusModalCreate.value = false;
            }

            const updateMeeting = async (value) => {
                //console.log("updateMeeting",value,value.output);
                console.log("updateMeeting",value);
                buttonSound()
                statusModalModify.value = false;
                loadingData.value = {
                    status: true,
                    title: "Actualizando reunión ..."
                };
                //console.log("updateMeeting to API IN BOOKS")
                //console.log("updateMeeting IN BOOKS", value)
                let calendarApi = value.evento.view.calendar;
                let eventToUpdate = calendarApi.getEventById(value.output.id);
                //const { message, status, data } = await store.dispatch('meetingModule/actualizarProgramacionById', value.output);
                const { message, status, data } = await store.dispatch('meetingModule/putEventNewRepository',{ id: value.eventId, entry: value.output });
                //statusModalModify.value = false;
                if (status) {
                    await store.dispatch('meetingModule/updateEvent', data);
                    snackbar.value = {
                        status: true,
                        message,
                        multiLine: true,
                    };
                }

                refModalModify.value.setEstadoOnEdit(false);
                loadingData.value.status = false;
            }


            onUpdated(() => {
                //console.log("onupdated", listaEventos)
                if (laodingDataDelCalendar.value && calendarRefenrece.value) {
                    calendarRefenrece.value.setCalendarOptions(listaEventos);
                }
            });



            const setDataToCalendar = (valor) => {
                calendarRefenrece.value.setCalendarOptionsNew(valor);
            };

            /* const handleMessages = (event) => {
                if (event.data.type === 'CONFERENCE_CLOSED') {
                    console.log('Conferencia cerrada, actualizar datos');
                    window.location.reload(true);
                }
            } */

            return {
                /* channel, */
                loadingData,
                apiResponse,
                usuarioData,
                userId,
                fechaProgramar,
                fechaProgramar2,
                itemVar,
                snackbar,
                ddbOpts,
                statusModalModify,
                statusModalCreate,
                dataForVisorModel,
                enventToModify,

                deleteModalVisor,
                closeModalVisor,
                ejecutarFiltroCuidadorFecha,
                eventToCreateNew,
                selectInfoEventCreate,
                selectInfoEventDeleteUpdate,
                modalPrincipal,
                refModalModify,
                closeModalCreate,
                updateMeeting,
                listaEventos,

                calendarRefenrece,
                laodingDataDelCalendar,
                setDataToCalendar,
                /* handleMessages, */
            };
        },
        methods: {
            ...mapActions('programacionModule', ['getListaRelacionesDdb']),
            ...mapActions('meetingModule', ['createProgramacion', 'createProgramacionNew', 'cargarListProgramacionesById', 'addEvent']),
            async grabarProgramacionReunion(value) {
                //console.log(value)
                /* console.log({
                    nuevoEvento: value.output,
                    listaRememberCuidador: value.consejero,
                    listaRememberPaciente: value.cuidador
                }) */
                var { validateForm, output } = value;
                //console.log("antes de grabar", value)
                if (!validateForm) {
                    this.apiResponse = Object.assign({ status: false, data: null, message: 'Por favor, completa todos los campos obligatorios' }, { title: '¡ OoPs !', btnText: 'Cerrar', navTo: '' });
                    this.loadingData.status = false;
                    return null;
                }
                this.loadingData = {
                    status: true,
                    title: "Creando programación de reunión ..."
                }
                this.statusModalCreate = false;
                this.loadingData.status = true;
                try {
                    //const { message, status, data } = await this.createProgramacion(output);
                    const { message, status, data } = await this.createProgramacionNew({
                        idConsejero: value.idConsejero, 
                        cuerpo: {
                            nuevoEvento: value.output,
                            listaRememberCuidador: value.consejero,
                            listaRememberPaciente: value.cuidador
                        }
                    });
                    if (status) {
                        //console.log("data: ",data)
                        this.addEvent(data);
                    }
                    this.snackbar = {
                        status: true,
                        message,
                        multiLine: true,
                    };
                } catch (error) {
                    console.log("error: " + error)
                }
                this.loadingData.status = false;
            },
            hadlerCloseIndicator(value) {
                this.apiResponse.status = null;
            }

        }
    };

</script>

<style lang="scss" scoped>
    .book {
        width: 100%;
    }

    .modal-visor-programacion {
        z-index: 999;
    }

    .contenedor-popup {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.1);
        visibility: hidden;
    }

    .open-popup {
        visibility: visible !important;
        transform: translate(-50%, -50%) scale(1) !important;
        transition: transform 0.4s, top 0.4s;
        z-index: 1000;
        width: 100%;
    }

    @media (max-width:800px) {

        .book {
            width: calc(100vw);
        }
    }
</style>
