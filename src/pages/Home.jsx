import { useContext } from 'react'
import AuthContext from "../context/AuthProvider";
import Navbar from '../components/Navbar';
import universidade1 from "../assets/universidade1.jpg";

const navigation = [
  { name: 'Inscrições', href: '/home/inscriptions', current: false },
  { name: 'Trabalho Científico', href: '/home/cientific_work', current: false },
  { name: 'Tarifas', href: '/home/pricing', current: false },
  { name: 'Contatos', href: '/home/contacts', current: false },
]

export default function Home() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Navbar navigation={navigation} />
      
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Bemvindo {auth.user.name + " " + auth.user.last_name}</h2>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-2 sm:px-4 lg:px-4">
          { /* Your content */ }
          <div className="items-center align-top">
            <img
              src={universidade1}
              alt=""
              className="h-2/3 w-2/3 object-center object-fill rounded-full"
            />
          </div>
        </div>
      </main>
    </>
  )
}
