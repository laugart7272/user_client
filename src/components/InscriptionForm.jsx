import { useState, useEffect, useRef } from 'react'
import axios from "../api/axios";
import { useContext } from 'react'
import AuthContext from "../context/AuthProvider";
import { Toaster, toast } from "sonner";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const REGISTERCW_URL = "/cientific_work/register";

export default function InscriptionForm() {
  const { auth } = useContext(AuthContext);
  const titleRef = useRef();
  const [agreed, setAgreed] = useState(false)

  const initialValues = { title: "", resume: "", presentation_type: "Presencial", exposition_type: "Apresentaçâo" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formValues);
    // console.log(auth);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
    try {
      const response = await axios.post(
        REGISTERCW_URL,
        JSON.stringify({ 
          title: formValues.title,
          author_id: auth.user.id,
          resume: formValues.resume,
          presentation_type: formValues.presentation_type,
          exposition_type: formValues.exposition_type
         }),
        {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${auth?.accessToken}` },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      // console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      toast.success("Trabalho Cientifico ja creado e inscrito");
      //clear state and controlled inputs
      setFormValues(initialValues);      
    } catch (error) {
      console.log(error?.message);
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if (error.response?.status === 409) {
        setErrMsg("Titulo existente!");
        toast.error(errMsg);
      } else {
        setErrMsg("Registration Failed");
      }
    }
    
  };

  useEffect(() => {
    // console.log(formErrors);
    if (!isSubmit) {
      titleRef.current.focus();
    }
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
      setValid(true)
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "title is required!";
    }

    if (!values.resume) {
      errors.resume = "resume is required!";
    } 

    return errors;
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-4 lg:px-2">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Faça a sua Inscrição
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Cadastre o seu Trabalho Científico para análise da Comissão Científica.
        </p>
      </div>
      <Toaster richColors position="bottom-right" />
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              <span className="text-red-500">*</span> Titulo do Trabalho
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="title"
                id="title"
                ref={titleRef}
                value={formValues.title}
                onChange={handleChange}
                autoComplete="off"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="text-red-500">{formErrors.title}</p>
          </div>
          <div>
            <label
              htmlFor="presentation_type"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Tipo de Apresentação
            </label>
            <div className="mt-2.5">
              <select
                id="presentation_type"
                name="presentation_type"
                value={formValues.presentation_type}
                onChange={handleChange}
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="Presencial">Presencial</option>
                <option value="Remota">Remota</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Tipo de Exposição
            </label>
            <div className="mt-2.5">
              <select
                id="exposition_type"
                name="exposition_type"
                value={formValues.exposition_type}
                onChange={handleChange}
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="Apresentaçâo">Apresentaçâo</option>
                <option value="Poster">Poster</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="resume"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              <span className="text-red-500">*</span> Resumo do Trabalho
            </label>
            <div className="mt-2.5">
              <textarea
                name="resume"
                id="resume"
                value={formValues.resume}
                onChange={handleChange}
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="text-red-500">{formErrors.resume}</p>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Registar o Trabalho
          </button>
        </div>
      </form>
    </div>
  );
}
