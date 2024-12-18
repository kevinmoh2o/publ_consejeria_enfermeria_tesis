<template>
    <form class="formDP">

        <div class="cabecera">
            <div class="headerOne">
                <div class="left">
                    <div class="selector">
                        <input v-model="readDate" class="mes" type="month" name="Mes" id="" min="2024-02" max="2024-12"
                            lang="es">
                    </div>

                    <div class="filtro">
                        <button class="boton" @click.prevent="onfilter">
                            <ion-icon name="filter-outline"></ion-icon>
                            Filtrar
                        </button>
                    </div>
                </div>
                <div class="right">
                    <div class="filtro">
                        <button class="boton" @click.prevent="onSave" :class="{ 'desabilitado': objArray.length === 0 }"
                            :disabled="objArray.length === 0">
                            <ion-icon name="save-outline"></ion-icon>
                            Guardar
                        </button>
                    </div>
                </div>

            </div>

            <div class="etiquetas">
                <div v-if="objArray.length > 0" class="caja1">
                    <h3>MES:</h3>
                    <span>{{ vMetaData.nombreFecha }}</span>
                </div>

                <div v-if="consejeroData != null" class="caja1">
                    <h3>LICENCIADO:</h3>
                    <span>{{ consejeroData.fullName }}</span>
                </div>

            </div>
        </div>


        <div v-if="!loadingLocal" class="wrapper">
            <div class="table-container" :style="{ width: widthStyle }">
                <!-- <input type="checkbox" v-model="tablaDate"> -->
                <table>
                    <thead>
                        <tr>
                            <th v-for="(item, index) in dias" :key="index">{{ item }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, rowIndex) in objArray" :key="rowIndex">
                            <td v-for="(cell, cellIndex) in row" :key="cellIndex" :data-cell="cell.label">
                                <span v-if="cell.label === 'Nombre del Cuidador'">{{ cell.valor }}</span>
                                <input v-else-if="cell.label === 'Total'" type="number" class="total"
                                    :value="totalValue(rowIndex)" readonly>
                                <input v-else type="checkbox" class="entrada" v-model="cell.data">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <LoadCuy v-if="loadingLocal"></LoadCuy>

    </form>

    <ModConsejeria :lista="valorTabla" @selectedObjConsejeria="selectedObjConsejeria">
    </ModConsejeria>


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


</template>


