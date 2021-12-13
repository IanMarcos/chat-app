const getApiUrl = (append = '') => {
    const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:8080/api/'
        : '';
    
    return url+append;
}

export { getApiUrl };