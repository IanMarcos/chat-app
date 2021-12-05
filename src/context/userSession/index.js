import { createContext, useState } from 'react';
import { createCookie, getCookie, expireCookie } from '../../helpers/cookies';

export const userContext = createContext();

export default function UserProvider( {children} ) {

    const initialName = getCookie('uName') || '';
    const [userName, setUserName] = useState(initialName);

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
    
    const isSigned = () => {
        return userName.length !== 0;
    }
    
    const signIn = (name, token) => {
        setUserName(name);
        createCookie('uName', name);
        createCookie('cvToken', token);
    }

    const signOut = () => {
        setUserName('');
        expireCookie('cvToken');
        expireCookie('uName');
    }

    return(
        <userContext.Provider value={{
            getUserInfo,
            isSigned,
            signIn,
            signOut,
            userName
        }}>
            {children}
        </userContext.Provider>
    )
}