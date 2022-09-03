import './App.css';
import  CollegeForm  from './College/CollegeForm';
import Login from './Authentication/Login';
import Signup from './Authentication/Sign-Up';
import OTP from './Authentication/OTP';
import Forgot from './Authentication/Forgot';
import Reset from './Authentication/ResetPass';
function App() {
  return (
    <div className="App">
      <Reset />
    </div>
  );
}

export default App;
