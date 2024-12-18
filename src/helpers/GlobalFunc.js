import { decryptData } from '@/helpers/SecurityFunc';
import { jwtDecode } from "jwt-decode";

export const isUserData = async (store) => {
    try {
        const token = localStorage.getItem('user');
        /* const userLocal = localStorage.getItem('user');
        const decryptedData = decryptData(userLocal);
        if (!decryptedData) {
            console.error('No valid data to parse');
            return {
                state: false,
                data: null,
            };
        }

        const data = JSON.parse(decryptedData);
        const state = data && Object.keys(data).length > 0; */
        if (token) {
            await store.dispatch('authModule/setUserProvider', jwtDecode(token));
        }

        return {
            state,
            data,
        };
    } catch (error) {
        console.error("Error parsing user data:", error);
        return {
            state: false,
            data: null,
        };
    }
};


/* export const isUserData = async (store) => {
    try {

        //const userLocal = localStorage.getItem('user');
        //const userString = decryptData(userLocal);
        //const data = usertest ? JSON.parse(usertest) : null;
        //const state = data && Object.keys(data).length > 0;
        const userLocal = localStorage.getItem('user');
        const data = decryptData(userLocal);
        const state = data && Object.keys(data).length > 0;


        if (state) {
            await store.dispatch('authModule/setUserProvider', data);
        }
        //console.log(data)
        return {
            state,
            data,
        };
    } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return {
            state: false,
            data: null,
        };
    }
} */


export const userProviderToVuex = async (store) => {
    try {
        const token = localStorage.getItem('user');
        if (token) {
            await store.dispatch('authModule/setUserProvider', jwtDecode(token));
        }
        return {
            state: token?true:false,
            userProv: jwtDecode(token),
        };
    } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return {
            state: false,
            data: null,
        };
    }
}


export const updateSatisfactionQuest = (newStatus) => {
    try {
        // Obtener el usuario de localStorage
        /* const userString = localStorage.getItem('user');
        if (!userString) {
            console.log("No user data found in localStorage.");
            return false;
        }

        // Parsear el JSON obtenido
        const userData = JSON.parse(userString);

        // Actualizar la propiedad satisfactionQuest
        userData.satisfactionQuest = newStatus;

        // Convertir el objeto de usuario actualizado de nuevo a string
        const updatedUserString = JSON.stringify(userData);

        // Guardar el objeto de usuario actualizado en localStorage
        localStorage.setItem('user', updatedUserString); */

        //console.log("satisfactionQuest updated successfully.");
        return true;
    } catch (error) {
        console.error("Error updating satisfactionQuest:", error);
        return false;
    }
}
