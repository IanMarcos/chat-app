const getApiUrl = (append = '') => {
    const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:8080/api/'
        : '';
    
    return url+append;
}

const getServerUrl = () => {
    if( window.location.hostname.includes('localhost') ){
        return 'http://localhost:8080/'
    } 
    return '';
}

export { getApiUrl, getServerUrl };