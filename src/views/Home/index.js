import { useContext } from 'react';
import { userContext } from './../../context/userSession';

import DefaultView from './components/DefaultView';
import SignedView from './components/SignedView';

function Home() {
    const { userName } = useContext(userContext);
    return(
        <div className="center">
            {userName.length === 0 ? <DefaultView/> : <SignedView/>}
        </div>
    )
}

export default Home;