<script>
    import { useRouter } from 'vue-router';
    import { mapActions, mapGetters, useStore } from 'vuex';
    import { ref, onMounted, reactive, defineAsyncComponent } from 'vue';
    import ModConsejeria from '@/components/modals/ModConsejeria.vue';
    import LoadCuy from '@/components/indicadores/LoadCuy.vue';
    import * as TimeFunction from '@/helpers/timeFunction'
    import * as GlobalFunc from '@/helpers/GlobalFunc';
    import { buttonSound } from '@/utils/Hardware';
    export default {
        name: 'regiconsejeria-layout',
        props: {
            isMaxBarraLateral: Boolean,
            rectWidth: Number,
        },
        setup() {
            const router = useRouter();
            const store = useStore();
            const titulo = 'REGISTROS DE CONSEJERÍA';
            const valorTabla = ref([]);
            //const userData = ref(null);
            const selectedValue = ref(null);
            const vSelectedValueBool = ref(false);
            const dias = ref([]);
            const objArray = ref([]);
            const readDate = ref(TimeFunction.resetValues());
            const tablaDate = ref([]);
            const vMetaData = ref({});
            const consejeroData = ref({});
            const isCreate = ref(true);
            const loadingLocal = ref(false);
            const contadorSave = ref(0);


            onMounted(async () => {
                console.log("Registrar Asistencia a Consejeria");
                loadingLocal.value = true;
                const { state, userProv } = await GlobalFunc.userProviderToVuex(store);
                if (state) {
                    consejeroData.value = userProv;
                    await llamarLista(consejeroData.value.id);
                }

                
                //var usertest = await localStorage.user;
                //consejeroData.value = usertest !== null ? JSON.parse(usertest) : null;
                

                //console.log(userData);
                vMetaData.value['nombreFecha'] = TimeFunction.obtenerNombreMes(readDate.value);
                loadingLocal.value = false;
            });


            const loadingData = reactive({
                status: ref(false),
                title: ref("Autenticando usuario...")
            });


            const obtenerFechasDelMes = async (mes) => {
                //console.log("Fechas filtro: ", mes)
                //console.log("consejeroData: ", consejeroData.value)
                //console.log("consejero paciente relacion: ", valorTabla.value)

                dias.value = [];
                vMetaData.value['nombreFecha'] = TimeFunction.obtenerNombreMes(readDate.value);
                const [año, mesNumerico] = mes.split('-').map(Number);
                const fecha = new Date();
                fecha.setFullYear(año);
                fecha.setMonth(mesNumerico - 1);
                const numeroDias = new Date(año, mesNumerico, 0).getDate();
                const fechas = [];
                for (let i = 1; i <= numeroDias; i++) {
                    fechas.push(i);
                }
                //console.log("Fechas 1: ", fechas)
                fechas.unshift("Nombre del Cuidador");
                fechas.push("Total");
                dias.value = fechas;

                const { status, data, message } = await store.dispatch('programacionModule/getListaAsistencia', { idconsejero: consejeroData.value.id, fecha: readDate.value, isActive: true });
                isCreate.value = data.length == 0;
                //console.log("Existe grabaciones o no?: ", data)
                //console.log("Existe grabaciones o no?: ", data.length)

                if (isCreate.value) {
                    grabarNuevo(fechas);
                } else {
                    actualizarExistentes(data, fechas)
                }
            };


            const grabarNuevo = (fechas) => {
                //console.log("grabarNuevo: ", fechas)
                var nombres = []
                valorTabla.value.forEach((item) => {
                    nombres.push({ vId: item.idUsuarioPersona, idConsejero: item.id, name: `${item.cuidador.name} ${item.cuidador.apelPaterno} ${item.cuidador.apelMaterno}` })
                })

                nombres.forEach((item) => {
                    var tempArr = [];
                    fechas.forEach((elem) => {
                        if (elem == 'Nombre del Cuidador') tempArr.push({ valor: `${item.name}`, label: elem, data: false, vid: item.vId, idConsejero: item.idConsejero });
                        else if (elem == 'Total') tempArr.push({ valor: 0, label: elem, data: false });
                        else tempArr.push({ valor: `<input type="checkbox" class="entrada">`, label: elem, data: false });
                    })
                    objArray.value.push(tempArr)
                })
                //console.log(objArray);
            }



            const actualizarExistentes = (data, fechas) => {
                //console.log("fechas actualizacion: ", fechas)
                //console.log("data: ", data)

                var obejotoModificar = [];
                data.forEach((item) => {
                    var tempArr = [];
                    //console.log("item: ",item);
                    const { id, fecha, data, idConsejero, idRelUserPeople, name } = item;
                    data.forEach((value) => {
                        //console.log(value);
                        tempArr.push({ valor: `<input type="checkbox" class="entrada">`, label: value.label, data: value.data })
                    })
                    tempArr.unshift({ valor: name, label: "Nombre del Cuidador", data: false, idConsejero, idRelUserPeople, fecha, id });
                    tempArr.push({ valor: 0, label: "Total", data: false });
                    obejotoModificar.push(tempArr)
                    //console.log(tempArr);
                })
                //console.log(obejotoModificar);
                objArray.value = obejotoModificar;
            }


            const apiResponse = reactive({
                status: ref(null)
            });

            const onBackHandle = async () => {
                //console.log("navegando")
                await router.push('/menu-main')
            };

            const llamarLista = async (value) => {
                try {
                    //await store.dispatch('programacionModule/saveAsistenciaConsejeria', { id: value, isActive: true });
                    const { status, data } = store.getters['programacionModule/getUsuarioPersonaList'];
                    valorTabla.value = data;
                    //console.log("Todo bien: ", { status, data });
                } catch (error) {
                    console.log("Todo mal: ", error);
                }
            };

            const selectedObjConsejeria = (val) => {
                selectedValue.value = val;
                //console.log("val consejeria en padre-padre: ", val)
                return val;
            };

            const select = (index) => {
                // Tu lógica para manejar la selección
            };



            const funConcatName = (val) => {
                return `${val.apelPaterno} ${val.apelMaterno} ${val.name}`.toUpperCase();
            }

            const funCalcAge = (val) => {
                const date1 = new Date();
                const date2 = new Date(val.birthDate);
                const differenceMs = date1 - date2;
                const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
                return `${val.birthDate.split("-").reverse().join("/")}  (${Math.round(differenceMs / millisecondsPerYear)} años)`;
            }

            const funGender = (val) => `${val.gender == "2" ? 'Masculino' : 'Femenino'}`;
            const funOcupation = (val) => val.ocupation.toUpperCase();
            const funPhone = (val) => val.phone;

            const onfilter = async (val) => {
                buttonSound();
                contadorSave.value = 0;
                loadingLocal.value = true;
                //console.log("onfilter");
                //console.log(consejeroData.value.fullName);

                dias.value = [];
                objArray.value = [];
                await obtenerFechasDelMes(readDate.value);
                loadingLocal.value = false;
            }

            const onSave = async () => {
                loadingLocal.value = true;
                //var outSave = [];

                if (isCreate.value && contadorSave.value == 0) {
                    //console.log("storeToCloud");
                    await storeToCloud();
                    await onfilter();
                } else {
                    //console.log("updateToCloud");
                    await updateToCloud();
                }
                loadingLocal.value = false;
                contadorSave.value++;
                //console.log("contadorSave.value: ", contadorSave.value);
            }

            const storeToCloud = async () => {
                var outSave = [];
                objArray.value.forEach((item) => {
                    var tId = '';
                    var tIdconsejero = '';
                    var tname = '';
                    var tempSave = [];
                    item.forEach((val) => {
                        const { label, data, vid, idConsejero, valor } = val;
                        //console.log({ label, data, vid, idConsejero, valor })
                        if (label == 'Nombre del Cuidador') {
                            tId = vid;
                            tIdconsejero = idConsejero;
                            tname = valor;
                        }
                        if (!(label == 'Nombre del Cuidador' || label == 'Total')) {
                            tempSave.push({ label, data })
                        }
                    });
                    outSave.push({ data: tempSave, idRelUserPeople: tId, fecha: readDate.value, idConsejero: tIdconsejero, name: tname })
                });
                await store.dispatch('programacionModule/saveAsistenciaConsejeria', outSave);
            }


            const updateToCloud = async () => {
                var outSave = [];
                objArray.value.forEach((item) => {
                    var tempSave = [];
                    const { id, fecha, idConsejero, idRelUserPeople, valor } = item[0];
                    item.forEach((val) => {
                        if (!(val.label == 'Nombre del Cuidador' || val.label == 'Total')) {
                            tempSave.push({ label: val.label, data: val.data })
                        }
                    });
                    outSave.push({ id, data: { data: tempSave, idRelUserPeople, fecha, idConsejero, name: valor } })
                });

                await store.dispatch('programacionModule/updateListaAsistencia', outSave);
            }

            return {
                vMetaData,
                vSelectedValueBool,
                loadingData,
                apiResponse,
                titulo,
                router,
                valorTabla,
                //userData,
                consejeroData,
                onBackHandle,
                selectedObjConsejeria,
                select,
                selectedValue,
                funConcatName,
                funCalcAge,
                funGender,
                funOcupation,
                funPhone,
                dias,
                objArray,
                readDate,
                onfilter,
                onSave,
                tablaDate,
                loadingLocal,
            };
        },
        methods: {
            ...mapActions('programacionModule', ['deleteEntry', 'setIsLoading', 'getUserByEmail', 'grabarNroProgramacion']),
            ...mapGetters('programacionModule', ['getEstado', 'getUser', 'getStatte']),
            async grabarConsejeria() {
                //console.log("selectedValue.value: ", this.selectedValue);
                this.loadingData.status = true;
                this.loadingData.title = "Grabando Número de consejería...";

                var obj = {
                    idConsejero: this.selectedValue.id,
                    idUsuarioPersona: this.selectedValue.idUsuarioPersona,
                    nroConsejeria: this.selectedValue.nroConsejeria + 1,
                    state: true,
                };
                const { message, status } = await this.grabarNroProgramacion(obj);
                //console.log("obj: ", obj);
                if (status) {
                    this.apiResponse = { status, message, title: '¡Genial!', btnText: 'Continuar', navTo: '/menu-main' };
                } else {
                    this.apiResponse = { status, message, title: '¡ OoPs !', btnText: 'Cerrar', navTo: '/menu-main' };
                }
                this.loadingData.status = false;
            },
            totalValue(rowIndex) {
                // Calcular la suma de los valores de los checkboxes seleccionados en la fila especificada
                let total = 0;
                this.objArray[rowIndex].forEach(cell => {
                    if (cell.label !== 'Total' && cell.data === true) {
                        total++;
                    }
                });
                return total;
            }
        },
        computed: {
            widthStyle() {
                if (this.isMobile) {
                    return `calc(100% - ${20}px)`;
                } else {
                    return `calc(100% - ${this.rectWidth + 20}px)`;
                }
            },

        },
        components: {
            LoadCuy,
            ModConsejeria,
            LoadingOverlay: defineAsyncComponent(() => import('@/components/indicadores/LoadingOverlay.vue')),
            SuccessView: defineAsyncComponent(() => import('@/components/indicadores/SuccessView.vue')),
            ErrorView: defineAsyncComponent(() => import('@/components/indicadores/ErrorView.vue')),
        }
    };
