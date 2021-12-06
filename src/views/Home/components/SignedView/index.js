import { useContext, useState } from 'react';
import { userContext } from './../../../../context/userSession';
import Chat from './components/Chat';
import MainMenu from './components/MainMenu.js';
import UpdateUser from './components/UpdateUser';

function SignedView() {

    const { userName, updateUserName, signOut } = useContext(userContext);

    const mainMenuProps = {userName, signOut, changeView};
    const mainMenu = <MainMenu {...mainMenuProps}/>;
    const chat = <Chat/>;
    const updateUser = <UpdateUser changeView={changeView} updateUserName={updateUserName}/>
    
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
