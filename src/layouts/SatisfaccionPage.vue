<template>
    <div v-if="!loadingLocal" class="contenedor">
        <div class="cabecera">
            <div class="headerOne">
                <div class="left">
                </div>
                <div class="right">
                    <div v-if="!satisfaccionFlag" class="filtro">
                        <button class="boton" @click.prevent="onSave">
                            <ion-icon name="save-outline"></ion-icon>
                            Guardar
                        </button>
                    </div>
                </div>

            </div>
        </div>
        <div class="contenido">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th rowspan="2" class="thc">Item</th>
                        <th rowspan="2" class="thc">Preguntas</th>
                        <th colspan="3" class="thc">Totalmente desacuerdo (insatisfecho)</th>
                        <th class="thc">← o →</th>
                        <th colspan="3" class="thc">Totalmente de acuerdo (satisfecho)</th>
                    </tr>
                    <tr>
                        <th class="thc">1</th>
                        <th class="thc">2</th>
                        <th class="thc">3</th>
                        <th class="thc">4</th>
                        <th class="thc">5</th>
                        <th class="thc">6</th>
                        <th class="thc">7</th>
                    </tr>
                </thead>


                <tbody>
                    <tr v-for="(item, index) in cuestionario" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.pregunta }}</td>
                        <td><input type="radio" :name="'grupo' + index" value="1" v-model="item.respuesta"
                                :disabled="satisfaccionFlag"></td>
                        <td><input type="radio" :name="'grupo' + index" value="2" v-model="item.respuesta"
                                :disabled="satisfaccionFlag"></td>
                        <td><input type="radio" :name="'grupo' + index" value="3" v-model="item.respuesta"
                                :disabled="satisfaccionFlag"></td>
                        <td><input type="radio" :name="'grupo' + index" value="4" v-model="item.respuesta"
                                :disabled="satisfaccionFlag"></td>
                        <td><input type="radio" :name="'grupo' + index" value="5" v-model="item.respuesta"
                                :disabled="satisfaccionFlag"></td>
                        <td><input type="radio" :name="'grupo' + index" value="6" v-model="item.respuesta"
                                :disabled="satisfaccionFlag"></td>
                        <td><input type="radio" :name="'grupo' + index" value="7" v-model="item.respuesta"
                                :disabled="satisfaccionFlag"></td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>

    <div v-else class="cui--loading">
        <LoadCuy></LoadCuy>
    </div>

    <div class="contenedor-popup" :class="{ 'open-popup': statusModalCreate }">
        <ModalYesNo ref="modalPrincipal" class="modal-visor-programacion" :title="'Confirmar Guardado de Respuestas'"
            :message="'Estás a punto de grabar tus respuestas. Una vez guardadas, no podrás modificarlas.  ¿Deseas continuar?'"
            @closeModalYesNo="closeModalYesNo" @onConfirmation="onConfirmation"></ModalYesNo>
    </div>

    <v-snackbar v-model="snackbar.status" :multi-line="snackbar.multiLine" :timeout="snackbar.timeout"
        :color="snackbar.color">
        {{ snackbar.message }}
        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="snackbar.status = false">
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    import { reactive, onMounted, ref, defineAsyncComponent, computed } from 'vue';
    import { useStore } from 'vuex';

    import * as SatiFunc from '@/helpers/SatiFunc';
    import * as GlobalFunc from '@/helpers/GlobalFunc';
    import { buttonSound } from '@/utils/Hardware';
    
    export default {
        name: 'cuestionario-satisfaccion',
        components: {
            ModalYesNo: defineAsyncComponent(() => import('@/components/modals/ModalYesNo.vue')),
            LoadCuy: defineAsyncComponent(() => import('@/components/indicadores/LoadCuy.vue')),
        },
        setup() {
            const store = useStore();
            const cuestionario = reactive(SatiFunc.cuestionario);
            const userProvider = ref(null);
            const statusModalCreate = ref(false);
            const loadingLocal = ref(false);
            const snackbar = ref({
                status: false,
                message: "",
                color: "success",
                multiLine: true,
                timeout: 5000
            });

            const onSave = async () => {
                buttonSound();
                const { message, state } = SatiFunc.isComplete(cuestionario);
                //console.log("iscomplete: ", { message, state })
                if (state) {
                    statusModalCreate.value = true;
                } else {
                    snackbar.value.status = true;
                    snackbar.value.message = message;
                    snackbar.value.color = "red";
                    snackbar.value.timeout = 10000;
                }
            }

            onMounted(async () => {
                console.log("Satisfaccion Page")
                const { state, userProv } = await GlobalFunc.userProviderToVuex(store);
                if (state) {
                    userProvider.value = userProv;
                }
                //userProvider.value = data;
                //console.log("userProvider: ", userProvider.value);
                if (userProvider.value.satisfactionQuest) {
                    const { status, data, message } = await store.dispatch('satisfaccionModule/getEncuestasDeSatisfaccion', { idConsejero: userProvider.value.id });
                    //console.log("Satisfaccion exist: ", { status, data, message });
                    cargarRespuestas(data[0].respuestas);
                }

            })

            const closeModalYesNo = () => {
                statusModalCreate.value = false;
            }

            const onConfirmation = async () => {
                //console.log("onConfirmation")
                statusModalCreate.value = false;
                loadingLocal.value = true;
                const { status, message } = await SatiFunc.buildJSONToStore(store, cuestionario, userProvider.value.id);
                //console.log("message: ", message)
                if (status) {
                    GlobalFunc.updateSatisfactionQuest(true);
                }

                loadingLocal.value = false;
            }

            /* const satisfaccionFlag = () =>{

            } */

            const satisfaccionFlag = computed(() => store.getters['authModule/satisfactionQuest']);

            /* const handleStatusUpdate = (newStatus) => {
                snackbar.value.status = newStatus;
            }
 */
            function cargarRespuestas(respuestasApi) {
                //console.log("respuestasApi: ", respuestasApi)
                respuestasApi.forEach(apiResp => {
                    const pregunta = cuestionario.find(item => item.nro === apiResp.nro);
                    if (pregunta) {
                        pregunta.respuesta = apiResp.respuesta;
                    }
                });
                //satisfaccionFlag.value = true; // Deshabilita la edición si es necesario
            }
            return {
                userProvider,
                statusModalCreate,
                snackbar,
                loadingLocal,


                onSave,
                cuestionario,
                closeModalYesNo,
                onConfirmation,
                //handleStatusUpdate,

                SatiFunc,
                GlobalFunc,
                satisfaccionFlag,
            }
        }
    }
