import Swal from 'sweetalert2';

const basicNotification = (text) => {
    Swal.fire({
        title: text
    })
}

const confirmationAlert = callback => {
    Swal.fire({
        title: '¿Seguro(a)?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    }).then(callback)
}

const passwordRequiredAlert = (confirmPassword, deleteUser) => {
    Swal.fire({
        title: 'Confirme su contraseña',
        input: 'password',
        inputAttributes: { autocapitalize: 'off' },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: confirmPassword,
        allowOutsideClick: () => !Swal.isLoading()
    }).then(deleteUser);
}

export {
    basicNotification,
    confirmationAlert,
    passwordRequiredAlert
};
