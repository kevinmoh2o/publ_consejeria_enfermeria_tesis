import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const resetValues = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    return `${currentYear}-${currentMonth}`;
}

export const obtenerNombreMes = (fechaString) => {
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const [anio, mes] = fechaString.split('-');
    const fecha = new Date(anio, parseInt(mes) - 1);

    return meses[fecha.getMonth()];
}


export const calcalarFecIniAndFin = (fechaString) => {
    var fecFin = new Date(fechaString);
    fecFin.setHours(fecFin.getHours() + 1);
    return {
        fecIni: fechaString,
        fecFin
    };
}

export const stringF1FromDate = (fechaString) => {
    if( fechaString==undefined) return "";
    const date = new Date(fechaString);
    const formattedDate = format(date, "d 'de' MMMM 'de' yyyy, h:mm aaaa", { locale: es });
    return formattedDate;
}


export const stringF2OnlyDate = (fechaString) => {
    if( fechaString==undefined) return "";
    const date = new Date(fechaString);
    const formattedDate = format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
    return formattedDate;
}