</script>

<style lang="scss" scoped>

    .cui--loading {
        height: 100vh;
    }

    .contenedor {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }


    .pregunta {
        font-size: 15px;
        font-weight: 400;
        margin: 0;
        display: flex;
        flex-direction: row;
    }

    /*     .contenedor {
        max-width: 500px;
        margin: 5px 10px 5px 10px;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
 */

    .opcion {
        margin: 10px 20px 10px 20px;
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        height: 50px;
    }

    .elemnto {
        margin-left: 10px;
        margin-right: 10px;
    }

    .numer {
        padding-left: 10px;
        font-weight: 500;
    }


    .footer-form {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        align-content: center;
        //margin: 5px;
        //padding: 10px;
    }

    .formulario {
        width: 100%;
        //height:calc(100vh);
        //width: 100vw;
        //overflow-y: scroll;
        //margin-top: 40px;
        padding: 20px;
        //scrollbar-color: map-get($theme-colors, "azul");;
    }

    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        //width: 100vw;
        padding: 0;
        margin: 0;

    }


    .alinear {
        height: 70px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: left;

    }

    .hijo {
        width: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        text-align: left !important;
        align-items: start !important;
    }





    .headerOne {
        padding: 10px;
        //width: 400px;
        display: flex;
    }

    .left {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .filtro ion-icon {
        padding-inline: 5px;
    }

    .boton {
        border-radius: 10px;
        margin-inline: 10px;
        width: 120px;
        height: 40px;
        background-color: var(--color-primary);
        color: white;
        border: none;
        cursor: pointer;
    }







    thead {
        background-color: #fff;
        /* Asegúrate de que el fondo no es transparente */
        position: sticky;
        top: 0;
        /* Esto alinea el encabezado al tope del contenedor de desplazamiento */
        z-index: 100;
        /* Esto asegura que el encabezado se mantenga sobre el contenido desplazable */
    }




    tr th.thc[colspan="3"]:last-child {
        text-align: end;
    }

    .imagen {
        width: 40px;
        height: 40px;
        font-size: 30px;
        font-weight: bold !important;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    /* .open-popup {
        //top: 50% !important;
        visibility: visible !important;
        transform: translate(-50%, -50%) scale(1) !important;
        transition: transform 0.4s, top 0.4s;
        z-index: 1000;
        width: 100%;
    } */

    .contenedor-popup {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.1);
        visibility: hidden;
    }

    .icono {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
    }

    .icono ion-icon {
        color: green;
        font-size: 20px;

    }


    i {
        color: var(--warning);
    }


    .contenido {
        padding-inline: 20px;
        /* padding-top: 60px; */
        height: 100vh;
        overflow-y: auto;
    }


    .table-responsive {
        width: 100%;
        font-size: 10px;
        padding: 10px;
    }

    .table-wrapper {
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 10px;
        border-radius: 3px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    }


    .table-title {
        box-sizing: border-box;
        position: fixed;
        background: #435d7d;
        color: #fff;
        padding: 10px;
        margin: 10px;
        border-radius: 3px 3px 0 0;
    }

    .table-title h2 {
        margin: 5px 0 0;
        font-size: 20px;
    }

    .table-title .btn-group {
        float: right;
    }

    .table-title .btn {
        color: #fff;
        float: right;
        font-size: 13px;
        border: none;
        min-width: 50px;
        border-radius: 2px;
        border: none;
        outline: none !important;
        margin-left: 10px;
    }

    .table-title .btn i {
        float: left;
        font-size: 21px;
        margin-right: 5px;
    }

    .table-title .btn span {
        float: left;
        margin-top: 2px;
    }




    table.table tr th,
    table.table tr td {
        font-size: 13px !important;
        border-color: #e9e9e9;
        padding: 12px 15px;
        vertical-align: middle;
    }

    /* table.table tr th:first-child {
        width: 60px;
    } */

    /* table.table tr th:last-child {
        width: 100px;
    } */

    table.table-striped tbody tr:nth-of-type(odd) {
        background-color: #fcfcfc;

    }

    table.table-striped.table-hover tbody tr:hover {
        background: #f5f5f5;
    }

    table.table th i {
        font-size: 10px;
        margin: 0 5px;
        cursor: pointer;
    }

    table.table td:last-child i {
        opacity: 0.9;
        font-size: 22px;
        margin: 0 5px;
    }

    table.table td a {
        font-weight: bold;
        color: #566787;
        display: inline-block;
        text-decoration: none;
        outline: none !important;

    }

    table.table td a:hover {
        color: #2196F3;
    }

    table.table td a.edit {
        color: #FFC107;
    }

    table.table td a.delete {
        color: #F44336;
    }

    .done i {
        color: #039555 !important;
    }

    .cancel i {
        color: #F44336 !important;
    }

    table.table td i {
        font-size: 19px;
    }

    table.table .avatar {
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;

    }

    .hint-text {
        float: left;
        margin-top: 10px;
        font-size: 13px;
    }

    /* Custom checkbox */
    .custom-checkbox {
        position: relative;
    }

    td input[type="radio"] {
        cursor: pointer;
        width: 20px;
        /* o el tamaño que desees */
        height: 20px;
        /* debe ser igual al width para mantener la proporción */
    }



    .custom-checkbox input[type="checkbox"] {
        opacity: 0;
        position: absolute;
        margin: 5px 0 0 3px;
        z-index: 9;
    }

    .custom-checkbox label:before {
        width: 18px;
        height: 18px;
    }

    .custom-checkbox label:before {
        content: '';
        margin-right: 10px;
        display: inline-block;
        vertical-align: text-top;
        background: white;
        border: 1px solid #bbb;
        border-radius: 2px;
        box-sizing: border-box;
        z-index: 2;
    }

    .custom-checkbox input[type="checkbox"]:checked+label:after {
        content: '';
        position: absolute;
        left: 6px;
        top: 3px;
        width: 6px;
        height: 11px;
        border: solid #000;
        border-width: 0 3px 3px 0;
        transform: inherit;
        z-index: 3;
        transform: rotateZ(45deg);
    }

    .custom-checkbox input[type="checkbox"]:checked+label:before {
        border-color: #03A9F4;
        background: #03A9F4;
    }

    .custom-checkbox input[type="checkbox"]:checked+label:after {
        border-color: #fff;
    }

    .custom-checkbox input[type="checkbox"]:disabled+label:before {
        color: #b8b8b8;
        cursor: auto;
        box-shadow: none;
        background: #ddd;
    }

    /* Modal styles */
    .modal .modal-dialog {
        max-width: 400px;
    }

    .modal .modal-header,
    .modal .modal-body,
    .modal .modal-footer {
        padding: 20px 30px;
    }

    .modal .modal-content {
        border-radius: 3px;
    }

    .modal .modal-footer {
        background: #ecf0f1;
        border-radius: 0 0 3px 3px;
    }

    .modal .modal-title {
        display: inline-block;
    }

    .modal .form-control {
        border-radius: 2px;
        box-shadow: none;
        border-color: #dddddd;
    }

    .modal textarea.form-control {
        resize: vertical;
    }

    .modal .btn {
        border-radius: 2px;
        min-width: 100px;
    }

    .modal form label {
        font-weight: normal;
    }

    /* MODAL YESNO */
    .open-popup {
        visibility: visible !important;
        transform: translate(-50%, -50%) scale(1) !important;
        transition: transform 0.4s, top 0.4s;
        z-index: 700;
        width: 100%;
    }

    .contenedor-popup {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.1);
        visibility: hidden;
    }

    .modal-visor-programacion {
        z-index: 200;
    }
</style>