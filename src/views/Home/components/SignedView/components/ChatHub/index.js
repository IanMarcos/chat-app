import { io } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import { getCookie } from '../../../../../../helpers/cookies';
import { basicNotification } from '../../../../../../helpers/sweetAlert2';
import { getServerUrl } from '../../../../../../helpers/urlGetter';
import Chat from './components/Chat';
import UserList from './components/UserList';

function ChatHub() {

    const socket = useRef(null);
    const [users, SetUsers] = useState([]);
    const [partner, setPartner] = useState({});
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        configSockets();
        return () => {
            socket.current.disconnect();
        }
    }, []);

    function configSockets() {
        try {
            socket.current = io(getServerUrl(), {
                'extraHeaders': {
                    cvtoken: getCookie('cvToken')
                }
            });

            socket.current.on('active-users', payload => {
                SetUsers(payload);
            });

            socket.current.on('priv-message', ({ msgs }) => {
                setMessages(msgs);
            })

        } catch (error) {
            basicNotification('Se perdió la conexión con el servidor');
            window.location.reload();
        }
    }

    const handleUserSelect = ({target: {value}}) => {
        const target = Object.values(users).find(user => user._id === value)
        setPartner(target);
    }

    const handleSendMsg = msg => {
        if(msg.length === 0) return;
        socket.current.emit('send-message', {uid:partner._id , msg})
    }
    
    return(
        <>
            {!partner._id 
                ?<UserList users={users} handler={handleUserSelect}/>
                :<Chat user={partner.name} messages={messages} sendMsg={handleSendMsg}/>
            }
        </>
    );
}

export default ChatHub;
