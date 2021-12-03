import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { userContext } from '../../context/userSession';
import Alert from '../commonComponents/Alert';

function SignUp() {
    
    //Hooks
    const [userData, setUserData] = useState({name:'', email:''});
    const [alert, setAlert] = useState({active: false, type:'', msg: ''});
    const { isSigned, setUser, signInOut } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        //Si al cargar el componente ya hay sesión iniciada, redirige al home
        if(isSigned || localStorage.getItem('cvToken')) navigate('/');
    }, [])

    //Event Handlers
    const handleUserInput = ({ target: {name, value} }) => {
        /*El valor del nombre del <input> se guarda como la llave del objeto. Si el input tiene por nombre
        "email", entonces userData.email es actualizado con el value del target. 
        Si del target del evento llegase el 'name' "asdf", entonces se almacenaria el 'value' en userData.asdf  */
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();

        //Se extrae la contraseña del event
        const password = e.target[1].value;

        const {name, email} = userData;

        //Verificación de campos diligenciados
        if(email.length === 0 || password.length === 0){
            setAlert({ active: true, type:'warning', msg:'Correo y contraseña son obligatorios' });
            setTimeout( () => setAlert({...alert, active:false}),3000 );
            return null;
        }

        //Llamado a la API
        const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/users/'
            : '';

        const response = await fetch(url, {
            method:'POST',
            body: JSON.stringify({name, email, password}),
            headers: { 'Content-Type': 'application/json' }
        });
        const { results: {msg, cvToken, uName} } = await response.json();
        
        //Se guarda el Jwt en el localSotrage para mantener la sesión
        localStorage.setItem('cvToken', cvToken);
        localStorage.setItem('uName', uName);

        //Se actualizon los valores del context
        setUser(uName);
        signInOut();

        //Se muestra mensaje de creación exitosa
        setAlert({ active: true, type:'success', msg });
        //Tras tres segundo se baja la alerta, y se redirige al home
        setTimeout(() => {
            setAlert({...alert, active:false});
            navigate('/');
        }, 3000);
    }

    return(
        <div className="container">
            <form onSubmit={handleOnSubmit}>
                <div className="col">
                <div className="row">
                        <label>
                            <input 
                                name="name"
                                placeholder="Nombre (No obligatorio)"
                                value={userData.name}
                                onChange={handleUserInput}
                            />   
                        </label>
                    </div>
                    <div className="row">
                        <label>
                            <input 
                                name="email"
                                placeholder="Correo"
                                value={userData.email}
                                onChange={handleUserInput}
                            />   
                        </label>
                    </div>
                    <div className="row">
                        <label>
                            <input
                                name="password" 
                                placeholder="Constraseña" 
                                type="password" 
                            />
                        </label>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-success"> Iniciar sesión</button>
                    </div>
                    <div className="row">
                        <p>¿Ya tienes cuenta? <Link to ="/signin">Inicia sesión</Link></p>
                    </div>
                    {alert.active? 
                        <Alert {...{type: alert.type, msg:alert.msg}}/>
                        : undefined
                    }
                </div>
            </form>
        </div>
    )
}

export default  SignUp;
