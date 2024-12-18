<template>
  <div v-if="!reponse.status" class="contenedor">
    <div class="card-color">
      <img src="@/assets/images/error.png" alt="" width="100" height="100">
      <div class="grid-flow">
        <p class="result-rank">{{ reponse.title }}</p>
        <p>{{ reponse.message }}</p>
      </div>
      <button class="button" type="button" @click="onPress">{{ reponse.btnText }}</button>

    </div>
  </div>
</template>


<script>
export default {
  props: {
    reponse: Object,
  },
  data() {
    return {
      estado: this.reponse.status
    };
  },
  methods: {
    onPress() {
      this.$emit('cerrar-indicador', false);
    }
  }
}
</script>

<style lang="scss" scoped>
.contenedor {
  --padding: 2.5rem;
  --border-radius: 2rem;
  --clr-primary-hsl-400: 343, 88%, 45%, 1;
  --clr-secondary-hsl-400: 343, 88%, 45%, 1;
  --clr-neutral-hsl-100: 0, 0%, 100%;
  --clr-neutral-hsl-300: 345, 89%, 50%, 1;

  --clr-neutral-300: hsl(var(--clr-neutral-hsl-300));
  --clr-neutral-100: hsl(var(--clr-neutral-hsl-100));
  --clr-primary-400: hsl(var(--clr-primary-hsl-400));
  --clr-secondary-400: hsl(var(--clr-secondary-hsl-400));
  --gradient-primary: linear-gradient(var(--clr-primary-400),
      var(--clr-secondary-400));
  background: var(--gradient-primary);
  max-width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-color {
  height: auto;
  max-height: 800px;
  background: var(--clr-neutral-100);
  /* color: hsl(var(--clr-neutral-hsl-100), .7); */
  border-radius: 30px;
  border: 1px solid #fff;
  width: 400px;
  padding: 40px 60px 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.grid-flow[data-spacing="large"] {
  gap: 2rem;
}

.grid-flow {
  display: grid;
  align-content: start;
  gap: 1rem;
}

.result-rank {
  color: var(--clr-neutral-300);
  font-size: var(--fs-700);
  font-weight: var(--fw-bold);
}


.button {
  color: var(--clr-neutral-100);
  line-height: 1;
  background: var(--clr-neutral-300);
  padding: 1rem 2rem;
  border: 0;
  border-radius: 100vw;
  cursor: pointer;
  width: 300px;
  margin: 20px 0 0 0;
}

.button:hover,
.button:focus-visible {
  background: var(--gradient-primary);
}
</style>