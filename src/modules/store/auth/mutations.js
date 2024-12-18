/* export const SET_LOADING = (state, { type, value }) => {
  if (state.isLoading.hasOwnProperty(type)) {
    state.isLoading[type] = value;
  }
}; */

export const SET_USER_PROVIDER = (state, userProvider) => {
  state.userProvider = userProvider;
};


export const setSections = (state, sections) => {
  state.sections = sections;
};

export const markSectionVisited = (state, section) => {
  if (state.sections.hasOwnProperty(section) && !state.sections[section]) {
    state.sections[section] = true;
    saveSections(state)
  }
};

export const SET_SATISFACTION_QUEST = (state, value) => {
  if (state.userProvider) {
    state.userProvider.satisfactionQuest = value;
  } else {
    // Opcional: Puedes manejar el caso donde userProvider aún no está definido.
    console.error("Intento de establecer satisfactionQuest en un userProvider no definido.");
  }
};


export const setSectionVisited = (state, section) => {
  if (state.sections.hasOwnProperty(section)) {
    state.sections[section] = true;
    localStorage.setItem('visitedSections', JSON.stringify(state.sections));
  }
}


export const saveSections = (state) => {
  localStorage.setItem('visitedSections', JSON.stringify(state.sections));
}






/* export const CLEAR_LOADING = (state) => {
  state.isLoading = {
    loading: false,
    success: false,
    error: false
  };
}; */

export const CLEAR_USER_PROVIDER = (state) => {
  state.userProvider = null;
};

export const CLEAR_SECTIONS = (state) => {
  state.sections = {};
};