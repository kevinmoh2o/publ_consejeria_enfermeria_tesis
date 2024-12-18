import investigacionApi from '@/apis/investigacionapi'
import { ENDPOINTS } from '../endpoints.js';
import { getHeaderToken } from '@/utils/JwTFunction.js';

export const grabarRespuestaSatisfaccion = async ({ commit }, entry) => {
    try {
        const headers = getHeaderToken();
        const newEntry = await investigacionApi.post(ENDPOINTS.POST_RESPUESTA_SATISFACCION, entry, { headers });
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


export const getEncuestasDeSatisfaccion = async ({ commit }, entry) => {
    try {
        const headers = getHeaderToken();
        const { idConsejero } = entry;
        const params = { idConsejero };
        const url = `${ENDPOINTS.GET_ENCUESTAS_SATISFACCION}?${new URLSearchParams(params)}`;
        const rptReq = await investigacionApi.get(url, { headers });
        return rptReq.data;
    } catch (error) {
        const { status, message } = error.response.data;
        return { status, message };
    }
}


export const getResultados = async ({ commit }) => {
    try {
        const headers = getHeaderToken();
        const url = `${ENDPOINTS.GET_ENCUESTAS_RESULTADOS}`;
        const rptReq = await investigacionApi.get(url, { headers });
        const { status, data, message } = rptReq.data;
        return { status, data, message };
    } catch (error) {
        const { status, message } = error.response.data;
        return { status, message };
    }
}
