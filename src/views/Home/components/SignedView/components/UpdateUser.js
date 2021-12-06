import { useState } from 'react';
import { getCookie } from '../../../../../helpers/cookies';

import { basicNotification, passwordRequiredAlert } from './../../../../../helpers/sweetAlert2';
import FormBtn from '../../../../Signing/components/FormBtn';
import FormInput from '../../../../Signing/components/FormInput';

function UpdateUser({ changeView, updateUserName }) {
    //Hooks
    const [userData, setUserData] = useState({name:'', email:''});

    //Event Handlers
    const handleUserInput = ({ target: {name, value} }) => {
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();

        const {name, email} = userData;
        
        //Se busca el input del password en el event
        const input = Object.values(e.target).find( el => el.attributes?.name?.nodeValue  === 'password');
        const password = input.value;

        //Verificación de campos diligenciados
        if(name.length === 0 && email.length === 0 && password.length === 0){
            basicNotification('Cambia al menos un campo');
            return;
        }

        const updateUser = async({value: uid}) => {
            if (uid) {
                const url = ( window.location.hostname.includes('localhost') )
                    ? `http://localhost:8080/api/users/${uid}`
                    : '';

                const data = {};
                if( name.length !== 0) data.name = name;
                if( email.length !== 0) data.email = email;
                if( password.length !== 0) data.password = password;
                
                const fetchData = {
                    method:'Put',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'cvtoken': getCookie('cvToken')
                    }
                }
                
                try {
                    const response = await fetch(url, fetchData);
                    const { results: {err, updatedUser} } = await response.json();
                    if(err) {
                        basicNotification(err);
                        return
                    }
                    
                    updateUserName(updatedUser.name);
                    basicNotification(`El usuario ${updatedUser.name} con correo ${updatedUser.email} ha sido Actualizado`);
                    setTimeout(() => changeView('main'), 2500);

                } catch (error) {
                    basicNotification('Error en la conexión. Intenta en unos minutos');
                }
            }
        }
        passwordRequiredAlert(updateUser);
    }

    const handleExit = () => {
        changeView('main');
    }

    return(
        <div className="container center">
            <form onSubmit={handleOnSubmit}>
                <div className="col">
                    <FormInput 
                        name="name"
                        placeholder="Nuevo nombre"
                        value={userData.name}
                        handler={handleUserInput}
                    />
                    <FormInput 
                        name="email"
                        placeholder="Nuevo correo"
                        value={userData.email}
                        handler={handleUserInput}
                    />
                    <FormInput 
                        name="password"
                        placeholder=" Nueva contraseña"
                        type="password"
                    />
                    <FormBtn text={"Actualizar"} />
                    <div className="row justify-content-center my-2">
                        <button className="btn btn-secondary w-50" onClick={handleExit}>Volver</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser;
