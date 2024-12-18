//import { split } from "core-js/fn/symbol";

export const Formatos = {

  //INP: "2023-03-31T05:00:00.000Z" fecha objeto
  //OUT: "13/04/2023"
  soloFechaDMY: function (fecha) {
    //console.log("fecha", fecha)
    const fechaOriginal = new Date(fecha);
    //console.log("fechaOriginal", fechaOriginal)
    const dia = fechaOriginal.getDate();
    const mes = fechaOriginal.getMonth() + 1;
    const anio = fechaOriginal.getFullYear();
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
  },

  //in dateStr: "2024-04-16"
  ymdFechaToView: function (fecha) {
    //console.log("fecha: ",fecha)
    var fecList = fecha.split('-');
    return `${fecList[2]}/${fecList[1]}/${fecList[0]}`;
  },

  // Formato para números con separador de miles
  fechaStrinToObject: function (fecha) {
    //console.log(fecha)
    const fechaParts = fecha.split(' ');
    return fechaParts[0].split('/').reverse().join('-') + 'T' + fechaParts[1];
  },

  fechaZeroToDB(input) {
    /* console.log("fechaZeroToDB",input) */
    const fecha = new Date(input);
    const horaPeru = fecha.toLocaleTimeString('es-PE', { timeZone: 'America/Lima', hour12: false });
    const fechaFormateada = fecha.toISOString().split('T')[0] + 'T' + horaPeru;
    return fechaFormateada;
  },
  /*
  in: 2024-01-12T09:30:00"
  */
  addOneHour(fech) {
    var fechaInicial = new Date(fech);
    if (isNaN(fechaInicial.getTime())) {
      console.error("Fecha inválida");
      return null;  // O manejar el error de acuerdo a tus necesidades
    }
    fechaInicial.setHours(fechaInicial.getHours() + 1);
    var offsetMinutes = fechaInicial.getTimezoneOffset();
    fechaInicial.setMinutes(fechaInicial.getMinutes() - offsetMinutes);
    return fechaInicial.toISOString().replace(/\.000Z$/, '');
  },
  calcularDiferenciaEnHoras(fecha1, fecha2) {
    var date1 = new Date(fecha1);
    var date2 = new Date(fecha2);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      console.error("Fechas inválidas");
      return null;  // O manejar el error de acuerdo a tus necesidades
    }
    var diferenciaEnMilisegundos = date2 - date1;
    var diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);
    return diferenciaEnHoras;
  },
  fechaMeeting(input) {
    //var fech1 = input.split("T");
    //var dateObj = new Date(fech1[0]);
    var dateObj = new Date(input);

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = dateObj.toLocaleDateString('es-ES', options);
    return formattedDate;
  }



};