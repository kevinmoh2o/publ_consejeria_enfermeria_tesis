<template>
    <!-- <div class="left"> -->
    <!-- <span class="material-symbols-outlined">{{ data.icon }}</span>
        <label>{{ data.title }}</label> -->
    <button class="left">
        <span class="material-symbols-outlined">
            {{ data.icon }}
        </span>
        <label>{{ data.title }}</label>
    </button>
    <!-- </div> -->
</template>


<script>

    export default {
        props: {
            data: Object
        },
        setup() {

            return {

            };
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    $color-base: #0070f2;
    $color-hover: lighten($color-base, 10%);

    $color-hover2: #3498db; // Color al hacer hover
    $shadow-base: 0 2px 5px rgba(0, 0, 0, 0.2);
    $shadow-hover: 0 5px 15px rgba(0, 0, 0, 0.3);

    .left {
        cursor: pointer;
        user-select: none;
        background-color: var(--color-primary);
        width: 100%;
        border-radius: 10px;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 10;
        transition: background-color 0.5s ease;
    }

    .left:hover {
        animation: hoverAnimation 0.5s ease forwards;
    }

    .left.active {
        background-color: #f0f0f0;
        /* Cambia a tu color preferido */
    }

    .left span {
        padding-inline: 5px;
    }

    .left label {
        cursor: pointer;
        font-size: 13px;
        z-index: 5;
    }


    button {
        border: none;
        height: 45px;
        min-width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        cursor: pointer;
        background-color: var(--color--btn--general);
        transition: all 0.3s ease;
        font-size: 14px;


        &:active {
            transform: scale(0.95);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            animation: ActiveAnimation;
        }
    }

    @keyframes hoverAnimation {
        from {
            background-color: $color-base;
        }

        to {
            background-color: $color-hover;
        }
    }


    @keyframes ActiveAnimation {
        0% {
            background-color: $color-base;
            transform: scale(1);
            box-shadow: $shadow-base;
        }

        50% {
            background-color: lighten($color-base, 5%); // Un ligero brillo en el medio de la animación
            transform: scale(1.05); // Ligeramente más grande en el punto medio
            box-shadow: $shadow-hover;
        }

        100% {
            background-color: $color-hover2;
            transform: scale(1);
            box-shadow: $shadow-base;
        }
    }
</style>