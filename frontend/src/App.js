import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './Components/SignupForm';
import LoginForm from './Components/LoginForm';
import Navbar from './Components/Navbar';
import BackgroundImage from './Components/BackgroundImage';
import EmailEditor from './Components/EmailEditor';
import Inbox from './Components/Inbox';
import SentMail from './Components/Sentmail';


const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to="/login-form" />;
}

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="mail-box" element={<ProtectedRoute element={<BackgroundImage />} />} />
      <Route path="mail-box-client" element={<ProtectedRoute element={<EmailEditor />} />} />
      <Route path="mail-inbox" element={<ProtectedRoute element={<Inbox />} />} />
      <Route path="mail-sent" element={<ProtectedRoute element={<SentMail />} />} />
    </Routes>
  </>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login-form" element={<LoginForm />} />
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </Router>
  );
};
