import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
// import Navbar from './components/navbar/Navbar'
import {BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import Home from './components/pages/home/Home';
// import UserHome from './components/pages/home/UserHome';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AppRoutes from './router/AppRoutes';
import Register from './components/pages/register/Register';
import LoginPage from './components/pages/login/Login';
import ReimbursementForm from './components/pages/submit-form/ReimbursementForm';

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
       <ReimbursementForm />
      </Router>
    </Provider>
  );
}

export default App;