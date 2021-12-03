
const createCookie = (name, value, expiration=15) => {
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

export { createCookie, getCookie };