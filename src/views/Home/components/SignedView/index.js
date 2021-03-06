import { useState } from 'react';
import ChatHub from './components/ChatHub';
import MainMenu from './components/MainMenu';
import UpdateUser from './components/UpdateUser';

function SignedView() {

    const mainMenu = <MainMenu {...{changeView}}/>;
    const chatHub = <ChatHub {...{changeView}}/>;
    const updateUser = <UpdateUser {...{changeView}}/>
    
    const [view, setView] = useState(mainMenu);

    function changeView(name) {
 
        if(name === 'chat'){
            setView( chatHub );
        } else if (name === 'update') {
            setView( updateUser );
        } else {
            setView(mainMenu);
        }    
    }

    return(<>{view}</>)
}

export default SignedView;
