import { useContext } from "react";
import { userContext } from "context/userSession";
import styles from "./style.module.css";

function UserList({ users = [], handleUserSelect, handleExit }) {
  const { userName } = useContext(userContext);

  const renderUsers = () => {
    //Saca al mismo usuario de la lista de usuarios para chatear
    const usersToRender = users.filter((user) => user.name !== userName);

    return usersToRender.map((user) => {
      const { _id, name } = user;
      return (
        <div key={_id + name} className="row justify-content-center">
          <button
            key={_id}
            value={_id}
            className={styles.btnTrasnparent}
            onClick={handleUserSelect}
          >
            {name}
          </button>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <h1 className="text-center">¿Con que usuario deseas chater?</h1>
      </div>

      {renderUsers()}

      <div className="d-flex justify-content-center">
        <button className="btn btn-secondary mt-4 w-25" onClick={handleExit}>
          Volver
        </button>
      </div>
    </div>
  );
}

export default UserList;
