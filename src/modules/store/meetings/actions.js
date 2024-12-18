import investigacionApi from "@/apis/investigacionapi";
import { ENDPOINTS } from "../endpoints.js";
import { getHeaderToken } from "@/utils/JwTFunction.js";

export const clearUses = async ({ commit }) => {
  commit("CLEAR_EVENT_LIST");
  commit("CLEAR_REMEMBER_LIST");
  commit("CLEAR_ONLOADING");
};

export const setRemmemberList = ({ commit }, remmemberList) => {
  commit("SET_REMEMBER_LIST", remmemberList);
};

export const updateRemember = ({ commit }, { index, userType, updatedData }) => {
  commit("UPDATE_REMEMBER", { index, userType, updatedData });
};



export const setOnloading = ({ commit }, onloading) => {
  commit("SET_ONLOADING", onloading);
};


export const setEventsList = ({ commit }, eventsList) => {
  commit("SET_EVENT_LIST", eventsList);
};

export const addEvent = ({ commit }, event) => {
  commit("ADD_EVENT", event);
};

export const removeEvent = ({ commit }, eventId) => {
  commit("REMOVE_EVENT", eventId);
};

export const updateEvent = ({ commit }, event) => {
  commit("UPDATE_EVENT", event);
};


/* export const addRemember = ({ commit, state }, { userType, rememberData }) => {
  if (state.remmemberList[userType].length < 3) {
    commit("ADD_REMEMBER", { userType, rememberData });
  }
}; */
/* export const addRemember = ({ commit, state }, { userType, rememberData }) => {
  console.log("{ userType, rememberData }: ",{ userType, rememberData })
  // Filtrar solo los recordatorios activos (state === true)
  const activeRemembers = state.remmemberList[userType].filter(remember => remember.state === true);

  // Verificar si hay menos de 3 recordatorios activos antes de añadir uno nuevo
  if (activeRemembers.length < 3) {
    commit("ADD_REMEMBER", { userType, rememberData });
  }
}; */
export const addRemember = ({ commit, state }, { userType, rememberData }) => {
  // Asegurar que existe la lista de recordatorios para el userType antes de filtrar
  const remembers = state.remmemberList[userType] || [];  // Devuelve un arreglo vacío si no existe

  // Filtrar solo los recordatorios activos (state === true)
  const activeRemembers = remembers.filter(remember => remember.state === true);

  // Verificar si hay menos de 3 recordatorios activos antes de añadir uno nuevo
  if (activeRemembers.length < 3) {
    commit("ADD_REMEMBER", { userType, rememberData });
  }
};



export const removeRemember = ({ commit }, { userType, index }) => {
  commit("REMOVE_REMEMBER", { userType, index });
};


export const createProgramacion = async ({ commit }, entry) => {
  try {
    const headers = getHeaderToken();
    const newEntry = await investigacionApi.post(
      ENDPOINTS.POS_CREATE_PROGRAMACION,
      entry,
      { headers }
    );
    if (newEntry.status >= 200 && newEntry.status <= 299) {
      const { data, message, status } = newEntry.data;
      return { data, message, status };
    } else {
      return { message: "Error al crear la programación", status: false };
    }
  } catch (error) {
    console.error(error);
    return { message: "Server error", status: false };
  }
};

export const cargarListProgramacionesById = async (
  { commit },
  { idConsejero }
) => {
  try {
    const headers = getHeaderToken();
    const params = { idConsejero };
    const url = `${
      ENDPOINTS.GET_LIST_PROGRAMACIONES_BY_IDCONSEJERO
    }?${new URLSearchParams(params)}`;
    //console.log("url cargarListProgramacionesById: ", url)
    var respuesta = await investigacionApi.get(url, { headers });
    //console.log("respuesta: ", respuesta)
    if (!respuesta || !respuesta.data) {
      throw new Error("La respuesta recibida es inválida");
    }
    const { status, data, message } = respuesta.data;
    return { status, data, message };
    //console.log("respuesta.data.data: ", respuesta.data.data)
  } catch (error) {
    console.error(error);
    const { status, message } = error.response.data;
    return { status, message };
  }
};

export const cargarListProgramacionesPorIdDeConsejero = async (
  { commit },
  { groupId }
) => {
  try {
    const headers = getHeaderToken();
    const params = { groupId: JSON.stringify(groupId) }; // JSON.stringify si groupId es un array
    const url = `${
      ENDPOINTS.GET_LIST_PROGRAMACIONES_BY_IDCONSEJERO
    }?${new URLSearchParams(params)}`;

    var respuesta = await investigacionApi.get(url, { headers });
    if (!respuesta || !respuesta.data) {
      throw new Error("La respuesta recibida es inválida");
    }
    const { status, data, message } = respuesta.data;
    return { status, data, message };
  } catch (err) {
    console.error(err);
    const { status, error } = err.response.data;
    return { status, message: error, data: [] };
  }
};

