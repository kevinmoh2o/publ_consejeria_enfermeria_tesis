<template>
    <div class="navbar">
        <Navbar :estadoTitulo="true" :estadoFlecha="true" :titulo="'Crear Cuenta'" @volver="onBackHandle"></Navbar>
    </div>

    <div class="pagina">
        <form @submit.prevent="onPressCrear" novalidate>
            <div class="seccion">
                <h4>DATOS PERSONALES</h4>
                <hr class="hr-estilo" />
                <div class="form-crear">

                    <div class="box">
                        <label for="validationCustom01" class="form-label cus--label"><span>*</span> Primer
                            Nombre:</label>
                        <input type="text" class="form-control capitalize" id="validationCustom01"
                            v-model.trim="data.firstName" required>
                        <div class="invalid-feedback">
                            Escriba un nombre válido.
                        </div>
                    </div>

                    <div class="box">
                        <label for="validationCustom02" class="form-label cus--label">Segundo Nombre:</label>
                        <input type="text" class="form-control capitalize" v-model.trim="data.secondName">

                    </div>

                    <div class="box">
                        <label for="validationCustom03" class="form-label cus--label"><span>*</span> Apellido
                            Paterno:</label>
                        <input type="text" class="form-control capitalize" id="validationCustom03"
                            v-model.trim="data.apelPaterno" required>
                        <div class="invalid-feedback">
                            Escriba un apellido válido.
                        </div>
                    </div>

                    <div class="box">
                        <label for="validationCustom04" class="form-label cus--label"><span>*</span> Apellido
                            Materno:</label>
                        <input type="text" class="form-control capitalize" id="validationCustom04"
                            v-model.trim="data.apelMaterno" required>
                        <div class="invalid-feedback">
                            Escriba un apellido válido.
                        </div>
                    </div>


                    <div class="box">
                        <label for="validationCustom05" class="form-label cus--label"><span>*</span> Sexo:</label>
                        <select class="form-select capitalize" id="validationCustom05" v-model="data.gender" required>
                            <option selected disabled value="">Seleccionar</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                        <div class="invalid-feedback">
                            Seleccione un valor.
                        </div>
                    </div>

                    <div class="box">
                        <label for="startDate" class="form-label cus--label"><span>*</span> Fecha de Nacimiento</label>
                        <input id="startDate" class="form-control" type="date" v-model="data.birthDate" required />
                        <span id="startDateSelected"></span>
                        <div class="invalid-feedback">
                            Fecha incorrecta.
                        </div>
                    </div>

                    <div class="box">
                        <label for="valiEmail" class="form-label cus--label"><span>*</span> Email:</label>
                        <input type="email" class="form-control" id="valiEmail" v-model.trim="data.email" required>
                        <div class="invalid-feedback">
                            Escriba un dirección de correo electrónico válida.
                        </div>
                    </div>

                    <div class="box">
                        <label for="valiPhone" class="form-label cus--label"><span>*</span> Celular:</label>
                        <input type="text" class="form-control" id="valiPhone" v-model.trim="data.phoneNumber"
                            title="Ingrese exactamente 9 dígitos." required>
                        <div class="invalid-feedback">
                            Ingrese exactamente 9 dígitos.
                        </div>
                    </div>



                </div>
            </div>


            <div class="seccion">
                <h4>DATOS GEOGRÁFICOS</h4>
                <hr class="hr-estilo" />
                <div class="form-crear">


                    <div class="box--2">
                        <label for="validationCustom06" class="form-label cus--label"><span>*</span> Centro de
                            Salud:</label>
                        <input type="text" class="form-control capitalize" id="validationCustom06"
                            v-model.trim="data.centroSalud" maxlength="70" required>
                        <div class="invalid-feedback">
                            Ingrese un valor.
                        </div>
                    </div>


                    <div class="box--2">
                        <label for="validationCustom07" class="form-label cus--label"><span>*</span> Distrito:</label>
                        <input type="text" class="form-control capitalize" id="validationCustom07"
                            v-model.trim="data.distrito" maxlength="20" required>
                        <div class="invalid-feedback">
                            Ingrese un valor.
                        </div>
                    </div>

                    <div class="box">
                        <label for="validationCustom08" class="form-label cus--label"><span>*</span>
                            Diris/Diresa:</label>
                        <select class="form-select capitalize" id="validationCustom08" v-model="data.diris" required>
                            <option selected disabled value="">Seleccionar</option>
                            <option value="1">Diris Lima Sur</option>
                            <option value="2">Diris Lima Norte</option>
                            <option value="3">Diris Lima Este</option>
                            <option value="4">Diris Lima Oeste</option>
                            <option value="5">Diris Lima Centro</option>
                            <option value="6">Diresa Regional Callao</option>
                        </select>
                        <div class="invalid-feedback">
                            Seleccione un valor.
                        </div>
                    </div>


                    <div class="box">
                        <label for="validationCustom09" class="form-label cus--label"><span>*</span> Condicion
                            Laboral:</label>
                        <select class="form-select" id="validationCustom09" v-model="data.workCondition" required>
                            <option selected disabled value="">Seleccionar</option>
                            <option value="1">Activo</option>
                            <option value="2">Ausente</option>
                            <option value="3">Vacaciones</option>
                        </select>
                        <div class="invalid-feedback">
                            Seleccione un valor.
                        </div>
                    </div>


                    <div class="box--3">
                        <label for="validationCustom10" class="form-label cus--label"><span>*</span> Tiempo laborando en
                            el
                            CSMC:</label>
                        <select class="form-select" id="validationCustom10" v-model="data.workHours" required>
                            <option selected disabled value="">Seleccionar</option>
                            <option value="1">6 meses</option>
                            <option value="2">1 año</option>
                            <option value="3">2 años</option>
                            <option value="4">3 años</option>
                            <option value="5">4 años</option>
                            <option value="6">5 años a más</option>
                        </select>
                        <div class="invalid-feedback">
                            Seleccione un valor.
                        </div>
                    </div>

                </div>
            </div>


            <div class="seccion">
                <h4>MIS CREDENCIALES</h4>
                <hr class="hr-estilo" />
                <div class="form-crear">

                    <div class="box">
                        <label for="validationCustom11" class="form-label cus--label"><span>*</span> DNI:</label>
                        <input type="text" class="form-control" id="validationCustom11" v-model.trim="data.dni"
                            maxlength="8" minlength="8" required>
                        <div class="invalid-feedback">
                            Escriba un DNI válido.
                        </div>
                    </div>

                    <div class="box">
                        <label for="validationCustom12" class="form-label cus--label"><span>*</span> Contraseña:</label>
                        <input type="password" class="form-control" id="validationCustom12" maxlength="12" minlength="6"
                            autocomplete="new-password" v-model.trim="data.password" required>
                        <div class="invalid-feedback">
                            Entre 6-12 caracteres.
                        </div>
                    </div>

                    <div class="box">
                        <label for="validationCustom13" class="form-label cus--label"><span>*</span> Confirmar
                            Contraseña:</label>
                        <input type="password" class="form-control" id="validationCustom13" maxlength="12" minlength="6"
                            autocomplete="new-password" v-model.trim="data.verifyPassword" required>
                        <div class="invalid-feedback">
                            Entre 6-12 caracteres.
                        </div>
                    </div>

                </div>
            </div>


            <hr class="hr-estilo">

            <div class="btn-estilo">
                <button type="submit" class="btn btn-success">Crear</button>
            </div>

        </form>
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
</template>

