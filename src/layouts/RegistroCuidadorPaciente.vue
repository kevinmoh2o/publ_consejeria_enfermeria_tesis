<template>
    <div class="table-responsive">
        <div class="table-title" :style="{ width: widthStyle, left: leftStyle }">
            <div class="cabecera-tabla">
                <div class="rigth">
                    <h2>Cuidador - Paciente</h2>
                </div>
                <div class="left" @click="onAdd">
                    <span class="material-symbols-outlined">add_circle</span>
                    <label>Agregar nuevo</label>
                </div>
            </div>
        </div>
        <div class="contenido" :style="{ width: widthStyle, left: leftStyle }">

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="thc" rowspan="2" style="width: 5%;">Estado</th>
                        <th class="thc" colspan="3">Cuidador</th>
                        <th class="thc" colspan="2">Paciente</th>
                        <th class="thc" rowspan="2" style="width: 5%;">Editar</th>
                    </tr>
                    <tr>
                        <th class="thc" style="width: 15%;">Nombre</th>
                        <th class="thc" style="width: 20%;">Correo Electrónico</th>
                        <th class="thc" style="width: 15%;">Celular</th>
                        <th class="thc" style="width: 15%;">Nombre</th>
                        <th class="thc" style="width: 15%;">Celular</th>
                        <!-- <th class="thc" style="width: 15%;">Diagnostico</th> -->
                    </tr>
                </thead>
                
                
                
                <tbody>
                    <tr v-for="(item, index) in valorTabla" :key="index">
                        <td>
                            <div v-if="item.state" class="imagen" v-b-tooltip.hover title="Activo">
                                <span class="material-symbols-outlined" style="color: #039555;">check_circle</span>
                                <p style="color: #039555;">Activo</p>
                            </div>
                            <div v-else class="imagen" v-b-tooltip.hover title="Inactivo">
                                <span class="material-symbols-outlined" style="color: #e23636;">cancel</span>
                                <p style="color: #e23636;">Inactivo</p>
                            </div>
                        </td>
                        <td>{{ item.cuidador.apelPaterno }} {{ item.cuidador.name }}</td>
                        <td>{{ item.cuidador.email }}</td>
                        <td>+51 {{ item.cuidador.phone }}</td>

                        <td>{{ item.paciente.apelPaterno }} {{ item.paciente.name }}</td>
                        <td>+51 {{ item.paciente.phone }}</td>
                        <!-- <td>
                            <div class="icono" @click="onEdit(item)" v-b-tooltip.hover title="Agregar diagnostico">
                                <span class="material-symbols-outlined">local_hospital</span>
                            </div>
                        </td> -->
                        <td>
                            <div class="icono" @click="onEdit(item)" v-b-tooltip.hover title="Editar">
                                <span class="material-symbols-outlined">edit_square</span>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div class="contenido--mobile" v-for="(item, index) in valorTabla" :key="index">
                <TableCard :item="item" @onEdit="onEdit"></TableCard>
            </div>
        </div>




    </div>
    <div class="contenedor-popup" :class="{ 'open-popup': statusModal }">
        <EditarRelacion @cerrarModal="closeModal" @updateUser="updateUser" :userToUpdate="valorGenral"
            :paciente="selectedValue.paciente" :cuidador="selectedValue.cuidador"></EditarRelacion>
    </div>

    <div class="contenedor-popup" :class="{ 'open-popup': statusModalCreate }">
        <ModCrearCuidador ref="modalCuidadorPaciente" 
        @cerrarModal="closeModalCreate" @createRegister="createUSer"
        />
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

    <v-snackbar v-model="snackbar.status" :multi-line="snackbar.multiLine" :timeout="4000" color="success">
        {{ snackbar.message }}

        <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>

</template>

