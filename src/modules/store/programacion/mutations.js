//El state es reativo y notificar todos los lugares que escuchan el store
// export const myAction = ( state ) => {
// }

export const setUsuarioPersonaList = (state, entries) => {
  state.usuarioPersonaList = entries;
}

export const setRectwidth = (state, entries) => {
  state.rectwidth = entries;
}

export const setTranUserPeople = (state, entries) => {
  state.tranUserPeople = entries;
}

export const setUserProvider = (state, entries) => {
  state.userProvider = entries;
}

export const setEntries = (state, entries) => {
  state.entries = entries;
}


export const setCounter = (state, newCounterValue) => {
  state.counter = newCounterValue;
  localStorage.setItem('counter', newCounterValue);
};

export const setUser = (state, user) => {
  state.user = user;
};


export const addProgramacion = (state, entry) => {
  //console.log("Mutacion addProgramacion", state, entry)
  state.entries.push(entry)
}





export const updateEntry = (state, entry) => {
  const index = state.entries.findIndex((e) => e.id === entry.id);
  if (index !== -1) {
    state.entries.splice(index, 1, entry);
  }
};

export const addEntry = (state, entry) => {
  //console.log("Mutacion addEntry", state, entry)
  state.entries.push(entry)
}

/* export const deleteEntry = (state, id) => {
  const index = state.entries.findIndex(entry => entry.id === id);
  if (index !== -1) {
    state.entries.splice(index, 1);
  }
} */

export const setIsLoading = (state, valor) => {
  state.isLoading = valor
}


export const addUser = (state, valor) => {
  state.respuesta = valor
}


export const resetState = (state, valor) => {
  state.isLoading = {
    loading: false,
    success: false,
    error: false
  };
  state.respuesta = {};
  state.userProvider = {
    status: false,
    data: null,
    message: "null"
  };
  state.usuarioPersonaList = [];
  state.tranUserPeople = {};
  state.entries = [];
}



/* export const updateEntry = (state, entry) => {
  const index = state.entries.findIndex(e => e.id === entry.id)
  state.entries.splice(index, 1, entry)
} */