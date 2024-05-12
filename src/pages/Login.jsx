import { Link, useNavigate, useLocation } from "react-router-dom";
import logo_ips from "../assets/logo_ips.jpg";
import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';

const LOGIN_URL = process.env.GO_API_URL + 'login';

export default function Login() {
  const { setAuth } = useAuth();
  const emailRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    // const LOGINURL = process.env.GO_API_URL + 'login';
    // console.log(LOGINURL);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: formValues.email,
          password: formValues.password
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data?.user));
      // console.log(JSON.stringify(response?.data?.accesss_token));
      const email = formValues.email;
      const password = formValues.password;
      const accessToken = (response.data.accesss_token);
      const user = response?.data?.user
      let role = user.role; 

      if (user.user_type === "Participante") {
        role = "Participante"
      }
      
      // console.log(role, accessToken);
      setAuth({ user, email, password, role, accessToken });
      setFormValues(initialValues);
      setSuccess(true);
      navigate(from, { replace: true });
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response - '+err);
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Email or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        // errRef.current.focus();
        console.log(errMsg, err);
    }
  };

  useEffect(() => {
    // console.log(formErrors);
    if (!isSubmit) {
      emailRef.current.focus();
    }

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      setValid(true);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "password is required!";
    } else if (values.password.length < 6) {
      errors.password = "Passwor must be more than 6 characters!";
    }

    return errors;
  };

  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
              <img
                className="mx-auto h-20 w-auto rounded-full"
                src={logo_ips}
                alt="Instituto Politécnico de Saurimo"
              />
            </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Faça login na sua conta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <p className="text-red-500">{errMsg}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Endereço Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    ref={emailRef}
                    value={formValues.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <p className="text-red-500">{formErrors.email}</p>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Senha
                  </label>
                  <div className="text-sm">
                    <Link
                      to="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <p className="text-red-500">{formErrors.password}</p>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Conecte-se
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Você não está inscrito no evento?{" "}
              <Link
                to="/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Registo
              </Link>
            </p>
          </div>
        </div>
      
    </>
  );
}