export const eliminarProgramacionesById = async ({ commit }, { id }) => {
  try {
    const headers = getHeaderToken();
    const params = { id };
    const url = `${ENDPOINTS.DELETE_PROG_REUN_BY_ID}?${new URLSearchParams(
      params
    )}`;
    var respuesta = await investigacionApi.delete(url, { headers });
    if (!respuesta || !respuesta.data) {
      throw new Error("La respuesta recibida es inválida");
    }
    //console.log("respuesta elimnar programcion : ", respuesta)
    /* const entries = JSON.parse(localStorage.getItem('entries')) || [];
        const nuevasEntries = entries.filter(programacion => programacion.id !== id);
        commit('setEntries', nuevasEntries); */
    const { message, status } = respuesta.data;
    return { message, status };
  } catch (error) {
    console.error(error);
    const { status, message } = error.response.data;
    return { status, message };
  }
};

export const actualizarProgramacionById = async ({ commit }, entry) => {
  try {
    const headers = getHeaderToken();
    const { id } = entry;
    const params = { id };
    entry.id = "";
    const url = `${ENDPOINTS.UPDATE_PROG_REUN_BY_ID}?${new URLSearchParams(
      params
    )}`;
    //console.log(url)
    var respuesta = await investigacionApi.put(url, entry, { headers });
    if (!respuesta || !respuesta.data) {
      throw new Error("La respuesta recibida es inválida");
    }
    //console.log("respuesta elimnar programcion : ", respuesta)
    const { message, status, data } = respuesta.data;
    return { message, status, data };
  } catch (error) {
    console.error(error);
    const { status, message } = error.response.data;
    return { status, message };
  }
};

export const actualizarDurationMeeting = async ({ commit }, entry) => {
  try {
    const headers = getHeaderToken();
    const { idEvento, duration } = entry;
    const params = { idEvento };
    const body = { duracionReal: duration };
    const url = `${ENDPOINTS.UPDATE_DURATION_MEETING}?${new URLSearchParams(
      params
    )}`;
    var respuesta = await investigacionApi.put(url, body, { headers });
    const { message, status, data } = respuesta.data;
    return { message, status, data };
  } catch (error) {
    console.error(error);
    const { status, message } = error.response.data;
    return { status, message };
  }
};

/* nueva version */

export const createProgramacionNew = async (
  { commit },
  { idConsejero, cuerpo }
) => {
  try {
    const headers = getHeaderToken();
    const params = { idConsejero };
    const url = `${ENDPOINTS.POST_CREATE_EVENTO_NEW}?${new URLSearchParams(
      params
    )}`;
    const newEntry = await investigacionApi.post(url, cuerpo, { headers });
    if (newEntry.status >= 200 && newEntry.status <= 299) {
      return newEntry.data;
    } else {
      return { message: "Error al crear la programación", status: false };
    }
  } catch (error) {
    console.error(error);
    return { message: "Server error", status: false };
  }
};

export const eliminarProgramacionesNewVersion = async ({ commit }, { id }) => {
  try {
    const headers = getHeaderToken();
    const params = { id };
    const url = `${ENDPOINTS.DELETE_EVENTO_NEW}?${new URLSearchParams(params)}`;
    var respuesta = await investigacionApi.delete(url, { headers });
    if (!respuesta || !respuesta.data) {
      throw new Error("La respuesta recibida es inválida");
    }
    const { message, status } = respuesta.data;
    return { message, status };
  } catch (error) {
    console.error(error);
    const { status, message } = error.response.data;
    return { status, message };
  }
};

export const getlistaEventosRepositorio = async ({ commit }, { idUsuario, idEvento }) => {
  try {
    const headers = getHeaderToken();
    const params = { idUsuario, idEvento };
    const url = `${ENDPOINTS.GET_LIST_EVENTO_REMEMBER}?${new URLSearchParams(
      params
    )}`;

    var respuesta = await investigacionApi.get(url, { headers });
    if (!respuesta || !respuesta.data) {
      throw new Error("La respuesta recibida es inválida");
    }
    return respuesta.data;
  } catch (err) {
    console.error(err);
    const { status, error } = err.response.data;
    return { status, message: error, data: [] };
  }
};

export const putEventNewRepository = async ({ commit }, { id, entry }) => {
  try {
    const headers = getHeaderToken();
    const params = { id };
    const url = `${ENDPOINTS.PUT_UPDATE_EVENTO_NEW}?${new URLSearchParams(
      params
    )}`;
    var respuesta = await investigacionApi.put(url, entry, { headers });
    if (!respuesta || !respuesta.data) {
      throw new Error("La respuesta recibida es inválida");
    }
    return respuesta.data;
  } catch (error) {
    console.error(error);
    const { status, message } = error.response.data;
    return { status, message };
  }
};