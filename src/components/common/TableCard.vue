<template>
    <div class="mobile--cards">
        <div class="ui--card">
            <div class="card--up">
                <div class="icono--edit" @click="onEdit(item)">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </div>
            </div>


            <div class="card--info-consejero">
                <div class="icono--consejero">
                    <span class="material-symbols-outlined">
                        clinical_notes
                    </span>
                </div>
                <div class="datos--up">
                    <strong>CONSEJERO: </strong>
                    <p class="title"> {{ item.cuidador.apelPaterno }} {{ item.cuidador.name }}</p>
                    <h6>{{ item.cuidador.email }}</h6>
                </div>

                <div v-if="item.state" class="card--estado--verde">
                    <p class="verde">Activo</p>
                </div>

                <div v-else class="card--estado--rojo">
                    <p class="rojo">Inactivo</p>
                </div>
            </div>

            <div class="datos">
                <p> <strong>+51</strong> {{ item.cuidador.phone }}</p>
            </div>



            <div class="card--divisor"></div>



            <div class="card--info-consejero">
                <div class="icono--consejero">
                    <span class="material-symbols-outlined">
                        <span class="material-symbols-outlined">
                            ecg_heart
                        </span>
                    </span>
                </div>
                <div class="datos--up">
                    <strong>CUIDADOR: </strong>
                    <p class="title upper--case">{{ item.paciente.apelPaterno }} {{ item.paciente.name }}</p>
                    <h6>{{ item.paciente.dni }}</h6>
                </div>

                <div class="card--estado--azul">
                    <p class="azul lima--case">{{ item.paciente.ocupation }}</p>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
    export default {
        props: {
            item: Object,
        },
        setup(props, { emit }) {

            const onEdit = (item) => {
                emit('onEdit', item);
            }

            return {
                onEdit,
            }
        }
    }
</script>


<style lang="scss" scoped>


    .card--divisor {
        border: 1px solid rgb(202, 202, 202);
        border-radius: 5px;
        margin-inline: 5px;
        margin-block: 10px;
    }


    .card--up {
        display: block;
        /* border: 1px solid green; */

    }

    .card--up .icono--edit {
        display: flex;
        align-items: end;
        justify-content: end;
    }

    .card--up span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .icono--edit span {
        height: 30px;
        width: 30px;
        font-size: 20px;
        margin-inline: 10px;
        border-radius: 100%;
    }

    .icono--edit span:hover {
        background-color: rgb(176, 175, 175);
    }

    .table-responsive .mobile--cards {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
    }

    .card--info-consejero {
        padding-inline: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .card--info-consejero p,
    h6 {
        padding: 0;
        margin: 0;
    }

    .card--info-consejero .datos--up {
        display: flex;
        flex-direction: column;
    }

    .datos--up strong{
        padding-left: 10px;
        font-size: 14px;
        color: rgb(91, 91, 91);
        background-color: #f0f0f0;
        border-radius: 3px;
        margin-left: 10px;
    }

    .card--info-consejero .title {
        padding-left: 10px;
        font-size: 15px;
        font-weight: bolder;
    }

    .card--info-consejero h6 {
        padding-left: 10px;
        font-size: 12px;
    }

    .card--info-consejero .card--estado--verde {
        display: inline-flex;
        height: 25px;
        max-width: 70px;
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-inline: 10px;
        border-radius: 5px;
        background-color: #c7fda9;
    }

    .card--estado--verde .verde {
        color: #039555 !important;
        font-weight: bolder;
        font-size: 14px;
    }


    .card--info-consejero .card--estado--rojo {
        display: inline-flex;
        height: 25px;
        max-width: 70px;
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-inline: 10px;
        border-radius: 5px;
        background-color: rgb(254, 202, 202);
    }

    .card--estado--rojo .rojo {
        color: red;
        font-weight: bolder;
        font-size: 14px;
    }



    .card--info-consejero .card--estado--azul {
        display: inline-flex;
        height: 25px;
        max-width: 100px;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-inline: 10px;
        border-radius: 5px;
        background-color: rgb(206, 206, 255);
    }

    .card--estado--azul .azul {
        color: blue;
        font-weight: bolder;
        font-size: 14px;
    }



    .datos {
        padding-left: 10px;
        padding-top: 5px;

        p {
            font-size: 25px;
            font-weight: 700;
            letter-spacing: 5px;
            margin: 0;
        }
    }


    .icono--consejero {
        width: 40px;
        height: 40px;
        background-color: rgb(215, 215, 255);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icono--consejero span {
        color: var(--color-primary);
    }

    .mobile--cards .ui--card {
        margin-block: 10px;
        border-radius: 10px;
        width: 90%;
        box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #e5e5e5;
        //border: 1px solid red;
        padding-bottom: 10px;
    }

    .lima--case{
        text-transform: capitalize;
    }

    .upper--case{
        text-transform: uppercase;
    }

</style>