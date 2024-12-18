<template>
    <div class="noticia">
        <div class="new-image">
            <img :src="data.img" alt="" class="image-content">
        </div>
        <div class="new-title">
            <h5>{{data.label}}</h5>
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            data:Object
        },
        data() {
            return {

            };
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>

    .noticia {
        margin: 10px;
        /* border: 1px solid red !important; */
        width: 200px;
        height: 300px;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
    }

    .new-image {
        top: 0;
        left: 0;
        width: 100%;
        height: 200px;
        /* border: 1px solid blue; */
        position: absolute;

    }

    .image-content {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    }

    .new-title {
        top: 70%;
        translate: translateY(50%);
        width: 100%;
        position: absolute;
        text-align: center;
    }

    .new-title h5 {
        padding-inline: 10px;
        font-size: 13px;
        font-weight: 800;
        color: rgb(96, 96, 96);
    }

    .fecha {
        display: flex;
        justify-content: center;
        width: 100%;
        display: flex;
        flex-direction: row;

    }

    .fecha span {
        padding-inline: 5px;
        font-size: 18px;
        color: rgb(102, 102, 102);
    }

    .fecha label {
        font-size: 14px;
        font-weight: 400;
        color: rgb(102, 102, 102);
    }

    .box-noticias {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    @media (max-width: 600px) {

        .noticia {
            margin: 10px;
            width: 175px;
            height: 300px;
            border-radius: 10px;
            position: relative;
            cursor: pointer;
            box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
        }
    }

</style>