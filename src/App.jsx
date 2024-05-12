import { Routes } from 'react-router-dom';
import Wellcome from './pages/Wellcome';
import { Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import PricingContainer from './components/pricing-component/pricing-component-container';
import Home from './pages/Home';
import RequireAuth from './components/RequireAuth';
import Missing from './pages/Missing';
import Pricing from './pages/Pricing';
import Inscriptions from './pages/Inscriptions';
import CientificWork from './pages/CientificWork';
import Contacts from './pages/Contacts';
import UserProfileForm from './pages/UserProfileForm';
import CientificWorkEditPage from './pages/CientificWordEditPage';
import Unauthorized from './pages/Unauthorized';
import VerifiyEmail from './pages/VerifyEmail';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Wellcome />} />
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<PricingContainer />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/verify_email" element={<VerifiyEmail/>} />

        {/* we want to protect these routes */}
        <Route
          element={<RequireAuth allowedRoles={["user", "admin", "reviewer"]} />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/home/pricing" element={<Pricing />} />
          <Route path="/home/inscriptions" element={<Inscriptions />} />
          <Route path="/home/cientific_work" element={<CientificWork/>} />
          <Route path="/home/cientific_work/edit/:id" element={<CientificWorkEditPage />} />
          <Route path="/home/contacts" element={<Contacts />} />
          <Route path="/home/user_profile" element={<UserProfileForm />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App
