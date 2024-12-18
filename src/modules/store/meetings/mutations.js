export const SET_EVENT_LIST = (state, eventsList) => {
  state.eventsList = eventsList;
};

export const CLEAR_EVENT_LIST = (state) => {
  state.eventsList = [];
};

export const ADD_EVENT = (state, event) => {
  state.eventsList.push(event);
};

export const REMOVE_EVENT = (state, eventId) => {
  state.eventsList = state.eventsList.filter(event => event.id !== eventId);
};

export const UPDATE_EVENT = (state, updatedEvent) => {
  //console.log(state)
  //console.log(updatedEvent)
  const index = state.eventsList.findIndex(event => event.id === updatedEvent.id);
  if (index !== -1) {
    state.eventsList.splice(index, 1, updatedEvent);
  }
};

/* SEGUNDO ESTADO */
export const SET_REMEMBER_LIST = (state, remmemberList) => {
  state.remmemberList = remmemberList;
};

export const CLEAR_REMEMBER_LIST = (state) => {
  state.remmemberList = {};
};

/* export const ADD_REMEMBER = (state, { userType, rememberData }) => {
  state.remmemberList[userType].push(rememberData);
}; */
export const ADD_REMEMBER = (state, { userType, rememberData }) => {
  // Asegurar que existe la lista para el userType antes de añadir datos
  if (!state.remmemberList[userType]) {
    state.remmemberList[userType] = []; // Inicializa con un arreglo vacío si no existe
  }
  
  // Ahora que estamos seguros de que el arreglo existe, podemos añadir el nuevo recordatorio
  state.remmemberList[userType].push(rememberData);
};


/* export const REMOVE_REMEMBER = (state, { userType, index }) => {
  const remember = state.remmemberList[userType][index];
  if (remember) {
    if (remember.action === 'C') {
      state.remmemberList[userType].splice(index, 1);
    } else if (['E', 'U'].includes(remember.action)) {
      remember.state = false;
      remember.action = 'D';
    }
  }
}; */
export const REMOVE_REMEMBER = (state, { userType, index }) => {
  let remember = state.remmemberList[userType][index];
  if (remember && remember.action !== 'C') {
    // Solo actualizar el estado y la acción si no es un recordatorio nuevo
    remember.state = false;
    remember.action = 'D';
  } else if (remember && remember.action === 'C') {
    // Eliminar completamente si es un nuevo recordatorio
    state.remmemberList[userType].splice(index, 1);
  }
};


export const UPDATE_REMEMBER = (state, { index, userType, updatedData }) => {
  if (index >= 0 && index < state.remmemberList[userType].length) {
    state.remmemberList[userType][index] = {...state.remmemberList[userType][index], ...updatedData};
  }
};



/* tercer estado */


export const SET_ONLOADING = (state, onloading) => {
  state.onloading = onloading;
};

export const CLEAR_ONLOADING = (state) => {
  state.onloading = false;
};