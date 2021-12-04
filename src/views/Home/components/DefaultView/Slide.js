import { Link } from 'react-router-dom';
import styles from './style.module.css';

function Slide({info, slideStyle}) {
    if( info.includes('.png') ){
        return (
            <div className={styles.presentation}>
                <img src={info} alt='Sorry uwu' className={"img-fluid"}/>
            </div>
        ) 
    }
    return (
        <div className={`${styles.presentation} ${slideStyle}`}>
            {info}
        </div>
    )
}

function FinalSlide() {
    return(
        <div className={styles.finalSlide}>
            <div className="d-inline w-100">
                <div className={styles.border}>
                    <div className="mt-3 mb-2">
                        <Link to="/signin" className="d-flex justify-content-center">
                            <button className="btn btn-success w-75">Iniciar sesión</button>
                        </Link>
                    </div>
                    <div className="mt-2 mb-3">
                        <Link to="/signup" className="d-flex justify-content-center">
                            <button className="btn btn-success w-75">Registrarse</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Slide, FinalSlide };
