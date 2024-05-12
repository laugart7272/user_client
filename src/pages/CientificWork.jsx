import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Navbar from "../components/Navbar";
import CientificWorkTable from "../components/CientificWorkTable";


const navigation = [
  { name: "Inscrições", href: "/home/inscriptions", current: false },
  { name: "Trabalho Científico", href: "/home/cientific_work", current: true },
  { name: 'Tarifas', href: '/home/pricing', current: false },
  { name: 'Contatos', href: '/home/contacts', current: false },
];

export default function CientificWork() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Navbar navigation={navigation} />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">
            Bemvindo {auth.user.name + " " + auth.user.last_name}
          </h2>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          <CientificWorkTable />
        </div>
      </main>
    </>
  );
}