<script>
    import { BTooltip } from 'bootstrap-vue-next'
    import { useRouter } from 'vue-router'
    import ModCrearCuidador from '@/components/modals/ModCrearCuidador.vue';
    import EditarRelacion from '@/components/modals/EditarRelacion.vue';
    import { mapActions, mapGetters } from 'vuex'
    import { defineAsyncComponent, watch, ref } from 'vue'
    import * as GlobalFunc from '@/helpers/GlobalFunc';
    import { buttonSound } from '@/utils/Hardware';

    export default {
        name: 'regis-cuidador-paciente',
        directives: {
            'b-tooltip': BTooltip
        },
        components: {
            EditarRelacion,
            ModCrearCuidador,
            TableCard: defineAsyncComponent(() => import('@/components/common/TableCard.vue')),
            LoadingOverlay: defineAsyncComponent(() => import('@/components/indicadores/LoadingOverlay.vue')),
            SuccessView: defineAsyncComponent(() => import('@/components/indicadores/SuccessView.vue')),
            ErrorView: defineAsyncComponent(() => import('@/components/indicadores/ErrorView.vue')),
        },
        props: {
            isMaxBarraLateral: Boolean,
            rectWidth: Number,
        },
        async mounted() {
            console.log("Registrar Cuidador - Paciente");
            const { state, userProv } = await GlobalFunc.userProviderToVuex(this.$store);
            if (state) {
                this.userData = userProv;
                await this.llamarLista(this.userData.id);
            }
            this.checkMobile();
            window.addEventListener('resize', this.checkMobile);
        },
        setup() {
            const modalCuidadorPaciente = ref(null);
            const statusModalCreate = ref(false);

            const onAdd = () => {
                buttonSound();
                statusModalCreate.value = true;
                //console.log("onAdd");

                //console.log(modalCuidadorPaciente.value.openModal);
                modalCuidadorPaciente.value.resetForm();
                //modalCuidadorPaciente.value.openModal();
            }

            return {
                modalCuidadorPaciente,
                statusModalCreate,
                onAdd,
            }
        },
        data(props) {
            //getRectwidth
            const router = useRouter();



            watch(() => props.rectWidth, (newValue, oldValue) => {
                //('rectWidth ha cambiado:', newValue);
                // Realiza las acciones necesarias aquí cuando rectWidth cambia
            });

            return {


                valorTabla: [],
                apiResponse: { status: null, },
                estadoModal: true,
                loadingData: {
                    status: false,
                    title: "¡Estamos guardando la información del paciente y del cuidador!<br><br>Por favor, espera un momento mientras asociamos estos datos al especialista."
                },
                titulo: 'REGISTROS DEL CUIDADOR PRIMARIO Y PACIENTE',
                router: router,
                userData: {},
                isMobile: false,
                leftOrigin: 0,
                statusModal: false,
                selectedValue: {},
                valorGenral: {},
                snackbar: {
                    status: false,
                    title: "",
                    multiLine: true
                },
            }
        },
        methods: {
            ...mapActions('programacionModule', ['transactionUserPeople', 'listPacienteCuidador', 'updateInformacionPacienteCuidador']),
            ...mapGetters('programacionModule', ['getUserProvider', 'getTranUserPeople', 'getUsuarioPersonaList', 'getUser']),
            async onBackHandle() {
                //console.log("navegando")
                await this.router.push('/menu-main')
            },
            async createUSer(value) {
                //console.log("createUSer value:", value)
                if (!value.state) {
                    this.apiResponse = Object.assign({ status: false, data: null, message: 'Por favor, completa todos los campos obligatorios' }, { title: '¡ OoPs !', btnText: 'Cerrar', navTo: '' });
                    this.loadingData.status = false;
                    return null;
                }
                //this.modalCuidadorPaciente.closeModal();
                this.loadingData.status = true;
                this.loadingData.title = "¡Estamos guardando la información del paciente y del cuidador!<br><br>Por favor, espera un momento mientras asociamos estos datos al especialista.";

                const { perPac, perCui } = value;
                await this.transactionUserPeople({ id: this.userData.id, perPac, perCui })
                const { status, data, message } = await this.getTranUserPeople();
                //console.log("{ status, data,message }: ", { status, data, message })
                /* if (status) {
                    this.apiResponse = Object.assign({ status, data, message }, { title: '¡Genial!', btnText: 'Continuar', navTo: '/menu-main' });
                } else {
                    this.apiResponse = Object.assign({ status, data, message }, { title: '¡ OoPs !', btnText: 'Cerrar', navTo: '' });
                } */
                await this.llamarLista(this.userData.id)
                this.loadingData.status = false;
                this.snackbar = {
                    status,
                    message
                };

            },
            closeModal(value) {
                //console.log("cerrando modal padre: ",value)
                this.statusModal = false;
            },
            closeModalCreate(value) {
                //console.log("cerrando modal padre: ",value)
                this.statusModalCreate = false;
                this.modalCuidadorPaciente.resetForm();
            },
            onEdit(value) {
                buttonSound();
                //console.log("onEdit: ", value)
                this.selectedValue = {};
                this.statusModal = !this.statusModal;
                this.valorGenral = value;
                this.selectedValue = {
                    paciente: value.paciente,
                    cuidador: value.cuidador,
                }/* 
                console.log(value)
                console.log(this.statusModal) */
            },
            hadlerCloseIndicator(value) {
                this.apiResponse.status = null;
            },
            async llamarLista(value) {
                try {
                    await this.listPacienteCuidador({ id: value, isActive: true });
                    const { status, data } = this.getUsuarioPersonaList();
                    this.valorTabla = data;
                    //console.log("Todo bien: ", { status, data });
                } catch (error) {
                    console.log("Todo mal: ", error);
                }

            },
            checkMobile() {
                this.isMobile = window.innerWidth <= 600;
            },
            async updateUser(valor) {
                this.loadingData.status = true;
                this.loadingData.title = "¡Estamos guardando la información del paciente y del cuidador!<br><br>Por favor, espera un momento mientras se guarda la actualización.";
                //console.log("dedsde el PADRE update: ", valor);
                const { status, message } = await this.updateInformacionPacienteCuidador(valor);
                //console.log("rptUdt: ", rptUdt)
                //await this.sleep(5000)
                this.loadingData.status = false;
                this.snackbar = {
                    status,
                    message
                };

            },
            async sleep(ms) {
                return await new Promise(resolve => setTimeout(resolve, ms));
            }
        },
        computed: {
            widthStyle() {
                if (this.isMobile) {
                    return `calc(100%)`;
                } else {
                    //console.log("valor width: ", `calc(100vw - ${this.rectWidth}px)`)
                    return `calc(100vw - ${this.rectWidth}px)`;
                }
            },
            leftStyle() {
                if (this.isMobile) {
                    return 0;
                } else {
                    return `${this.rectWidth}px`;
                }
            },

        },
    }
