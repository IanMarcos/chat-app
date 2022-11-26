import { createContext, useState } from 'react';
import { createCookie, getCookie, expireCookie } from '../../helpers/cookies';
import { getApiUrl } from '../../helpers/urlGetter';

export const userContext = createContext();

export default function UserProvider( {children} ) {

    const initialName = getCookie('uName') || '';
    const [userName, setUserName] = useState(initialName);

    const getUserInfo = async() => {
        const cvToken = getCookie('cvToken');

        const response = await fetch(getApiUrl('auth/'), {
            method:'POST',
            headers: {
                'cvtoken': cvToken
            }
        })
        const { results: {err, cvToken: token, user} } = await response.json();

        if(err) return null;
        signIn(user.name, token);
        return(user);
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

    const updateUserName = newName => {
        setUserName(newName);
    }

    return(
        <userContext.Provider value={{
            getUserInfo,
            isSigned,
            signIn,
            signOut,
            userName,
            updateUserName
        }}>
            {children}
        </userContext.Provider>
    )
}