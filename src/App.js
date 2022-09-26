import './App.css';
import CollegeForm from './College/CollegeForm';
import Login from './Authentication/Login';
import Signup from './Authentication/Sign-Up';
import OTP from './Authentication/OTP';
import Forgot from './Authentication/Forgot';
import Reset from './Authentication/ResetPass';
import RecoverPass from './Authentication/RecoverPass';
import ViewDetail from './College/ViewDetail';
import ViewFDP from './College/ViewFDP';
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './Routes/PrivateRoutes';
import StudentForm from './College/StudentForm';
import ViewStudent from './College/ViewStudent';
import AdminPrivateRoute from './Routes/AdminPrivateRoutes';
import AuthenticatedRoutes from "./Routes/AuthenticatedRoutes";
import Logout from './College/Logout';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={
        <AuthenticatedRoutes>
        <Login />
        </AuthenticatedRoutes>} />
        <Route exact path="/stform" element={
        <AdminPrivateRoute>
        <StudentForm />
        </AdminPrivateRoute>
        } />
        <Route exact path="/stform/:id" element={
        <AdminPrivateRoute>
        <StudentForm />
        </AdminPrivateRoute>} />
        <Route exact path="/viewst" element={
        <AdminPrivateRoute>
        <ViewStudent />
        </AdminPrivateRoute>} />
        <Route exact path="/view" element={
          <PrivateRoute>
            <ViewDetail />
          </PrivateRoute>} />
        <Route exact path="/view/:id" element={<PrivateRoute>
          <ViewDetail />
        </PrivateRoute>} />
        <Route exact path="/form" element={
          <PrivateRoute>
            <CollegeForm />
          </PrivateRoute>} />
        <Route exact path="/form/:id" element={
          <PrivateRoute>
            <CollegeForm />
          </PrivateRoute>} />
        <Route exact path="/signup" element={
        <AuthenticatedRoutes>
        <Signup />
        </AuthenticatedRoutes>} />
        <Route exact path="/forgot" element={
        <AuthenticatedRoutes>
        <Forgot />
        </AuthenticatedRoutes>} />
        <Route exact path="/otp" element={
          <AuthenticatedRoutes>
            <OTP />
          </AuthenticatedRoutes>} />  
        <Route exact path="/reset" element={
          <PrivateRoute>
            <Reset />
          </PrivateRoute>} />
        <Route exact path="/logout" element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>} />
        <Route exact path="/recoverpass" element={
        <PrivateRoute>
        <RecoverPass />
        </PrivateRoute>} />
        <Route exact path="/viewall" element={
          <PrivateRoute>
            <ViewFDP />
          </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
