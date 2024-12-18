
export const getEvents = (state) => {
    return state.entries
}

export const getEstado = (state) => {
    /*  console.log("state setIsLoading",state.isLoading) */
    return state.isLoading
}

// id
export const getEntryById = (state) => (id = '') => {

    const entry = state.entries.find(entry => entry.id === id)

    if (!entry) return

    return { ...entry } // TODO: prueben
}



export const allSectionsVisited = (state) => {
    return Object.values(state.sections).every(status => status);
}

export const satisfactionQuest = (state) => {
    return state.userProvider ? state.userProvider.satisfactionQuest : null;
}