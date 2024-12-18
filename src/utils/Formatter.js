import moment from "moment";

export const convertirToCalendarDate = (milisegundos) => {
  const fecha = new Date(milisegundos);
  const opciones = {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };
  return fecha.toLocaleDateString("es-ES", opciones);
};

export const isOudated = (milisegundos) => {
  const now = Date.now();
  return milisegundos < now;
};

/**
 * Calcula el tiempo de envío de un recordatorio basado en minutos.
 * @param {number} scheduleTime - El tiempo en minutos antes del evento para enviar el recordatorio.
 * @param {string} startTime - La fecha y hora de inicio del evento en formato ISO.
 * @return {string} - La fecha y hora en formato ISO para enviar el recordatorio.
 */
function calculateReminderTimeMinutes(scheduleTime, startTime) {
  let eventStartTime = moment(startTime); // Convierte la fecha de inicio en un objeto moment
  let reminderTime = eventStartTime.subtract(scheduleTime, "minutes"); // Resta los minutos
  return reminderTime.toISOString(); // Convierte la fecha del recordatorio a formato ISO
}

// Ejemplo de otras funciones de calculo
const calculateReminderTimeHours = (timeBefore, startDateTime) => {
    let eventStartTime = moment(startDateTime);
    let reminderTime = eventStartTime.subtract(timeBefore, 'hours');
    return reminderTime.toISOString();
};

const calculateReminderTimeDays = (timeBefore, startDateTime) => {
    let eventStartTime = moment(startDateTime);
    let reminderTime = eventStartTime.subtract(timeBefore, 'days');
    return reminderTime.toISOString();
};

const calculateReminderTimeWeeks = (timeBefore, startDateTime) => {
    let eventStartTime = moment(startDateTime);
    let reminderTime = eventStartTime.subtract(timeBefore, 'weeks');
    return reminderTime.toISOString();
};


export const calculatedRememberTime = (type, timeBefore, startDateTime) => {
    switch (type) {
        case 'minutos':
            return calculateReminderTimeMinutes(timeBefore, startDateTime);
        // Añadir casos adicionales para horas, días, semanas si es necesario
        case 'horas':
            return calculateReminderTimeHours(timeBefore, startDateTime);
        case 'dias':
            return calculateReminderTimeDays(timeBefore, startDateTime);
        case 'semanas':
            return calculateReminderTimeWeeks(timeBefore, startDateTime);
        default:
            return null;  // Corregido: 'default' debe ser seguido por ':'
    }
};