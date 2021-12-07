import { useContext } from 'react';
import { userContext } from './../../../../../context/userSession';
import { getCookie } from '../../../../../helpers/cookies';
import { basicNotification, confirmationAlert, passwordRequiredAlert } from '../../../../../helpers/sweetAlert2';

function MainMenu ({ changeView }) {

    const { userName, signOut } = useContext(userContext);
    
    const handleViewChange = ({target: {name}}) => {
        changeView(name);
    }
    
    const handleDeleteAccount = () => {

        const deleteUser = async({value: uid}) => {
            if (uid) {
                const url = ( window.location.hostname.includes('localhost') )
                    ? `http://localhost:8080/api/users/${uid}`
                    : '';

                const data = {
                    method:'DELETE',
                    headers: {
                        'cvtoken': getCookie('cvToken')
                    }
                }
                
                try {
                    const response = await fetch(url, data);
                    const { results: {err, deletedUser} } = await response.json();
                    if(err) {
                        basicNotification(err);
                        return
                    }
                    
                    basicNotification(`El usuario ${deletedUser.name} ha sido eliminado`);
                    signOut();
                    setTimeout(() => window.location.reload(), 2500);

                } catch (error) {
                    basicNotification('Error en la conexión. Intenta en unos minutos');
                }
            }
        }

        passwordRequiredAlert(deleteUser);
    }

    const handleSignOut = () => {  
        const callback = result => {
            if (result.isConfirmed) {
                signOut();
                setTimeout(() => window.location.reload(), 500);
            }
        }
        confirmationAlert(callback);
    }

    
    return(
        <div className="container w-50">
            <div className="row justify-content-center">
                <h1 align="center">{`Bienvenido ${userName}!`}</h1>
            </div>
            <div className="row justify-content-center">¿Qué deseas hacer?</div>
            <div className="row justify-content-center">
                <button name="chat" className="btn btn-primary" onClick={handleViewChange}>
                    Chatear
                </button>
            </div>
            <div className="row justify-content-center">
                <button name="update" className="btn btn-primary" onClick={handleViewChange}>
                    Actualizar Datos
                </button>            
            </div>
            <div className="row justify-content-center">
                <button className="btn btn-danger" onClick={handleDeleteAccount}>Eliminar cuenta</button>            
            </div>
            <div className="row justify-content-center">
                <button className="btn btn-secondary" onClick={handleSignOut}>Salir</button>
            </div>
        </div>
    )
}

export default MainMenu;
