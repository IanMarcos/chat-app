import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "context/userSession";
import { getCookie } from "helpers/cookies";
import { getApiUrl } from "helpers/urlGetter";

import Alert from "views/Signing/components/Alert";
import FormBtn from "views/Signing/components/FormBtn";
import FormInput from "views/Signing/components/FormInput";
import LinkText from "views/Signing/components/LinkText";

function SignIn() {
  //Hooks
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ active: false, type: "", msg: "" });
  const { isSigned, signIn } = useContext(userContext);
  const navigate = useNavigate();

  /* eslint-disable */
  useEffect(() => {
    //Si al cargar el componente ya hay sesión iniciada, redirige al home
    if (isSigned() || getCookie("cvToken")) navigate("/");
  }, []);
  /* eslint-enable */

  //Event Handlers
  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //Se busca el input del password en el event
    const input = Object.values(e.target).find(
      (el) => el.attributes?.name?.nodeValue === "password"
    );
    const password = input.value;

    //Verificación de campos diligenciados
    if (email.length === 0 || password.length === 0) {
      setAlert({
        active: true,
        type: "warning",
        msg: "Ambos campos son obligatorios",
      });
      setTimeout(() => setAlert({ ...alert, active: false }), 3000);
      return null;
    }

    //Llamado a la API
    try {
      const response = await fetch(getApiUrl("auth/signin"), {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const {
        results: { err, cvToken, user },
      } = await response.json();

      //Verificación de email y contraseña correctos
      if (err) {
        setAlert({ active: true, type: "danger", msg: err });
        setTimeout(() => setAlert({ ...alert, active: false }), 3000);
        return null;
      }
      //Se actualizon los valores del context
      signIn(user.name, cvToken);
      //Redirección a home
      navigate("/");
    } catch (error) {
      setAlert({
        active: true,
        type: "danger",
        msg: "Error en la conexión al servidor",
      });
      //Tras tres segundo se baja la alerta, y se redirige al home
      setTimeout(() => {
        setAlert({ ...alert, active: false });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container center">
      <form onSubmit={handleOnSubmit}>
        <div className="col">
          <FormInput
            name="email"
            type="email"
            placeholder="Correo*"
            value={email}
            handler={handleEmail}
          />
          <FormInput
            name="password"
            placeholder="Contraseña*"
            type="password"
          />
          <FormBtn
            text={
              isLoading ? (
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Iniciar sesión"
              )
            }
            isDisabled={isLoading}
          />
          <LinkText
            text={"¿No tienes cuenta?"}
            hypertext={"Regístrate"}
            path={"/signup"}
          />
          {alert.active ? (
            <Alert {...{ type: alert.type, msg: alert.msg }} />
          ) : undefined}
        </div>
      </form>
    </div>
  );
}

export default SignIn;
