// import React from 'react';
// import { Redirect, Route, Switch } from 'react-router-dom';
// import Home from '../components/pages/home/Home';
// import LoginPage from '../components/pages/login/Login';
// import { useAppSelector } from '../hook';
// import { selectUser, UserState } from '../slices/user.slice';
// import Register from '../components/pages/register/Register';
// import SubmitForm from '../components/pages/submit-form/SubmitForm'
// import Reimbursements from '../components/pages/view-reimbursements/Reimbursements'
// import UserHome from '../components/pages/home/UserHome';

// const AppRoutes: React.FC<unknown> = (props) => {

//   const user = useAppSelector<UserState>(selectUser);

//   if(!user) {
//   return (
//     <>
//     <Home />
//     <br />
//     <Switch>
//       <Route exact path='/'>
//         <Home />
//       </Route>
//       <Route path='/login'>
//         <LoginPage />
//       </Route>
//       <Route path='/register'>
//         <Register />
//       </Route>
//       <Route path='/about'>
//         <About />
//       </Route>
//     </Switch>
//     </>
//   );
// } else {
//   return (
//     <>
//     <UserHome />
//     <br />
//     <Switch>
//       <Route exact path='/'>
//         <UserHome />
//       </Route>
//       <Route path='/reimbursements'>
//         <Reimbursements />
//       </Route>
//       <Route path='/form'>
//         <SubmitForm />
//       </Route>
//       <Route path='/'>
//         <Redirect to='/' />
//       </Route>
//     </Switch>
//     </>
//   )
// }

// export default AppRoutes;










// import React from 'react';
// import { Redirect, Route, Switch } from 'react-router-dom';
// import Home from '../components/pages/home/Home'
// import Login from '../components/pages/login/Login';
// import Navbar from '../components/navbar/Navbar';
// import About from '../components/pages/about/About'
// import UserNav from '../components/navbar/userNav';


// const Routes: React.FC<unknown> = (props) => {

//   const user = useAppSelector<UserState>(selectUser);

//   if (!user) {
//     return (
//       <>
//         <Home />
//         <br />
//         <Switch>
//           <Route exact path='/login'>
//             <Login />
//           </Route>
//           <Route exact path='/register'>
//             <Register />
//           </Route>
//           <Route exact path='/about'>
//             <About />
//           </Route>
//           <Route path='/'>
//             <Redirect to='/login' />
//           </Route>
//         </Switch>
//       </>
//     );
//     } else {
//         return (
//             <>
//                 <UserHome />
//                 <Switch>
//                  <Route exact path='/home/:user'>
//                    { //add user homepage 
//     }
//                  </Route>
//                  <Route exact path='/claims/user'>
//                     <ClaimsView user={user} />
//                  </Route>
//                  <Route path='/'>
//                      <Redirect to='/home' />
//                  </Route>
//              </Switch>
//             </>
//         )
//     }
// }

export {}