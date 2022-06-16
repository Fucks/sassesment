export const dateAndTimeToString = (value: Date) => {
    return `${value.toLocaleDateString('pt-BR')} ${value.toLocaleTimeString('pt-BR')}`
}

export const dateToString = (value: Date) => {
    return `${value.toLocaleDateString('pt-BR')}`
}

export const differenceBetweenDates = (start : Date, end: Date) => {

    const millis = end.getTime() - start.getTime();
    const seconds = Math.round(millis / 1000);

    if(seconds < 60) {
        return `${seconds} segundo${seconds > 1 ? 's' : ''}`;
    }

    const minutes = Math.round(seconds / 60);

    if(minutes < 60) {
        return `${minutes} minuto${minutes > 1 ? 's' : ''}`
    }

    const hours = Math.round(minutes / 60);

    return `${hours} hora${hours > 1 ? 's' : ''}`
}