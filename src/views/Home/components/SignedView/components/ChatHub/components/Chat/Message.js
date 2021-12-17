import styles from './style.module.css';

function Message( {name, message} ) {
    return(
        <div className={styles.msgBubble}>
            <p className='my-1'>
                <span className={styles.sender}>
                    {name + ':  '}
                </span>
                {message}
            </p>
        </div>
    )
}

export default Message;
