<template>
    <label class="switch-button" for="switch">
        <div class="switch-outer">
            <input id="switch" type="checkbox" v-model="parameter">
            <div class="button">
                <span class="button-toggle"></span>
                <span class="button-indicator"></span>
            </div>
            
        </div>
        <h2 v-if="parameter" style="color: #44d76e;">Activo</h2>
        <h2 v-else style="color: #ef4752;">Inactivo</h2>
    </label>
</template>


<script>
    import { ref, watch } from 'vue';

    export default {
        props: {
            modelValue: {
                type: Boolean,
                default: false,
            },
        },
        setup(props, { emit }) {
            const parameter = ref(props.modelValue);

            // Observa los cambios en parameter y emite update:modelValue
            watch(parameter, (newValue) => {
                emit('update:modelValue', newValue);
            });

            // Observa los cambios en props.modelValue y actualiza parameter
            watch(() => props.modelValue, (newValue) => {
                parameter.value = newValue;
            });

            return {
                parameter,
            };
        },
    };
</script>

<style lang="scss" scoped>

    .switch-button {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex-direction: row;
        margin: 0;
        height: 45px;
        /* border: 1px solid red; */
    }
    .switch-button h2{
        padding: 5px;
        font-size: 15px;
        margin: 0;
        font-weight: bold;
        width: 70px;
        text-align: center;
    }

    .switch-button .switch-outer {
        height: 100%;
        background: #252532;
        width: 100px;
        border-radius: 165px;
        -webkit-box-shadow: inset 0px 5px 10px 0px #16151c, 0px 3px 6px -2px #403f4e;
        box-shadow: inset 0px 5px 10px 0px #16151c, 0px 3px 6px -2px #403f4e;
        border: 1px solid #32303e;
        padding: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    .switch-button .switch-outer input[type="checkbox"] {
        opacity: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        position: absolute;
    }

    .switch-button .switch-outer .button-toggle {
        height: 30px;
        width: 30px;
        background: -webkit-gradient(linear,
                left top,
                left bottom,
                from(#3b3a4e),
                to(#272733));
        background: -o-linear-gradient(#3b3a4e, #272733);
        background: linear-gradient(#3b3a4e, #272733);
        border-radius: 100%;
        -webkit-box-shadow: inset 0px 5px 4px 0px #424151, 0px 4px 15px 0px #0f0e17;
        box-shadow: inset 0px 5px 4px 0px #424151, 0px 4px 15px 0px #0f0e17;
        position: relative;
        z-index: 2;
        -webkit-transition: left 0.3s ease-in;
        -o-transition: left 0.3s ease-in;
        transition: left 0.3s ease-in;
        left: 0;
    }

    .switch-button .switch-outer input[type="checkbox"]:checked+.button .button-toggle {
        left: 58%;
    }

    .switch-button .switch-outer input[type="checkbox"]:checked+.button .button-indicator {
        -webkit-animation: indicator 1s forwards;
        animation: indicator 1s forwards;
    }

    .switch-button .switch-outer .button {
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: relative;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }

    .switch-button .switch-outer .button-indicator {
        height: 25px;
        width: 25px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        border-radius: 50%;
        border: 4px solid #ef4752;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        right: 10px;
        position: relative;
    }

    @-webkit-keyframes indicator {
        30% {
            opacity: 0;
        }

        0% {
            opacity: 1;
        }

        100% {
            opacity: 1;
            border: 4px solid #44d76e;
            left: -68%;
        }
    }

    @keyframes indicator {
        30% {
            opacity: 0;
        }

        0% {
            opacity: 1;
        }

        100% {
            opacity: 1;
            border: 4px solid #44d76e;
            left: -68%;
        }
    }

</style>
