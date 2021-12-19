
const createCookie = (name, value, expiration=15) => {
    //El cookie expiara en la fecha actual más la expiration en minutos
    const date = new Date();
    date.setTime(date.getTime()+(expiration*60*1000))
    let string = `${name}=${value}; expires=${date.toGMTString()}`;
    document.cookie = string;
}

const getCookie = name => {
    //Retorna undefined si no encuentra nada
    const cookieList = document.cookie.split(';');
    let cookie;
    cookieList.some( element => {
        let aux = element.split('=')
        if( aux[0].includes(name)){
            cookie = aux[1];
            return true;
        }
        return false;
    });
    return cookie;
}

const expireCookie = name => {
    //La fecha de expiración del cookie sa actualiza a un minuto en el pasado.
    const cookie = getCookie(name);
    if(!cookie) return;
    createCookie(name, '',-1);
}

export { createCookie, expireCookie, getCookie };