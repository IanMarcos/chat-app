import { createContext, useState } from 'react';
import { getCookie } from '../../helpers/cookies';

export const userContext = createContext();

export default function UserProvider( {children} ) {

    const initialName = getCookie('uName') || '';
    const initialSigned = initialName.length !== 0;
    const [userName, setUserName] = useState(initialName);
    const [isSigned, setIsSigned] = useState(initialSigned);

    const getUserInfo = async() => {
        const url = ( window.location.hostname.includes('localhost') )
        ? 'http://localhost:8080/api/auth/signin'
        : '';
        const cvToken = getCookie('cvToken');

        const response = await fetch(url, {
            method:'POST',
            headers: {
                'cvtoken': cvToken
            }
        })
        const { results } = await response.json();
        console.log(results);
    }

    const setUser = name => {
        setUserName(name);
    }
    
    const signInOut = () => {
        //Si ya tiene sesión, entonces está saliendo de sesión, por lo tanto se borra su nombre
        if(isSigned) setUserName('');
        setIsSigned(!isSigned);
    } 

    return(
        <userContext.Provider value={{
            getUserInfo,
            isSigned,
            setUser,
            signInOut,
            userName
        }}>
            {children}
        </userContext.Provider>
    )
}