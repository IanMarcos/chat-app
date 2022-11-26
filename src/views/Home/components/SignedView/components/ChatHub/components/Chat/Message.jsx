import styles from './style.module.css';

function Message( {name, message} ) {
    return(
        <div className={`my-1 px-1 py-1 h-100 ${styles.msgBubble}`}>
            <span className={styles.sender}>
                    {name + ':  '}
            </span>
            {message}
        </div>
    )
}

export default Message;
