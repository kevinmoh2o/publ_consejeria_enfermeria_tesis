<template>
  <div class="contenedor-loading">
    <div class="cabecera--loading">
      <component :is="selectedLoading"></component>
    </div>
    <div class="cuerpo--loading">
      <p>
        <span
          v-for="(char, index) in processedText"
          :key="index"
          :style="getCharacterStyle(char, index)"
        >
          {{ char }}
        </span>
      </p>
    </div>
  </div>
</template>


<script>
import FirstLoading from "@/views/loading/FirstLoading.vue";
import SecondLoading from "@/views/loading/SecondLoading.vue";
import ThirdLoading from "@/views/loading/ThirdLoading.vue";
import FourthLoading from "@/views/loading/FourthLoading.vue";
import FifthLoading from "@/views/loading/FifthLoading.vue";
import SixthLoading from "@/views/loading/SixthLoading.vue";
import SeventhLoading from "@/views/loading/SeventhLoading.vue";

import { ref, computed, onMounted } from "vue";

export default {
  name: "loading-page",
  components: {
    FirstLoading,
    SecondLoading,
    ThirdLoading,
    FourthLoading,
    FifthLoading,
    SixthLoading,
    SeventhLoading,
  },
  props: {
    text: Object,
  },
  setup(props) {
    const loadingComponents = [
      "FirstLoading",
      "SecondLoading",
      "ThirdLoading",
      "FourthLoading",
      "FifthLoading",
      "SixthLoading",
      "SeventhLoading",
    ];
    const selectedLoading = ref(
      loadingComponents[Math.floor(Math.random() * loadingComponents.length)]
    );

    const processedText = computed(() => Array.from(props.text.title));

    const getCharacterStyle = (char, index) => ({
      animationDelay: `${index * 0.025}s`,
      marginRight: char === " " ? "16px" : "2px",
    });
    onMounted(() => {
      //console.log("props.text: ",props.text)
    });
    return {
      processedText,
      getCharacterStyle,
      selectedLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.contenedor-loading {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.cabecera--loading {
  margin-block: 100px 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.cuerpo--loading {
  margin-block: 30px 30px;
  width: 80%;
}

.cuerpo--loading p {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 40px;
}

.cuerpo--loading span {
  font-size: 1.1em;
  font-weight: 500;
  color: #004dff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  display: inline-block;
  animation: loading-wave-animation 0.6s ease-in-out infinite;
  animation-delay: calc(var(--n, 0) * 0.1s);
}

@keyframes loading-wave-animation {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-7px);
  }
}
</style>