export const initializeVisitedSections = (store) => {
    let initialSections = localStorage.getItem('visitedSections');

    // Comprueba si el usuario ya ha completado el cuestionario de satisfacción
    const userProvider = store.state.authModule.userProvider;
    if (userProvider && userProvider.satisfactionQuest) {
        // Si el cuestionario está completado, todas las secciones deberían considerarse visitadas
        initialSections = {
            "main-menu": true,
            "agenda": true,
            "tema-consejeria": true,
            "registro-consejeria": true,
            "registrar": true,
        };
    } else if (!initialSections) {
        // Si no hay datos en localStorage, inicializa con el estado por defecto
        initialSections = {
            "main-menu": true,  // Suponiendo que "main-menu" siempre esté visitado por defecto
            "agenda": false,
            "tema-consejeria": false,
            "registro-consejeria": false,
            "registrar": false,
        };
    } else {
        // Si ya existen datos en localStorage, úsalos
        initialSections = JSON.parse(initialSections);
    }

    // Guarda el estado inicializado en localStorage y Vuex
    localStorage.setItem('visitedSections', JSON.stringify(initialSections));
    store.commit('authModule/setSections', initialSections);
};



// Marca la sección como visitada en el localStorage
export const markSectionAsVisited = (section) => {
    const visitedSections = JSON.parse(localStorage.getItem('visitedSections'));
    if (visitedSections.hasOwnProperty(section) && !visitedSections[section]) {
        visitedSections[section] = true;
        localStorage.setItem('visitedSections', JSON.stringify(visitedSections));
    }
};

// Verifica si todas las secciones han sido visitadas
export const areAllSectionsVisited = () => {
    const visitedSections = JSON.parse(localStorage.getItem('visitedSections'));
    return Object.values(visitedSections).every(status => status);
};