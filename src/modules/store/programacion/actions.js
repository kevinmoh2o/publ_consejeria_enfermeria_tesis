//acciones asincronas que pueden llamar una mutacion
// export const myAction = async ({ commit }) => {

// }
import investigacionApi from '@/apis/investigacionapi'
import { ENDPOINTS } from '@/modules/store/endpoints';
import { getHeaderToken } from '@/utils/JwTFunction.js';


export const clearUses = async ({ commit }, entry) => {
  commit('resetState', entry);
}


export const setRectWidth = async ({ commit }, entry) => {
  commit('setRectwidth', entry);
}


export const onlySetEntriesAction = async ({ commit }, entry) => {
  commit('setEntries', entry)
  localStorage.setItem('entries', JSON.stringify(entry));
}





export const updateInformacionPacienteCuidador = async ({ commit }, entry) => {
  try {
    const headers = getHeaderToken();
    var rptReq = await investigacionApi.put(ENDPOINTS.UPDATE_INFORACION_RELACION_PACCUI, entry, { headers });
    if (!rptReq) {
      throw new Error('La respuesta recibida es inválida');
    }
    //console.log("rptReq: ",rptReq)
    const { status, message } = rptReq.data;
    return { status, message };
  } catch (error) {
    const { status, message } = error.response.data;
    return { status, data: [], message: `Error obteniendo lista` }
  }
}

export const updateListaAsistencia = async ({ commit }, entry) => {
  try {
    const headers = getHeaderToken();
    var rptReq = await investigacionApi.put(ENDPOINTS.UPDATE_ASISTENCIA_CONSEJERIA, entry, { headers });
    if (!rptReq) {
      throw new Error('La respuesta recibida es inválida');
    }
    const { status, data } = rptReq.data;
    return { status, data, message: `` };
  } catch (error) {
    const { status, message } = error.response.data;
    return { status, data: [], message: `Error obteniendo lista` }
  }
}


export const getListaAsistencia = async ({ commit }, { idconsejero, fecha, isActive }) => {

  try {
    const headers = getHeaderToken();
    const params = { idconsejero, fecha, isActive };
    const url = `${ENDPOINTS.GET_ASISTENCIA_CONSEJERIA}?${new URLSearchParams(params)}`;
    var rptReq = await investigacionApi.get(url, { headers });
    //console.log("rptReq: ", rptReq);
    if (!rptReq) {
      throw new Error('La respuesta recibida es inválida');
    }
    const { status, data } = rptReq.data;
    //commit('setUsuarioPersonaList', { status, data, message: `` });
    return { status, data, message: `` };
  } catch (error) {
    //console.log("error: ", error)
    const { status, message } = error.response.data;
    //commit('setTranUserPeople', { status, message, data: [] })
    return { status, data: [], message: `Error obteniendo lista` }
  }
}




export const crearUsuario = async ({ commit }, entry) => {
  var fechaActual = new Date();
  try {
    entry.createdAt = fechaActual.toISOString();
    //console.log(entry)
    const { data } = await investigacionApi.post(ENDPOINTS.POS_CREATE_USER, entry);
    const { status, message, title } = data;
    commit('addUser', { status, message, data: entry, title })
    //console.log("crearUsuario action:", { status, message }, entry);
  } catch (error) {
    //console.log("error: ", error)
    const { status, message, title } = error.response.data;
    commit('addUser', { status, message, title })
  }
}




export const transactionUserPeople = async ({ commit }, entry) => {
  try {
    const headers = getHeaderToken();
    const rptReq = await investigacionApi.post(ENDPOINTS.POS_CREATE_TIE_PAC_CARE_USER, entry, { headers });
    if (!rptReq || !rptReq.data) {
      throw new Error('La respuesta recibida es inválida');
    }
    const { status, data, message } = rptReq.data;
    commit('setTranUserPeople', { status, data, message })
    //console.log("crearUsuario action:", { status, message }, entry);
  } catch (error) {
    const { status, message } = error.response.data;
    commit('setTranUserPeople', { status, message })
  }
}


export const listPacienteCuidador = async ({ commit }, { id, isActive }) => {


  try {
    const params = { id, isActive };
    const url = `${ENDPOINTS.GET_LITS_PACC_CARE_BY_USER}?${new URLSearchParams(params)}`;
    const headers = getHeaderToken();
    var rptReq = await investigacionApi.get(url, { headers });
    //console.log("rptReq: ", rptReq);
    if (!rptReq || !rptReq.data) {
      throw new Error('La respuesta recibida es inválida');
    }
    const { status, data } = rptReq.data;
    commit('setUsuarioPersonaList', { status, data, message: `` });
  } catch (error) {
    //console.log("error: ", error)
    const { status, message } = error.response.data;
    commit('setTranUserPeople', { status, message, data: [] })
  }
}



export const getListaRelacionesDdb = async ({ commit }, { id, isActive }) => {
  try {
    const params = { id, isActive };
    const headers = getHeaderToken();
    const url = `${ENDPOINTS.GET_LIST_DDB_RELACIONES}?${new URLSearchParams(params)}`;
    //console.log("url: ", url);
    var rptReq = await investigacionApi.get(url, { headers });
    if (!rptReq || !rptReq.data) {
      throw new Error('La respuesta recibida es inválida');
    }
    const { status, data } = rptReq.data;

    //console.log("dentro de getListaRelacionesDdb: ", data)
    return data;
  } catch (error) {
    return [];
  }
}



export const saveAsistenciaConsejeria = async ({ commit }, entry) => {
  try {
    const headers = getHeaderToken();
    const newEntry = await investigacionApi.post(ENDPOINTS.POS_CREATE_NRO_PROGRAMACION, entry, { headers });
    if (newEntry.status >= 200 && newEntry.status <= 299) {
      commit('addEntry', entry)
      return { message: newEntry.data.message, status: true };
    } else {
      return { message: "Error al crear la programación", status: false };
    }

  } catch (error) {
    console.error(error)
    return { message: "Server error", status: false };
  }
}





export const loadEntries = async ({ commit }, groupId) => {
  //console.log("daloadEntriesta");
  var path = `resultados.json?orderBy="groupId"&equalTo="${groupId}"`;
  //console.log(`loadEntries: ${path}`);
  var data = [];
  try {
    var respuesta = await investigacionApi.get(path);
    //console.log(respuesta);
    const myObj = respuesta.data;
    for (const key in myObj) {
      const value = myObj[key];
      value["id"] = key;
      data.push(value);
    }
    //console.log(data);
    commit('setEntries', data)
    localStorage.setItem('entries', JSON.stringify(data));
  } catch (error) {
    console.error(error)
  }
}

export const updateEntry = async ({ commit }, entry) => {
  try {
    const updatedEntry = await investigacionApi.put(`/resultados/${entry.id}.json`, entry);
    if (updatedEntry.status === 200) {
      commit('updateEntry', entry);
      //console.log("UPDATE updatedEntry", updatedEntry, entry);
      return { entry, statusCode: 200 };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};



export const setIsLoading = async ({ commit }, valor) => {
  //console.log("setIsLoading: ",valor)
  commit('setIsLoading', valor);

}
