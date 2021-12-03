import { useContext } from 'react';
import { userContext } from './../../context/userSession';

import DefaultView from './components/DefaultView';
import styles from './style.module.css';

function Home() {

    const { userName } = useContext(userContext);
    //TODO: Sign Out manual
    return(
        <div className={styles.center}>
            {userName.length !== 0 ? `Bienvenido ${userName}!` : <DefaultView/>}
        </div>
    )
}

export default Home;
