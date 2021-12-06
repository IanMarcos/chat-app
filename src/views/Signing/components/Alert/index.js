
function Alert({type, msg}) {

    return(
        <div className={`alert alert-${type}`} role="alert">
            {msg}
        </div>
    )
}

export default Alert;
