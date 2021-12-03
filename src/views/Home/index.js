import { useContext } from 'react';
import { userContext } from './../../context/userSession';

function Home() {

    const { userName } = useContext(userContext);
    return(
        <p>{userName.length !== 0 ? `Bienvenido ${userName}!` : 'Bienvenido!'}</p>
    )
}

export default Home;
