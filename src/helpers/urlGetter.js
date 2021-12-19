const getApiUrl = (append = '') => {
    const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:8080/api/'
        : 'https://cv-webserver.herokuapp.com/api/';
    
    return url+append;
}

const getServerUrl = () => {
    if( window.location.hostname.includes('localhost') ){
        return 'http://localhost:8080/'
    } 
    return 'https://cv-webserver.herokuapp.com/';
}

export { getApiUrl, getServerUrl };