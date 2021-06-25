import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../components/pages/home/Home';
import LoginPage from '../components/pages/login/Login';
import { useAppSelector } from '../hook';
import { selectUser, UserState } from '../slices/user.slice';
import Register from '../components/pages/register/Register';
import Reimbursements from '../components/pages/view-reimbursements/Reimbursements'
import UserHome from '../components/pages/home/UserHome';
import ServicesPage from '../components/pages/body/services';
import ReimbursementForm from '../components/pages/submit-form/ReimbursementForm';
import FinalGradesPage from '../components/pages/view-reimbursements/FinalGrades';

const AppRoutes: React.FC<unknown> = (props) => {

  const user = useAppSelector<UserState>(selectUser);

  if(!user) {
  return (
    <>
    <Home />
    <br />
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
    </Switch>
    </>
  );
} else {
  return (
    <>
    <UserHome />
    <br />
    <Switch>
      <Route exact path='/home'>
        <UserHome />
      </Route>
      <Route path='/reimbursements'>
        <Reimbursements />
      </Route>
      <Route path='/services'>
        <ServicesPage />
      </Route>
      <Route path='/form'>
        <ReimbursementForm />
      </Route>
      <Route path='/home'>
        <Redirect to='/home' />
      </Route>
      <Route path='/grades'>
        <FinalGradesPage />
      </Route>
    </Switch>
    </>
  )
}
}

export default AppRoutes;