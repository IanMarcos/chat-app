import { useState } from 'react';
import Chat from './components/Chat';
import MainMenu from './components/MainMenu.js';
import UpdateUser from './components/UpdateUser';

function SignedView() {

    const mainMenu = <MainMenu changeView={changeView}/>;
    const chat = <Chat/>;
    const updateUser = <UpdateUser changeView={changeView}/>
    
    const [view, setView] = useState(mainMenu);

    function changeView(name) {
 
        if(name === 'chat'){
            setView( chat );
        } else if (name === 'update') {
            setView( updateUser );
        } else {
            setView(mainMenu);
        }    
    }

    return(
        <>
            {view}
        </>
    )
}

export default SignedView;
