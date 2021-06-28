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
import user from '../models/user';
import PendingPage from '../components/pages/view-reimbursements/PendingPage';
import MessagesPage from '../components/messaging/ViewMessage';



const AppRoutes: React.FC<unknown> = (props) => {

  const user = useAppSelector<UserState>(selectUser);
      if(!user) {
        return ( 
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
        )
      } else {
        return(
    

    <Switch>
      <Route exact path='/'>
        <UserHome />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
    <Route exact path='/user'>
    <UserHome />
    </Route>
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
      <Route path='/grades'>
        <FinalGradesPage />
      </Route>
      <Route path='/pending'>
        <PendingPage />
      </Route>
      <Route path='/messages'>
        <MessagesPage />
      </Route>
    </Switch>
  )
      }
}

export default AppRoutes;