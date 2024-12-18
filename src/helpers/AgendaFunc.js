export const isSelectedAny = (input) => {
  var contador = 0;
  var data = [];
  input.forEach((element) => {
    data.push(element.id);
  });
  return {
    state: input.length > 0,
    data,
    message: input.length > 0 ? `` : "No hay ningún elemnto seleccionado",
  };
};

export const putDurationEvent = async (store, { idEvento, duration }) => {
  const { message, status, data } = await store.dispatch(
    "meetingModule/actualizarDurationMeeting",
    { idEvento, duration }
  );
  return { message, status, data };
};

export const serSetEventos = async (store, valor) => {
  try {
    const { message, status, data } = await store.dispatch(
      "meetingModule/setEventsList",
      valor
    );
    return { message, status, data };
  } catch (error) {
    console.error("Error setting events:", error);
    return { message: "Error setting events", status: "error", data: null };
  }
};

export const getEventosByIdMeetingService = async (
  store,
  { idUsuario, idEvento }
) => {
  try {
    const { message, status, data } = await store.dispatch(
      "meetingModule/getlistaEventosRepositorio",
      { idUsuario, idEvento }
    );
    return { message, status, data };
  } catch (error) {
    console.error("Error setting events:", error);
    return { message: "Error setting events", status: "error", data: null };
  }
};

export const putStateRememberListService = (store, objeto) => {
  store.dispatch("meetingModule/setRemmemberList", objeto);
};

export const setStateOnLoadingService = (store, valor) => {
  store.dispatch("meetingModule/setOnloading", valor);
};


/* export const onCreateRemember = (store, { userType }) => {
  const rememberData = buildJsonRemember(userType);
  store.dispatch("meetingModule/addRemember", { userType, rememberData });
};

export const eliminarRecordatorio = (store, { userType, index }) => {
  store.dispatch("meetingModule/removeRemember", { userType, index });
};

function buildJsonRemember(argTipoUser) {
  return {
    idUsuario: "ss",
    action: "C",
    scheduletime: 0,
    userType: argTipoUser,
    state: true,
    type: "minutos",
  };
} */
