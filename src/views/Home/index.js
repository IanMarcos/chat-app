import { useContext } from 'react';
import { userContext } from './../../context/userSession';

import DefaultView from './components/DefaultView';
import SignedView from './components/SignedView';
import styles from './style.module.css';

function Home() {
    const { userName } = useContext(userContext);
    return(
        <div className={styles.center}>
            {userName.length === 0 ? <DefaultView/> : <SignedView/>}
        </div>
    )
}

export default Home;
