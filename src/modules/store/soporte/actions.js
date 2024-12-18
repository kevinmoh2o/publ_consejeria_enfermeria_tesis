import investigacionApi from '@/apis/investigacionapi'
import { ENDPOINTS } from '../endpoints.js';
import { getHeaderToken } from '@/utils/JwTFunction.js';

export const gabarConsulta = async ({ commit }, entry) => {
    try {
        const headers = getHeaderToken();
        const newEntry = await investigacionApi.post(ENDPOINTS.POST_SOPORTE_CONSULTA_RECOMENDACION, entry, { headers });
        if (newEntry.status >= 200 && newEntry.status <= 299) {
            const { data, message, status } = newEntry.data;
            return { data, message, status };
        } else {
            return { message: "Error al crear la programación", status: false };
        }
    } catch (error) {
        console.error(error)
        return { message: "Server error", status: false };
    }
}
