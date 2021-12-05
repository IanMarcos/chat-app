import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { userContext } from './../../../../context/userSession';

function SignedView() {

    const [view, setView] = useState({});
    const { userName, signOut } = useContext(userContext);

    const handleViewChange = ({target: {name}}) => {
        setView( {name} )
    }

    const handleSignOut = () => {
        Swal.fire({
            title: '¿Segur@?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(() => {
                    signOut();
                    window.location.reload();
                }, 500);
            }
        })
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
                <button className="btn btn-danger">Eliminar cuenta</button>            
            </div>
            <div className="row justify-content-center">
                <button className="btn btn-secondary" onClick={handleSignOut}>Salir</button>
            </div>
        </div>
    )
}

export default SignedView;
