import styles from './style.module.css';

function Slide({info, slideStyle}) {
    return (
        <div className={`${styles.presentation} ${slideStyle}`}>
            {info}
        </div>
    )
}

export default Slide;
