import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import logo_ips from "../assets/logo_ips.jpg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const REGISTER_URL = "/register";

export default function Register() {
  const userRef = useRef();

  const [agreed, setAgreed] = useState(false);
  const initialValues = { email: "", password: "", name: "", last_name: "", phone: "", verify_password: "", user_type: "Estudante" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isParticipant, setIsParticipant] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ 
          name: formValues.name,
          last_name: formValues.last_name,
          email: formValues.email,
          phone: formValues.phone,
          password: formValues.password,
          user_type: formValues.user_type
         }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      // console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      if (formValues.user_type === "Participante") {
        setIsParticipant(true);
      }
      //clear state and controlled inputs
      setFormValues(initialValues);
    } catch (error) {
      console.log(error?.response.data.message);
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Utilizador existente!");
      } else {
        setErrMsg("Registration Failed");
      }
    }
    
  };

  useEffect(() => {
    // console.log(formErrors);
    if (!isSubmit) {
      userRef.current.focus();
    }
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      setValid(true)
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const user_regex = /^[a-zA-Z]/i;
    const phone_regex = /^[0-9]/i;

    if (!values.name) {
      errors.name = "nome is required!";
    } else if (!user_regex.test(values.name)) {
      errors.name = "This is not a valid nome format!";
    }

    if (!values.last_name) {
      errors.last_name = "sobrenome is required!";
    } else if (!user_regex.test(values.last_name)) {
      errors.last_name = "This is not a valid sobrenome format!";
    }

    if (!values.phone) {
      errors.phone = "telefone is required!";
    } else if (!phone_regex.test(values.phone)) {
      errors.phone = "This is not a valid phone format!";
    }

    if (!values.email) {
      errors.email = "email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "password is required!";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters!";
    }

    if (!values.verify_password) {
      errors.verify_password = "password is required!";
    } else if (values.verify_password != values.password) {
      errors.verify_password = "Must match the Password input field!";
    }

    return errors;
  };

  return (
    <div className="isolate bg-white px-4 py-6 sm:py-2 lg:px-8">
      <Link to="/">
        <img
          src={logo_ips}
          alt=""
          className="h-20 w-20 object-cover object-center"
        />
      </Link>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Registo
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Participe no evento e envolva-se no nosso ambiente científico.
        </p>
        {!success ? <p className="text-red-500">{errMsg}</p> : ""}
        { success && isParticipant ? (
          <>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Realice Pagamento do Multicaixa:
          </p>
            <h2 className="mt-4 textLg font-medium text-gray-800 ">IBAN</h2>
            <p className="mt-2 text-gray-500 ">Empresa AN. Lda</p>
            <p className="mt-2 text-blue-500 ">AO06-0044-0000-5959-1967-1018-5</p>
          </>
        ) : (
          <div></div>
        )}
      </div>

      <div>
        { (success && !isParticipant) ? (
          <div className="mt-4 text-lg leading-8 text-gray-600 text-center">
            Você já tem uma conta!{" "}
            <Link className="text-blue-500" to="/login">
              Conecte-se
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={ isParticipant ? "hidden" : "mx-auto mt-2 max-w-xl sm:mt-2"}
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Nome
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    ref={userRef}
                    value={formValues.name}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-red-500">{formErrors.name}</p>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Sobrenome
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={formValues.last_name}
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-red-500">{formErrors.last_name}</p>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formValues.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-red-500">{formErrors.email}</p>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Número de Telefone
                </label>
                <div className="relative mt-2.5">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      País
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>AO</option>
                      <option>CU</option>
                      <option>EU</option>
                    </select>
                    <ChevronDownIcon
                      className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-red-500">{formErrors.phone}</p>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="user_type"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Tipo de Participante
                </label>
                <div className="mt-2">
                  <select
                    id="user_type"
                    name="user_type"
                    value={formValues.user_type}
                    onChange={handleChange}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="Estudante">Estudante</option>
                    <option value="Docente">Docente</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Instituições Estatais">Instituições Estatais</option>
                    <option value="Participante">Participante</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Senha
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formValues.password}
                    onChange={handleChange}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-red-500">{formErrors.password}</p>
              </div>

              <div>
                <label
                  htmlFor="verify_password"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Verificar Senha
                </label>
                <div className="mt-2.5">
                  <input
                    type="password"
                    name="verify_password"
                    id="verify-password"
                    value={formValues.verify_password}
                    onChange={handleChange}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="text-red-500">{formErrors.verify_password}</p>
              </div>

              <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? "bg-indigo-600" : "bg-gray-200",
                      "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    )}
                  >
                    <span className="sr-only">Concorde com as políticas</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        agreed ? "translate-x-3.5" : "translate-x-0",
                        "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </div>

                <Switch.Label className="text-sm leading-6 text-gray-600">
                  Ao selecionar esta opção, você concorda com nossa{" "}
                  <Link href="#" className="font-semibold text-indigo-600">
                    política de&nbsp;privacidade.
                  </Link>
                  .
                </Switch.Label>
              </Switch.Group>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Salvar Registo
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