<script>
    import Navbar from '@/components/compose/Navbar.vue';
    import { useRouter } from 'vue-router';
    import { mapActions, mapGetters } from 'vuex';
    import { defineAsyncComponent } from 'vue';
    import { buttonSound } from '@/utils/Hardware';


    export default {
        name: 'Crear-Cuenta',
        components: {
            Navbar,
            LoadingOverlay: defineAsyncComponent(() => import('@/components/indicadores/LoadingOverlay.vue')),
            SuccessView: defineAsyncComponent(() => import('@/components/indicadores/SuccessView.vue')),
            ErrorView: defineAsyncComponent(() => import('@/components/indicadores/ErrorView.vue')),
        },
        props: {
            msg: String
        },
        data() {
            const router = useRouter()
            return {
                data: {
                    firstName: '',
                    secondName: '',
                    apelPaterno: '',
                    apelMaterno: '',
                    gender: '',
                    birthDate: '',
                    centroSalud: '',
                    distrito: '',
                    diris: '',
                    dni: '',
                    password: '',
                    verifyPassword: '',
                    email: '',
                    role: 'USER_ROLE',
                    workCondition: '',
                    reviewAllSections: false,
                    satisfactionQuest: false,
                    workHours: '',
                    createdAt: '',
                    state: false,
                    phoneNumber: ''
                },
                loadingData: {
                    status: false,
                    title: "Creando cuenta de Usuario ..."
                },
                apiResponse: { status: null, },
                selectedTime: '',
                timeOptions: [],
                router: router
            };
        },
        mounted() {
            console.log("Crear Cuenta")
            this.generateTimeOptions();
        },
        methods: {
            ...mapActions('programacionModule', ['crearUsuario', 'deleteEntry', 'setIsLoading']),
            ...mapGetters('programacionModule', ['getEstado', 'getRptHttp']),
            async onPressCrear(event) {
                buttonSound();
                //console.log("event: ", event)
                var validateForm = this.submitForm(event);
                //console.log("validateForm: ", validateForm)
                if (!validateForm) {
                    this.apiResponse = Object.assign({ status: false, data: null, message: 'Por favor, completa todos los campos obligatorios' }, { title: '¡ OoPs !', btnText: 'Cerrar', navTo: '' });
                    this.loadingData.status = false;
                    return null;
                }
                if (this.data.password != this.data.verifyPassword) {
                    this.apiResponse = Object.assign({ status: false, data: null, message: 'Las contraseñas deben de coincidir' }, { title: '¡ OoPs !', btnText: 'Cerrar', navTo: '' });
                    this.loadingData.status = false;
                    return null;
                }

                this.loadingData.status = true;
                try {
                    await this.crearUsuario(this.data);
                    var { status, message, title } = this.getRptHttp();
                    //console.log("crear usuario ", { status, message });
                    this.loadingData.status = false;
                    if (status) {
                        this.apiResponse = { status: true, data: null, message, title, btnText: 'Continuar', navTo: '/' };
                    } else {
                        this.apiResponse = Object.assign({ status: false, data: null, message, title: '¡ OoPs !', btnText: 'Cerrar', navTo: '' });
                    }
                } catch (error) {
                    console.log("error: " + error)
                }
                this.loadingData.status = false;
            },
            async sleep(ms) {
                return await new Promise(resolve => setTimeout(resolve, ms));
            },
            generateTimeOptions() {
                for (let hour = 8; hour <= 20; hour++) {
                    for (let minute = 0; minute < 60; minute += 10) {
                        const formattedHour = (hour < 10 ? '0' : '') + hour;
                        const formattedMinute = (minute < 10 ? '0' : '') + minute;
                        const timeValue = `${formattedHour}:${formattedMinute}`;
                        this.timeOptions.push(timeValue);
                    }
                }
            },
            /* isValid(fieldName) {
                console.log()
                return this.validation[fieldName];
            }, */
            submitForm(event) {

                const form = event.target;
                var validador = form.checkValidity();
                //console.log(form.checkValidity())
                if (!validador) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                return validador;
            },
            async onBackHandle() {
                buttonSound();
                //console.log("navegando")
                await this.router.push('/')
            },
            hadlerCloseIndicator(value) {
                this.apiResponse.status = null;
            }
        },
        watch: {
            'data.phoneNumber'(val) {
                this.data.phoneNumber = val.replace(/\D/g, '').slice(0, 9);
            },
            'data.firstName'(val) {
                this.data.firstName = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'data.secondName'(val) {
                this.data.secondName = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'data.apelPaterno'(val) {
                this.data.apelPaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'data.apelMaterno'(val) {
                this.data.apelMaterno = val.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s\-]/g, '').slice(0, 20);
            },
            'data.dni'(val) {
                this.data.dni = val.replace(/\D/g, '').slice(0, 8);
            },





            /* centroSalud: '',
    
            password: '',
            verifyPassword: '',
            email: '',
    


            workHours: '',
            createdAt: '',
            state: false,
            phoneNumber: '' */
        }
    }
</script>

<style scoped>

    input {
        letter-spacing: 1px
    }

    .navbar {
        padding: 0;
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        z-index: 100;
    }

    div h4 {
        font-size: 20px;
        padding-inline: 15px;
        padding-block: 5px;
        margin: 0;
    }

    span {
        padding: 0;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: red;
        font-weight: bolder;
        font-size: 20px;
    }

    .pagina {
        width: 100%;
        box-sizing: border-box;
        padding-top: 70px;
        overflow-y: auto !important;
        overflow-x: hidden;
        min-height: 100%;
        height: 100vh;
    }

    .seccion {
        width: 100%;
        margin-top: 10px;
    }

    .seccion>h4 {
        font-weight: 600;
        color: rgb(58, 58, 58);
        font-size: 17px;
    }

    button {
        width: 200px;
    }

    .form-contenedor {
        width: 100%;
    }

    .btn-estilo {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 20px;
    }

    .cus--label {
        color: rgb(117, 117, 117);
        font-size: 15px;
        font-weight: 700;
        margin: 0;
    }

    .form-crear {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .box {
        width: 230px;
        padding: 5px;
        margin: 10px;
    }

    .box--2 {
        width: 300px;
        padding: 5px;
        margin: 10px;
    }

    .box--3 {
        width: 260px;
        padding: 5px;
        margin: 10px;
    }

    .hr-estilo {
        width: 100%;
        border: 1px solid grey;
        margin-inline: 15px;
        margin-block: 5px;
        z-index: 0;
    }

    .custom-modal {
        max-width: 800px !important;
    }

    .input-group-append {
        cursor: pointer;
    }


    .was-validated {
        width: 100%;
        padding: 0;
        margin: 0;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .capitalize {
        text-transform: capitalize;
    }

    @media (max-width: 650px) {
        

        .box,
        .box--2,
        .box--3 {
            width: 80%;
            padding: 5px;
            margin: 10px;
        }
    
        
        .pagina {
            width: 100%;
            box-sizing: border-box;
            padding-top: 70px;
            overflow-y: auto !important;
            overflow-x: hidden;
            min-height: 100%;
            height: 90vh;
        }
    }
</style>
