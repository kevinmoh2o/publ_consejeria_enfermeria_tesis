<template>
    <div class="loading-indicator">
        <div class="loader"></div>
        <Label class="txtLoading">Autenticando Usuario</Label>
    </div>
</template>


<script>
export default {
    //name: 'loading-view',
    setup() {
    },
    components: {
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.loading-indicator{
    --clr-primary-hsl-400: 0, 0%, 100%; 
    --clr-secondary-hsl-400: 0, 0%, 100%;
    --clr-primary-400: hsl(var(--clr-primary-hsl-400));
    --clr-secondary-400: hsl(var(--clr-secondary-hsl-400));
    --gradient-primary: linear-gradient(
        var(--clr-primary-400), 
        var(--clr-secondary-400));
    background: var(--gradient-primary);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


.loader{
  display:flex;
  flex-direction: column;
  justify-content:center;
  text-align: end;
  align-items:center;
  background-color:transparent;
  transition:opacity 0.75s, visibility 0.75s;
}

.loader::after{
  content:"";
  width: 120px;
  height: 120px;
  border: 3px solid #dddddd;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: loading 0.75s ease infinite;  
}

@keyframes loading{
  from{
    transform: rotate(0turn);
  }
  to{
    transform: rotate(1turn);
  }
}


.txtLoading{
  font-weight: 300;
  color: black;
  font-size: 18px;
  letter-spacing: 2px;
  font-family:  Arial, sans-serif;
  text-align: center;
  justify-content: center;
  background-color:white ;
  margin: 30px 0 30px 0;
}
</style>