import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '../commonComponents/Alert';

function SignIn() {
//TODO REDIRIGIR SI YA TIENE SECIÖN INICIADA    
    const navigate = useNavigate();

    //Hooks
    const [email, setEmail] = useState('');
    // Constraseña no es almacenada en un hook por ser accesible con herramientas de desarrollo
    const [alert, setAlert] = useState({active: false, type:'', msg: ''});


    //Event Handlers
    const handleEmail = ({target: {value}}) => {
        setEmail(value);
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();

        //Se extrae la contraseña del event
        const password = e.target[1].value;

        //Verificación de campos diligenciados
        if(email.length === 0 || password.length === 0){
            setAlert({ active: true, type:'warning', msg:'Ambos campos son obligatorios' });
            setTimeout( () => setAlert({...alert, active:false}),3000 );
            return null;
        }

        //Llamado a la API
        const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : '';

        const response = await fetch(url, {
            method:'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' }
        });
        const { results } = await response.json();

        //Verificación de email y contraseña correctos
        if(results.err){
            setAlert({ active: true, type:'danger', msg:results.err});
            setTimeout( () => setAlert({...alert, active:false}),3000 );
            return null;
        }

        //Se almacena el token de sesión
        localStorage.setItem('cvToken', results.cvToken);

        //Redirección a home
        navigate('/');
    }

    return(
        <div className="container">
            <form onSubmit={handleOnSubmit}>
                <div className="col">
                    <div className="row">
                        <label>
                            <input 
                                name="email"
                                placeholder="Correo"
                                value={email}
                                onChange={handleEmail}
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
                        <p>¿No tienes cuenta? <Link to ="/signup">Regístrate</Link></p>
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

export default SignIn;
