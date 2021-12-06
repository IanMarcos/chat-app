function FormInput( {name, type, placeholder, value, handler} ) {
    return (
        <div className="row my-2">
            <label className="d-flex justify-content-center">
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handler}
                />
            </label>
        </div>
    )
}

export default FormInput;
