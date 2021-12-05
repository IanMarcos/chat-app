import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { userContext } from '../../context/userSession';
import { getCookie } from './../../helpers/cookies';

import Alert from '../commonComponents/Alert';

function SignIn() {    
    
    //Hooks
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({active: false, type:'', msg: ''});
    const { isSigned, signIn } = useContext(userContext);
    const navigate = useNavigate();

    /* eslint-disable */
    useEffect(() => {
        //Si al cargar el componente ya hay sesión iniciada, redirige al home
        if(isSigned() || getCookie('cvToken')) navigate('/');
    }, [])
    /* eslint-enable */

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
            ? 'http://localhost:8080/api/auth/signin'
            : '';

        const response = await fetch(url, {
            method:'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' }
        });
        const { results: {err, cvToken, user} } = await response.json();

        //Verificación de email y contraseña correctos
        if(err){
            setAlert({ active: true, type:'danger', msg:err});
            setTimeout( () => setAlert({...alert, active:false}),3000 );
            return null;
        }

        //Se actualizon los valores del context
        signIn(user.name, cvToken);

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
