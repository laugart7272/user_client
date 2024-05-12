import { Link} from "react-router-dom";
import axios from "../api/axios";
import { useEffect } from "react";

const VEREMAIL_URL = "/verify_email";

export default function VerifiyEmail() {
  const getVerifyEmail = async () => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);

    // console.log(params.get('secret_code'));

    const fullparams = "?email_id=" + params.get('email_id') + "&secret_code=" + params.get('secret_code')

    const response = await axios.get(VEREMAIL_URL + fullparams);
    // navigate('/');
  }

  useEffect( () => {
    getVerifyEmail();
  }, [])

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Email Verificado</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, you do not have access to the requested page.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/login"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back to Login
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
