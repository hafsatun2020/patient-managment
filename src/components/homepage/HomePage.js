
import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; //  You can keep the shared styles here
import LoginPage from '../LoginPage';
import { PatientSearch } from '../PatientSearch'; // Import the components
import { PatientAdmission } from '../PatientAdmission';
import { TreatmentPlan } from '../RenderTreatmentPlan';
import PatientOverview from './PatientOverview';
import PatientList from './PatientList';
import NewPatientSection from './NewPatientSection';
import PatientDetailsSection from './PatientDetailsSection';
import mockPatientData from '../mockPatientData';
import { DrugAdministration, PatientStatus, AdminDrugStatus } from '../drugAdmin'; // Import the components
import AdminDashboard from './admindashboard';
import JuniorDoctorDashboard from "./juniorDoc";
// ===============================
// Main App Component
// ===============================
const HomePage = () => {
   const [userRole, setUserRole] = useState(null);
   const [patients, setPatients] = useState(Object.values(mockPatientData));
   const navigate = useNavigate();

   useEffect(() => {
       // ... (localStorage logic - keep as is)
       try {
           if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
               const storedRole = localStorage.getItem('userRole');
               if (storedRole) {
                   setUserRole(storedRole);
               } else {
                   // Fallback: no role found
                   setUserRole(null);
               }
           } else {
               console.warn('localStorage is not available');
           }
       } catch (error) {
           console.error('Error accessing localStorage:', error);
           setUserRole(null); // fallback to login if error occurs
       }
   }, []);

   const handleLogin = (role, data) => {
       // ... (handleLogin logic - keep as is)
       setUserRole(role);
       localStorage.setItem('userRole', role);
       if (role === 'admin' && data?.admittedPatients) {
           setPatients(data.admittedPatients);
       }
       navigate('/');
   };

   const handleLogout = () => {
       // ... (handleLogout logic - keep as is)
       setUserRole(null);
       localStorage.removeItem('userRole');
       navigate('/login');
   };



   if (!userRole) return <LoginPage onLogin={handleLogin} />;

   return (
       <div className="home-container">
           <div className="header">
               <h1 className="header-title">Welcome, {userRole}!</h1>
               <button onClick={handleLogout} className="logout-button">
                   <LogOut className="logout-icon" /> Logout
               </button>
           </div>

           <div className="page-content">
               {userRole === 'admin' ? (
                   <AdminDashboard patients={patients} setPatients = {setPatients}/>
               ) : (
                   <JuniorDoctorDashboard patients={patients} setPatients={setPatients}/>
               )}
       {userRole === 'admin' && <AdminDrugStatus/>}
           </div>
       </div>
   );
};

export default HomePage;
