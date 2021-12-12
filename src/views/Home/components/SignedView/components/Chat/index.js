import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { basicNotification } from '../../../../../../helpers/sweetAlert2';
import UserList from './components/UserList';

function Chat() {

    let socket;
    const [users, SetUsers] = useState([]);
    const [targetUser, setTargetUser] = useState('');
    
    useEffect(() => {
        const fetchUsers = async() => {
            const url = ( window.location.hostname.includes('localhost') )
                ? `http://localhost:8080/api/users/`
                : '';
    
            const response = await fetch(url);
            const { results : {err, users}} = await response.json();

            if(err) {
                basicNotification(err);
                setTimeout(window.location.reload(), 3000);
            }

            SetUsers(users);
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        socket = io('http://localhost:8080/');
    }, [targetUser])

    const handleUserSelect = ({target: {value}}) => {
        setTargetUser(value);
    }
    
    return(
        <>
            {targetUser === ''
                ?<UserList users={users} handler={handleUserSelect}/>
                :<div>hi</div>
            }
        </>
    );
}

export default Chat;
