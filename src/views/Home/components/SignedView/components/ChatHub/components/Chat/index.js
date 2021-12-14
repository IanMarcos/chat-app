import { useState } from 'react';

function Chat(params) {

    const [msg, setMsg] = useState('');

    const handleInputChange = ({target: {value}}) => {
        setMsg(value);
    }

    return(
        <div className="container h-75 d-grid align-items-end">
            <div className="row">
                Mensajes
            </div>
            <div className="row">
                <div className="col px-0">
                    <input
                        className="h-100 w-100"
                        placeholder="Mensaje"
                        value={msg}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-3 px-0">
                    <button className="btn btn-success w-100">Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;
