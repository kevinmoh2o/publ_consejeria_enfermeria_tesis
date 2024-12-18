export const cuestionario = [
    {
        nro: 1,
        pregunta: "Fue simple usar esta plataforma.",
        respuesta: null,
    },
    {
        nro: 2,
        pregunta: "Fue fácil aprender a utilizar esta plataforma.",
        respuesta: null,
    },
    {
        nro: 3,
        pregunta: "Creo que me volví experto rápidamente utilizando esta plataforma.",
        respuesta: null,
    },
    {
        nro: 4,
        pregunta: "La plataforma muestra mensajes de error que me dicen claramente cómo resolver los problemas.",
        respuesta: null,
    },
    {
        nro: 5,
        pregunta: "Cada vez que cometo un error utilizando la plataforma lo resuelvo fácil y rápidamente.",
        respuesta: null,
    },
    {
        nro: 6,
        pregunta: "La información (como ayuda en línea, mensajes en pantalla y otra documentación) que provee esta plataforma es clara.",
        respuesta: null,
    },
    {
        nro: 7,
        pregunta: "Es fácil encontrar en la plataforma la información que necesito.",
        respuesta: null,
    },
    {
        nro: 8,
        pregunta: "La información que proporciona la plataforma fue efectiva ayudándome a completar las tareas.",
        respuesta: null,
    },
    {
        nro: 9,
        pregunta: "La organización de la información de la plataforma en la pantalla fue clara.",
        respuesta: null,
    },
    {
        nro: 10,
        pregunta: "La interfaz de la plataforma fue placentera.",
        respuesta: null,
    },
    {
        nro: 11,
        pregunta: "Me gustó utilizar la plataforma.",
        respuesta: null,
    },
    {
        nro: 12,
        pregunta: "La plataforma tuvo todas las herramientas que esperaba que tuviera.",
        respuesta: null,
    },
    {
        nro: 13,
        pregunta: "En general, estuve satisfecho con la plataforma.",
        respuesta: null,
    }
];


export const isComplete = (input) => {
    var contador = 0;
    var obj = [];
    input.forEach(element => {
        if (!element.respuesta) {
            contador++;
            obj.push(element.nro)
        }
    });
    return {
        state: !(contador > 0),
        message: (contador > 0) ? `Tiene ${contador} pregunta(s) [${arrayToString(obj)}] sin responder, por favor, complete el cuestionario.` : ''
    }
}


export const buildJSONToStore = async (store, quest, usr) => {
    try {
        const respuestas = quest.map(element => ({
            nro: element.nro,
            respuesta: parseInt(element.respuesta, 10),
        }));

        const encuesta = {
            idUser: usr,
            createdAt: new Date().toISOString(),
            respuestas: respuestas
        };

        const { data, message, status } = await store.dispatch('satisfaccionModule/grabarRespuestaSatisfaccion', { encuesta });
        //console.log({ data, message, status })
        if (status) {
            await store.dispatch('authModule/updateSatisfactionQuest', true);
            //window.location.reload(true);
            //TODO: REGENERAR EL TOKEN
        }
        return {
            status: 'success',
            message: message
        };
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        return {
            status: 'error',
            message: 'Error al guardar los datos'
        };
    }
}


export const getResultados = async (store) => {
    try {
        const { status, data, message } = await store.dispatch('satisfaccionModule/getResultados');
        return { status, data, message };
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        return {
            status: 'error',
            message: 'Error al guardar los datos'
        };
    }
}



function arrayToString(arr) {
    if (arr.length > 1) {
        let baseString = arr.slice(0, -1).join(', ');
        return `${baseString} y ${arr[arr.length - 1]}`;
    } else {
        return arr.join('');
    }
}