</script>
<style lang="scss" scoped>

    .desabilitado {
        background-color: grey !important;
        cursor: no-drop !important;
    }

    .cabecera {
        position: sticky;
        top: 0;
        background-color: white;
        z-index: 5;
    }


    .etiquetas {
        display: flex;
        flex-direction: row;
        gap: 5px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .etiquetas .caja1 {
        display: flex;
        flex-direction: column;
        background-color: rgb(240, 240, 240);
        //border: 2px solid rgb(203, 201, 201);
        padding-top: 10px;
        padding-bottom: 10px;
        padding-inline: 15px;
        margin: 5px;
        border-radius: 15px;
        width: 230px;
        //overflow-x: hidden;
        justify-content: center;
        text-transform: uppercase;
    }

    .etiquetas .caja1 h3 {
        font-size: 15px;
    }

    .etiquetas .caja1 span {
        font-size: 13px;
        font-weight: 400;
        color: #666666;
    }

    input:focus {
        border-color: var(--warning);
        box-shadow: 0 0 5px rgba(255, 230, 0, 0.5);
        outline: none;
    }

    input[type="number"] {
        //border-radius: 7px;
        border: none;
        width: 40px !important;
        text-align: right;
    }

    input .total {
        display: flex;
        justify-content: center;
        align-items: center;
    }


    input[type="month"] {
        appearance: none;
        -webkit-appearance: none;
        border-radius: 10px;
        border: 1px solid grey;
        height: 40px;
        padding-inline: 10px;

    }

    input[type="month"]:hover {
        border: 2px solid rgb(92, 92, 92);
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

    boton ion-icon {
        font-size: 20px;
        display: flex;
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







    .wrapper {
        //border: 2px solid red;
        //height: 100vh;
        background-color: #f6f6f6;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: colusmn;
        width: 100%;
        overflow-x: auto;
        flex-wrap: wrap;
        //overflow-x: auto;
    }

    tbody {
        /* background-color: white; */
        border-radius: 15px;
    }

    table {
        border-collapse: collapse;
        background-color: #ffffff;
        /* color: white; */
        /* border-radius: 15px; */
        padding: 1rem;
        width: 100%;
    }


    .titulo {
        position: fixed;
        height: 100px;
        top: 0;
        left: 0;
        background-color: white;
        width: 100%;
    }


    input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        width: 25px;
        height: 25px;
        cursor: pointer;
        margin: 3px 3px 3px 4px;
        padding: 0;
        border: 1.5px solid green;
        accent-color: green;
        border-radius: 5px;
        transition: all 0.5s ease;
    }




    input[type="checkbox"]:checked {
        transform: scale(1);
        width: 25px;
        height: 25px;
        background-color: green;
        border-radius: 5px;
        border: 1px solid green;
        clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
        z-index: 1;
    }

    /* .entrada{
    width: 30px;
    border: 1px solid red;
    padding: 0;
} */
    table {
        width: calc(100% - 20px);
    }

    table th {
        width: auto;
    }


    table th:first-child,
    table td:first-child {
        border-left: none;
        width: 150px;
    }

    table th:last-child,
    table td:last-child {
        border-right: none;
    }

    .table-container {
        padding: 10px;
        //width: calc(100% - 20px);
        //border: 2px solid blue;
        //display: flex;
        //flex-wrap: wrap;
        overflow-x: auto;
        //padding-inline: 5px;
        //justify-content: center
    }


    /* .table-container th:last-child {
        resize: none;
    } */

    tr th {
        border-bottom: 2px solid #838282;
        border-right: 1px solid #bbb9b9;
        color: rgb(46, 46, 46);
        font-weight: 700;
    }

    td {
        /* border-top: 1px solid #ff0000; */
        border-bottom: 1px solid #bbb9b9;
        border-right: 1px solid #bbb9b9;
        text-transform: capitalize;
    }


    caption,
    th,
    td {
        /* background: white; */
        /* padding: 0.5rem; */
        /* padding-top: 5px;
    padding-bottom: 5px; */
        padding-left: 5px;
        vertical-align: middle;
    }

    caption,
    th {
        text-align: left;
    }






    /* Estilo para los encabezados de las columnas */
    .table-container th:first-child {
        resize: horizontal;
        overflow: hidden;
        /*  white-space: nowrap; */
    }


    td div {
        display: flex;
        justify-content: start;
        align-items: center;
    }



    @media(max-width: 800px) {
        th {
            display: none;
        }

        td {
            display: grid;
            gap: 0.5rem;
            padding: .5rem 1rem;
            grid-template-columns: 15ch auto;
        }

        td:first-child {
            padding-top: 10px;
        }

        table td:first-child {
            margin: 0;
            width: 100%;
        }

        td:last-child {
            padding-bottom: 2rem;
        }

        td::before {
            content: attr(data-cell) " :";
            font-weight: 700;
            text-transform: capitalize;
        }

        .formDP {
            height: 100vh;
            overflow-y: auto;
        }

        .table-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            width: auto;
            height: auto;
            overflow-y: hidden;
        }

        .wrapper {
            height: auto;
        }


    }

</style>s