<template>
  <div class="container">
    <div class="ctnIpt">
          <label class="lbl" >{{title}}</label>
          <VueDatePicker class="ipt" v-model="selectedDate" locale="es" :format="format"
          placeholder="dd/mm/yyyy" cancelText="Cancelar" selectText="Seleccionar"
          :enable-time-picker="false"
          ></VueDatePicker>      </div>
  </div>
</template>
<script>
//import Datepicker from 'vue3-datepicker'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

//import Datepicker2 from 'vuejs3-datepicker';
export default {
  name: 'fecha-component',
  components:{
    //Datepicker,
    //Datepicker2,
    VueDatePicker,
  },
  props: {
    title: String
  },
  data() {
  return {
    datePickerOptions: {
      locale: 'es',
    },
    selectedDate: null,
    picked: new Date()
  }
},
  methods: {
    format(date) {
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    setNombre(){
        return this.nombre;
    },
    setType(){
       return this.type 
    }
  }
}
</script>


<style lang="scss" scoped>

  .container{
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    max-width: none;
    //padding-top: 5px;
    //padding-bottom: 5px;
    //padding-left: 15px;
    //padding-right: 15px;
    width: 100%;
    padding: 0;
  }

    .lbl{
      justify-self: start;
      align-self: start;
      align-items: start;
      grid-area:lbl;
      font-weight: 500;
      font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
      padding-bottom:5px ;
      color: rgb(68, 68, 68);
    }

    .ipt{
        grid-area:ipt;
        border: 1.5px solid #5B5D6B;
        border-radius: 5px;
        width: 100%;
        font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
        //padding-left:5px ;
        height: 45px;
    }

    .ctnIpt {
        width: 100%;
        display: grid;
        grid-template-columns: 100%; 
        grid-template-areas:
            "lbl"
            "ipt"
            ; 
    }
</style>
  