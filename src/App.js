import './App.css';
import  CollegeForm  from './College/CollegeForm';
import Login from './Authentication/Login';
import Signup from './Authentication/Sign-Up';
import OTP from './Authentication/OTP';
import Forgot from './Authentication/Forgot';
import Reset from './Authentication/ResetPass';
import RecoverPass from './Authentication/RecoverPass';
import ViewDetail from './College/ViewDetail';
function App() {
  return (
    <div className="App">
      {/* <CollegeForm /> */}
      <ViewDetail />
    </div>
  );
}

export default App;