</script>

<style lang="scss" scoped>

    .contenido--mobile {
        display: none;
    }


    .cabecera-tabla {
        height: 70px;
        width: 100%;
        color: black;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-inline: 10px;
        background: white;

    }

    .cabecera-tabla .left {
        cursor: pointer;
        user-select: none;
        background-color: var(--color-primary);
        width: 150px;
        margin-inline: 10px;
        border-radius: 10px;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 10;
    }

    .left span {
        padding-inline: 5px;
    }

    .left label {
        cursor: pointer;
        font-size: 13px;
        z-index: 5;
    }

    .cabecera-tabla .rigth {
        width: auto;
        font-weight: 700;
    }

    .cabecera-tabla .rigth h2 {
        margin: 0;
        padding: 0;
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


    .open-popup {
        //top: 50% !important;
        visibility: visible !important;
        transform: translate(-50%, -50%) scale(1) !important;
        transition: transform 0.4s, top 0.4s;
        z-index: 1000;
        width: 100%;
    }

    .contenedor-popup {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.1);
        visibility: hidden;
    }

    .icono {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
    }

    .icono span {
        color: green;
        font-size: 20px;

    }
    .imagen{
        display: flex;
        flex-direction: column;
        
    }

    .imagen p {
        font-size: 12px;
        font-weight: 600;
        margin:0;
    }


    i {
        color: var(--warning);
    }


    .contenido {
        width: 100%;
        height: 100vh;
        padding-top: 70px;
        padding-inline: 10px;
        overflow-y: auto;
    }


    .table-responsive {
        width: 100%;
        font-size: 10px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
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
        /* height: 100vh; */
        box-sizing: border-box;
        width: 100%;
        color: #fff;
        border-radius: 3px 3px 0 0;
        position: fixed;
        top: 0;
        left: 0;
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

    table tr th {
        border-bottom: 2px solid #969696 !important;
        border-top: 2px solid #969696 !important;
    }


    table.table tr th,
    table.table tr td {
        font-size: 13px !important;
        border-color: #e9e9e9;
        padding: 12px 15px;
        vertical-align: middle;

        overflow: hidden;
    }

    table.table tr th:first-child {
        width: 60px;
    }

    table.table tr th:last-child {
        width: 100px;
    }

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


    .thc {
        border-left: 2px solid rgb(73, 73, 73);
        border-right: 2px solid grey;
        text-align: center; /* Centra el texto en cada celda */
        font-weight: 700;
    }
    
    thead th:first-child {
        border-left: none;
    }
    
    thead th:last-child {
        border-right: none;
    }
    
    @media (max-width:600px) {

        .table {
            width: 500px;
            overflow-x: auto;
            display: none;
        }

        .table {
            min-width: 1000px;
            /* Por ejemplo, asegura que la tabla sea más ancha que el contenedor */
        }

        .contenido--mobile {
            display: flex;
        }

    }
</style>