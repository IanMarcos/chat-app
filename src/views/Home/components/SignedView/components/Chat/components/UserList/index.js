import { useContext } from 'react';
import { userContext } from '../../../../../../../../context/userSession';
import styles from './style.module.css';
// import UserListItem from "../UserListItem";

function UserList( {users = [], handler} ) {

    const { userName } = useContext(userContext);
    
    const renderUsers = () => {
        //Saca al mismo usuario de la lista de usuarios para chatear
        const usersToRender = users.filter( user => user.name !== userName);

        return usersToRender.map( user => {
            const { _id, name } = user;
            return(
                <div key={_id+name} className="row justify-content-center">
                    <button 
                        key={_id}
                        value={_id}
                        className={styles.btnTrasnparent}
                        onClick={handler}
                    >
                        {name}
                    </button>
                </div>
            )
        })
    }

    return (
        <div className="container">
            <div className="row mb-4">
                <h1 className="text-center">¿Con que usuario deseas chater?</h1>
            </div>
            {renderUsers()}
        </div>
    )
}

export default UserList;
