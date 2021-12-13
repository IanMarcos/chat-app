import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../context/userSession';
import { getCookie } from '../../../helpers/cookies';
import { getApiUrl } from '../../../helpers/urlGetter';

import Alert from '../components/Alert';
import FormBtn from '../components/FormBtn';
import FormInput from '../components/FormInput';
import LinkText from '../components/LinkText';

function SignUp() {
    
    //Hooks
    const [userData, setUserData] = useState({name:'', email:''});
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

        const {name, email} = userData;
        
        //Se busca el input del password en el event
        const input = Object.values(e.target).find( el => el.attributes?.name?.nodeValue  === 'password');
        const password = input.value;

        //Verificación de campos diligenciados
        if(email.length === 0 || password.length === 0){
            setAlert({ active: true, type:'warning', msg:'Correo y contraseña son obligatorios' });
            setTimeout( () => setAlert({...alert, active:false}),3000 );
            return null;
        }

        //Llamado a la API
        try {
            const response = await fetch(getApiUrl('users/'), {
                method:'POST',
                body: JSON.stringify({name, email, password}),
                headers: { 'Content-Type': 'application/json' }
            });
            const { results: {msg, cvToken, uName} } = await response.json();
            //Se actualizon los valores del context
            signIn(uName, cvToken);
    
            //Se muestra mensaje de creación exitosa
            setAlert({ active: true, type:'success', msg });
            //Tras tres segundo se baja la alerta, y se redirige al home
            setTimeout(() => {
                setAlert({...alert, active:false});
                navigate('/');
            }, 2000);
        } catch (error) {
            setAlert({ active: true, type:'danger', msg:'Error en la conexión al servidor' });
            setTimeout(() => {
                setAlert({...alert, active:false});
            }, 3000);
        }
    }

    return(
        <div className="container center">
            <form onSubmit={handleOnSubmit}>
                <div className="col">
                    <FormInput 
                        name="name"
                        placeholder="Nombre"
                        value={userData.name}
                        handler={handleUserInput}
                    />
                    <FormInput 
                        name="email"
                        placeholder="Correo*"
                        value={userData.email}
                        handler={handleUserInput}
                    />
                    <FormInput 
                        name="password"
                        placeholder="Contraseña*"
                        type="password"
                    />
                    <FormBtn text={"Iniciar sesión"} />
                    <LinkText 
                        text={"¿Ya tienes cuenta?"}
                        hypertext={"Inicia sesión"}
                        path={"/signin"}
                    />
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
