import { useState } from 'react';
import Message from './Message';
import styles from './style.module.css';

function Chat({ user, messages, sendMsg, handleReturn }) {

    const [msg, setMsg] = useState('');

    const handleInputChange = ({target: {value}}) => {
        setMsg(value);
    }

    const handleSendMsg = () => {
        sendMsg(msg);
        setMsg('');
    }

    const renderMessages = () => {
        return messages.map((element, i) => (
            <Message {...element} key={element.uid+i}/>
        ))
    }

    return(
        <div className="container h-75 d-grid align-items-end">
            <div className="row pb-3">
                <h2>
                    {user}
                </h2>
            </div>
            <div className="row h-100 overflow-auto">
                    <div className="d-flex flex-column-reverse">
                        {renderMessages()}
                    </div>
            </div>
            <div className="row mt-3">
                <div className={`${styles.w85} px-0`}>
                    <input
                        className="h-100 w-100"
                        placeholder="Mensaje"
                        value={msg}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={`${styles.w15} px-0`}>
                    <button className="btn btn-success w-100" onClick={handleSendMsg}>{"►"}</button>
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <button className="btn btn-primary my-1 mx-2 w-25" onClick={handleReturn}>Volver a chats</button>
                <button className="btn btn-primary my-1 mx-2 w-25" onClick={()=>window.location.reload()}>Volver al inicio</button>
            </div>
        </div>
    )
}

export default Chat;
