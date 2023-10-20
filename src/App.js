// // import './App.css';
// // import React from 'react';
// // import { useState } from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
// // import LandingPage from './components/LandingPage';
// // import ModuleDetails from './components/ModuleDetails';
// // import Login from './components/Login';
// // import SuperAdmin from './dashboard/SuperAdmin';
// // import Tenant from './dashboard/Tenant';
// // import Customer from './dashboard/Customer';

// // import ProtectedRoute from './components/ProtectedRoute';



// // function App() {

// //   const [user, setUser] = useState({
// //     isAuthenticated: false, // Set to true after successful login
// //     role: null, // Set the user's role after login
// //   });

// //   const handleSuccessfulLogin = (role) => {
// //     // Set the user as authenticated and set their role
// //     console.log("hii", role);
// //     if (role) {
// //       setUser({
// //         isAuthenticated: true,
// //         role: role,
// //       });
// //     }
// //   }
// //   console.log(user);

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/login" element={<Login onSuccessfulLogin={handleSuccessfulLogin} />} />
// //         <Route path="/" element={<LandingPage />} />
// //         <Route path="/module/:moduleId" element={<ModuleDetails />} />
// //         <Route
// //           path="/superadmin"
// //           element={<ProtectedRoute
// //             isAuthenticated={user.isAuthenticated}
// //             role='superadmin'
// //             element={<SuperAdmin />}

// //           />}
// //         />
// //         <Route
// //           path="/tenant"
// //           element={<ProtectedRoute
// //             isAuthenticated={user.isAuthenticated}
// //             role='tenant'
// //             element={<Tenant />}
// //           />}
// //         />

// //         <Route
// //           path="/customer"
// //           element={<ProtectedRoute
// //             isAuthenticated={user.isAuthenticated}
// //             role='customer'
// //             element={<Customer />}
// //           />}
// //         />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ModuleDetails from './components/ModuleDetails';
import Login from './components/Login';
import Cookies from 'js-cookie';
import SuperAdmin from './dashboard/SuperAdmin';
import Tenant from './dashboard/Tenant';
import ModulesPage from './pages/ModulesPage';
import Customer from './dashboard/Customer';
import jwtDecode from "jwt-decode";
import CreateModuleForm from './pages/CreateModuleForm';
import TenantsPage from './pages/TenantsPage';
import CreateTenantForm from './pages/CreateTenantForm';

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    role: null,
  });


  async function decodeJWTToken(token) {
    try {
      // Decode the token (you may need to install a JWT library for this)
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('JWT decoding error:', error);
      return null;
    }
  }

  useEffect(() => {
    // Check if the user has a JWT token in local storage
    //const token = localStorage.getItem('jwtToken');
    const token = Cookies.get('jwtToken');
    if (token) {
      // Token found, the user is authenticated
      const decodedToken = decodeJWTToken(token);
      if (decodedToken) {
        setUser({
          isAuthenticated: true,
          role: decodedToken.role,
        });
      }
    }
  }, []);

  const handleSuccessfulLogin = (role, token) => {
    if (role && token) {
      // Store the user's role and JWT token in local storage
      // localStorage.setItem('jwtToken', token);

      Cookies.set('jwtToken', token, { expires: 7 });
      setUser({
        isAuthenticated: true,
        role: role,
      });
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login onSuccessfulLogin={handleSuccessfulLogin} />} />
      <Route path="/module/:moduleId" element={<ModuleDetails />} />
      <Route
        path="/superadmin"
        element={user.isAuthenticated && user.role === 'superadmin' ? <SuperAdmin /> : <Navigate to="/login" />}
      />
      <Route
        path="/tenant"
        element={user.isAuthenticated && user.role === 'tenant' ? <Tenant /> : <Navigate to="/login" />}
      />
      <Route
        path="/customer"
        element={user.isAuthenticated && user.role === 'customer' ? <Customer /> : <Navigate to="/login" />}
      />
      <Route path="/superadmin/modules" element={<ModulesPage />} />
      <Route
        path="/superadmin/modules/create"
        element={user.isAuthenticated && user.role === 'superadmin' ? <CreateModuleForm /> : <Navigate to="/login" />}
      />

      <Route
        path="/superadmin/tenants/"
        element={user.isAuthenticated && user.role === 'superadmin' ? <TenantsPage /> : <Navigate to="/login" />}
      />

      <Route
        path="/superadmin/tenants/create"
        element={user.isAuthenticated && user.role === 'superadmin' ? <CreateTenantForm /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;























