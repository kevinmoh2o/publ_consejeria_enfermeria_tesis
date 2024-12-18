export const sendConsulta = async (store, { message, usr, fullName }) => {
    //console.log({ message, usr, fullName });
    let fechaActual = new Date();

    try {
        // Intenta despachar la acción y espera por la respuesta
        const response = await store.dispatch('soporteModule/gabarConsulta', {
            consulta: {
                idUser: usr,
                fullName,
                createdAt: fechaActual.toISOString(),
                detalle: message
            }
        });

        // Verifica la respuesta y retorna un objeto adecuado
        if (response && response.status) {
            return response;
        } else {
            // En caso de que la respuesta no tenga el estado esperado
            console.error("Error al agregar consulta, respuesta sin estado de éxito.");
            return {
                status: false,
                message: 'Error al agregar consulta, respuesta sin estado de éxito.'
            };
        }
    } catch (error) {
        // Maneja los errores que puedan surgir durante la ejecución de la acción
        console.error("Error al realizar la acción de Vuex para agregar consulta:", error);
        return {
            success: false,
            message: `Error al realizar la acción: ${error.message || error}`
        };
    }
}
