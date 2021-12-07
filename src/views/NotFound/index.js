import { Link } from 'react-router-dom';
import styles from './style.module.css';

function NotFound() {
    return(
        <div className="center">
            <div className="d-inline">
                <p className={`text-center mb-0 pb-0 ${styles.big}`}>404</p>
                <p className={`text-center my-1`}>Llegaste a una página que no existe :-)</p>
                <p className={`text-center mt-0 ${styles.small}`}><Link to="/">Volver</Link></p>
            </div>
        </div>
    )
}

export default NotFound;
