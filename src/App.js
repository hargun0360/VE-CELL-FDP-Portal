import './App.css';
import  CollegeForm  from './College/CollegeForm';
import Login from './Authentication/Login';
import Signup from './Authentication/Sign-Up';
import OTP from './Authentication/OTP';
import Forgot from './Authentication/Forgot';
import Reset from './Authentication/ResetPass';
import RecoverPass from './Authentication/RecoverPass';
import ViewDetail from './College/ViewDetail';
import ViewFDP from './College/ViewFDP';
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
       <Routes>
       <Route exact path="/" element={<Login />} />
       <Route exact path="/view" element={<ViewDetail />} />
       <Route exact path="/form" element={<CollegeForm />} />
       <Route exact path="/signup" element={<Signup />} />
       <Route exact path="/forgot" element={<Forgot />} />
       <Route exact path="/otp" element={<OTP />} />
       <Route exact path="/reset" element={<Reset />} />
       <Route exact path="/recoverpass" element={<RecoverPass />} />
       <Route exact path="/viewall" element={<ViewFDP />} />
       </Routes>
    </div>
  );
}

export default App;
