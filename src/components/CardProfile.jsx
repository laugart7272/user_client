import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import user_male from "../assets/user_male.png";


const CardProfile = ({ auth_user }) => {
    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      const getUser = async () => {
        // console.log(auth_user);
        try {
          const response = await axiosPrivate.get('/user/'+auth_user.id, {
            // signal: controller.signal
          });
          console.log(response.data);
          isMounted && setUser(response.data.user);
          // console.log(user.user.name);
        } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
        }
      }

      getUser();

      return () => {
          isMounted = false;
          controller.abort();
      }
    }, [])

  return (
    <div className="flex items-center h-1/2 w-full justify-center">

    <div className="max-w-xs">
        <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
                <img className="w-10 h-10 rounded-full mx-auto" src={user_male} alt="John Doe"/>
            </div>
            <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user?.name + " " + user?.last_name}</h3>
                <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>{user?.user_type}</p>
                </div>
                <table className="text-xs my-3">
                    <tbody><tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Categoria</td>
                        <td className="px-2 py-2">{user?.role}</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Telefone</td>
                        <td className="px-2 py-2">{user?.phone}</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                        <td className="px-2 py-2">{user?.email}</td>
                    </tr>
                </tbody></table>

                <div className="text-center my-3">
                    <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                </div>

            </div>
        </div>
    </div>

    </div>

  )
}

export default CardProfile