import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { getCookie } from '../../../../../../helpers/cookies';
import { basicNotification } from '../../../../../../helpers/sweetAlert2';
import { getServerUrl } from '../../../../../../helpers/urlGetter';
import Chat from './components/Chat';
import UserList from './components/UserList';

function ChatHub() {

    const [users, SetUsers] = useState([]);
    const [targetUser, setTargetUser] = useState({});
    
    useEffect(() => {
        connectSockets();
    }, []);

    useEffect(() => {
        console.log('hi');
    }, [targetUser]);

    function connectSockets() {
        try {
            const socket = io(getServerUrl(), {
                'extraHeaders': {
                    cvtoken: getCookie('cvToken')
                }
            });
            
            socket.on('active-users', payload => {
                console.log(payload);
                SetUsers(payload);
            });
        } catch (error) {
            basicNotification('Se perdió la conexión con el servidor');
            window.location.reload();
        }
    }

    const handleUserSelect = ({target: {value}}) => {
        const target = Object.values(users).find(user => user._id === value)
        setTargetUser(target);
    }
    
    return(
        <>
            {!targetUser._id 
                ?<UserList users={users} handler={handleUserSelect}/>
                :<Chat/>
            }
        </>
    );
}

export default ChatHub;
