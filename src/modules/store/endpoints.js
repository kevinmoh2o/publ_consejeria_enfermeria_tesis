export const ENDPOINTS = {
  /********** Auth **********/
  POS_CREATE_USER: '/api/auth/createUser',
  POS_RESET_ACCOUNT: '/api/auth/reset',
  GET_USER_BY_DNI: '/api/auth/by',
  PUT_USER_PASSWORD: '/api/auth/updatePass',



  /********** Ususario y Persona **********/
  GET_LITS_PACC_CARE_BY_USER: '/api/usuarios/listaPacienteCuidador',//HEADER
  GET_LIST_DDB_RELACIONES: '/api/usuarios/relacion',//HEADER
  POS_CREATE_TIE_PAC_CARE_USER: '/api/usuarios/transUser',//HEADER - Transaccion para crear la relacion usuario cuidador
  UPDATE_INFORACION_RELACION_PACCUI: '/api/usuarios/putTransUser',//HEADER



   /********* MEETINGS - EVENTOS *********/
  POS_CREATE_PROGRAMACION: '/api/programarReunion/postBy',//HEADER
  GET_LIST_PROGRAMACIONES_BY_IDCONSEJERO: '/api/programarReunion/getBy',//HEADER
  DELETE_PROG_REUN_BY_ID: '/api/programarReunion/deleteBy',//HEADER
  UPDATE_PROG_REUN_BY_ID: '/api/programarReunion/updateBy',//HEADER
  UPDATE_DURATION_MEETING: '/api/programarReunion/updateDurationBy',//HEADER

  POST_CREATE_EVENTO_NEW: '/api/programarReunion/newCreateEvent',//HEADER
  DELETE_EVENTO_NEW: '/api/programarReunion/newDeleteEvent',//HEADER
  PUT_UPDATE_EVENTO_NEW: '/api/programarReunion/newUpdateEvent',//HEADER -- ?idUsuario=rhU8MseogoMc4tGJdrfa&idEvento=Y4iOIFX7Zmuo2284F3yE
  GET_LIST_EVENTO_REMEMBER: '/api/programarReunion/getListaEvento',//HEADER -- ?id=NfqezpLXkowsdW8Os9PR




  /********** Consejeria **********/
  GET_ASISTENCIA_CONSEJERIA: '/api/consejeria/byCF',//HEADER
  POS_CREATE_NRO_PROGRAMACION: '/api/consejeria/save',//HEADER
  UPDATE_ASISTENCIA_CONSEJERIA: '/api/consejeria/update',//HEADER



  /*********  MODULO DE SATISFACCION  *********/
  POST_RESPUESTA_SATISFACCION: '/api/encuesta/grabar',//HEADER
  GET_ENCUESTAS_SATISFACCION: '/api/encuesta/getEncuestas',//HEADER
  GET_ENCUESTAS_RESULTADOS: '/api/encuesta/respuestas',//HEADER



  /*********  MODULO DE SOPORTE TÉCNICO  *********/
  POST_SOPORTE_CONSULTA_RECOMENDACION: '/api/soporte/grabar',//HEADER



};