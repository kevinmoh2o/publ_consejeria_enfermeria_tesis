<template>
    <div class="contenedor-main">
        <div class="main-contenido">

            <section class="sec-noticia">
                <h3>NOTICIAS</h3>
                <div class="box-noticias">
                    <div v-for="(item, index) in noticias" :key="index" @click="onLink(item)">
                        <NewsCard :data="item"></NewsCard>
                    </div>
                </div>
            </section>

            <div class="contendor-video">
                <section class="sec-articulos">
                    <h3>ARTICULOS</h3>
                    <div class="box-articulos">
                        <div v-for="(item, index) in articulos" :key="index" @click="onSelect(item)">
                            <ArticleCard :data="item"></ArticleCard>
                        </div>
                    </div>
                </section>
            </div>

            <section class="sec-video">
                <h3>VIDEO</h3>
                <div class="box-video">
                    <youtube-video video-id="yISUoDrq5jo"></youtube-video>
                </div>
            </section>

        </div>

    </div>


</template>

<script>
    import NewsCard from '@/components/common/NewsCard.vue';
    import ArticleCard from '@/components/common/ArticleCard.vue';
    import YoutubeVideo from '@/components/common/YoutubeVideo.vue';
    import { buttonSound } from '@/utils/Hardware';

    import { reactive } from 'vue';
    import { useRouter } from 'vue-router'

    export default {
        name: 'menu-layout',
        components: {
            NewsCard,
            ArticleCard,
            YoutubeVideo,
            //MenuVisorPdf,
        },
        setup() {
            const router = useRouter()

            const noticias = reactive([
                {
                    label: "OPS continúa apoyando al Perú para fortalecer la política nacional de la salud mental",
                    img: require("@/assets/noticia/one.jpeg"),
                    link: 'https://www.paho.org/es/noticias/10-11-2023-ops-continua-apoyando-al-peru-para-fortalecer-politica-nacional-salud-mental',
                    fecha: "marzo 21, 2024",
                },
                {
                    label: "Centros de Salud Mental Comunitaria brindan atención especializada y ambulatoria",
                    img: require("@/assets/noticia/two.webp"),
                    link: 'https://www.gob.pe/institucion/minsa/noticias/898515-centros-de-salud-mental-comunitaria-brindan-atencion-especializada-y-ambulatoria',
                    fecha: "marzo 22, 2024",
                },
                {
                    label: "La depresión es uno de los trastornos de salud mental más frecuentes en el país",
                    img: require("@/assets/noticia/trhee.jpeg"),
                    link: 'https://www.gob.pe/institucion/minsa/noticias/892900-la-depresion-es-uno-de-los-trastornos-de-salud-mental-mas-frecuentes-en-el-pais',
                },
                {
                    label: "Mundial de la Salud Mental: más de 1 333 000 casos atendidos por trastornos y problemas psicosociales",
                    img: require("@/assets/noticia/four.jpeg"),
                    link: 'https://www.gob.pe/institucion/minsa/noticias/847052-dia-mundial-de-la-salud-mental-mas-de-1-333-000-casos-atendidos-por-trastornos-y-problemas-psicosociales',
                },
                {
                    label: "Minsa cuenta con equipos interdisciplinarios de salud mental para brindar atención integral a los pacientes",
                    img: require("@/assets/noticia/five.jpeg"),
                    link: 'https://www.gob.pe/institucion/minsa/noticias/833295-minsa-cuenta-con-equipos-interdisciplinarios-de-salud-mental-para-brindar-atencion-integral-a-los-pacientes',
                },
                {
                    label: "Casi un millón de casos de salud mental atendidos en diversos establecimientos del Minsa",
                    img: require("@/assets/noticia/six.webp"),
                    link: 'https://www.gob.pe/institucion/minsa/noticias/814543-casi-un-millon-de-casos-de-salud-mental-atendidos-en-diversos-establecimientos-del-minsa',
                },

            ]);

            const articulos = reactive([
                {
                    label: "Psicoeducación en salud mental: una herramienta para pacientes y familiares",
                    img: require("@/assets/noticia/familiares.webp"),
                    pdf: './familiares.pdf'
                },
                {
                    label: "Psicoeducación: intervención de enfermería para el cuidado de la familia en su rol de cuidadora",
                    img: require("@/assets/noticia/cuidadora.webp"),
                    pdf: './cuidadora.pdf'
                },

            ]);

            const onSelect = (valor) => {
                window.open(valor.pdf, '_blank');
            }

            const onLink = (valor) => {
                window.open(valor.link, '_blank');
            }

            return {
                noticias,
                articulos,

                onSelect,
                onLink,
            }
        },
        methods: {

        },

    }
</script>

<style lang="scss" scoped>

    .contenedor-main {
        overflow-y: auto !important;
        height: 100vh;
    }

    .box-noticias {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .box-articulos{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    /* SECCIONES */
    section {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin: 0;
        /* border: 1px solid red; */
    }

    section h3 {
        width: 100%;
        font-size: 20px;
        padding: 10px;
        margin: 0px;
        font-weight: bolder;
        color: rgb(83, 83, 83);
    }

    .box-video{
        margin-bottom: 30px;
    }

</style>