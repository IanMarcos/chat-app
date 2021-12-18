import { useState } from 'react';
import Message from './Message';

function Chat({ user, messages, room, sendMsg }) {

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
            <div className={`row h-100 overflow-auto`}>
                    <div className="d-flex flex-column-reverse">
                        {renderMessages()}
                    </div>
            </div>
            <div className="row mt-3 mb-5">
                <div className="col px-0">
                    <input
                        className="h-100 w-100"
                        placeholder="Mensaje"
                        value={msg}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-3 px-0">
                    <button className="btn btn-success w-100" onClick={handleSendMsg}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;
