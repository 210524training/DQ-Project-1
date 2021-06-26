import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
// import Navbar from './components/navbar/Navbar'
import {BrowserRouter as Router } from 'react-router-dom'
import store from './store'
// import UserHome from './components/pages/home/UserHome';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AppRoutes from './router/AppRoutes';
import AppRoutes from './router/AppRoutes';
import TestPage from './components/pages/view-reimbursements/test';


const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <TestPage />
      </Router>
    </Provider>
  );
}

export default App;