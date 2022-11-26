import { io } from 'socket.io-client';
import { useContext, useEffect, useState, useRef } from 'react';
import { userContext } from '../../../../../../context/userSession';

import { getCookie } from '../../../../../../helpers/cookies';
import { basicNotification } from '../../../../../../helpers/sweetAlert2';
import { getServerUrl } from '../../../../../../helpers/urlGetter';

import Chat from './components/Chat';
import UserList from './components/UserList';

function ChatHub( {changeView} ) {

    const socket = useRef(null);
    const [users, SetUsers] = useState([]);
    const [partner, setPartner] = useState({});
    const [room, setRoom]= useState(-1);
    const [messages, setMessages] = useState([]);
    const { getUserInfo } = useContext(userContext)
    
    useEffect(() => {
        configSockets();
        return () => {
            socket?.current.disconnect();
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

    const handleUserSelect = async({target: {value}}) => {
        //Obtener los IdS de ambos participantes del chat
        const me = await getUserInfo();
        const partner = Object.values(users).find(user => user._id === value);

        //Crear la sala en el backend y conectar a los dos usuarios
        socket.current.emit(
            'join-room',                            //Evento
            {user1: me._id, user2: partner._id},    //Payload
            (roomIndex) => {                        //Callback
                setRoom(roomIndex);
                /*Cargar los mensajes de la sala se hace aquí porque setRoom no es síncrono,
                entonces room es undefined para el momento en el que se llega a la próxima instrucción.
                Un await no ayuda*/
                socket.current.emit(
                    'get-room-messages',
                    {roomIndex},
                    msgs => setMessages(msgs)
                );
            }
        );
        setPartner(partner);
    }

    const handleSendMsg = msg => {
        if(msg.length === 0) return;
        socket.current.emit('send-message', {uid:partner._id , msg, room});
    }

    const handleReturn = () => {
        setPartner({});
    }

    const handleExit = () => {
        changeView('main');
    }
    
    return(
        <div className="d-inline w-75">
            {!partner._id 
                ?<UserList {...{users}} {...{handleUserSelect}} {...{handleExit}}/>
                :<Chat user={partner.name} {...{messages}} sendMsg={handleSendMsg} {...{handleReturn}}/>
            }
        </div>
    );
}

export default ChatHub;
