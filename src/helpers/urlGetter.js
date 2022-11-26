const API_URL = import.meta.env.VITE_API_URL;

const getApiUrl = (append = '') => `${API_URL}/api/${append}`;

const getServerUrl = () => API_URL + '/';


export { getApiUrl, getServerUrl };