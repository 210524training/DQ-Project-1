
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Reimbursement from '../../../models/reimbursement';
import User from '../../../models/user';
import { selectUser, UserState } from '../../../slices/user.slice';
import { bencoUpdate, bencoView, deleteReimbursement, getByID, getByUsername, headUpdate, headView, reject, supervisorUpdate, supervisorView } from '../../../remote/reimbursement-backend/reimbursement.api';
import { FormButton } from '../login/LoginElem';
import { ChangeEvent } from 'react';
import { Form, FormInput, FormLabel, TableButtonAccept, TableButtonReject } from './FinalGradeElem';
import { useAppSelector } from '../../../hook';
import PendingButton from './PendingButton';

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const ReimbursementPage: React.FC<unknown> = (props): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const history = useHistory();
  const [id, setID] = useState<string>('');


const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
      }

  // const getArray = async (user: User) => {

  //   let arr: Reimbursement[]
  //   switch(user.role) {
  //     case 'Employee':
  //       arr = await getByUsername(user.username)
  //       setReimbursements(arr)
  //       break;
  //     case 'Supervisor':
  //       arr = await supervisorView();
  //       setReimbursements(arr)
  //       break
  //     case 'Department Head':
  //       arr = await headView();
  //       setReimbursements(arr)
  //       break
  //     case 'Benco':
  //       arr = await bencoView();
  //       setReimbursements(arr)
  //       break
  //     default:
  //       arr = await getByUsername(user.username);
  //       setReimbursements(arr)
  //     }
  // }
  
    useEffect( () => {
      if (user) {
        console.log('inside if user')
      const getArray = async (user: User) => {

        let arr: Reimbursement[]
        switch(user.role) {
          case 'Employee':
            console.log('inside cases')
            arr = await getByUsername(user.username)
            setReimbursements(arr)
            break;
          case 'Supervisor':
            console.log('inside supervisor cases')
            arr = await supervisorView();
            setReimbursements(arr)
            break
          case 'Department Head':
            console.log('inside dep head cases')
            arr = await headView();
            setReimbursements(arr)
            break
          case 'Benco':
            console.log('inside benco cases')
            arr = await bencoView();
            setReimbursements(arr)
            break
          default:
            console.log('inside default cases')
            arr = await getByUsername(user.username);
            setReimbursements(arr)
          }
      }
      getArray(user);
  } 
}, [user]);

  const handleButtonClick = (e: ButtonEvent): void => {
    e.preventDefault();
    if(user) {
    switch(user.role) {
      case 'Supervisor':
        history.push('/grades')
        break
      case 'Benco':
        history.push('/grades')
        break
      case 'Department Head':
        alert('you do not have access to this feature')
        break
      case 'Employee':
        alert('you do not have access to this feature')
        break
  }
  }
}

const handleAccept = async (e: ButtonEvent): Promise<void> => {
    e.preventDefault();
    if(user) {
    const targetClaim = await getByID(id);
    switch(user.role) {
      case 'Supervisor':
        console.log('inside sup switch case')
        console.log(targetClaim);
        supervisorUpdate(targetClaim);
        //calculate update projection amount and set
        break
      case 'Department Head':
        console.log('inside head switch case')
        headUpdate(targetClaim);
        //calculate update projection amount and set
        break
      case 'Benco':
        console.log('inside benco switch case')
        bencoUpdate(targetClaim);
        //calculate update projection amount and set
        break
      case 'Employee':
        alert('you do not have access to this feature')
        break;
      }
}
}

const handleReject = async (e: ButtonEvent): Promise<void> => {
    e.preventDefault();
    if(user) {
    const targetClaim = await getByID(id);
    if (user.role === 'Employee') {
      const result: boolean = await deleteReimbursement(id, user.username);
      (result) ? alert('successfully canceled reimbursement request') : alert('could not cancel');
    } else reject(targetClaim);
    alert('successfully rejected claim');
}
}

//edit amount function for benco

    
  return (
        
      <>
        <h1>Your Reimbursements</h1>
        <PendingButton />
        <FormButton onClick= {handleButtonClick}>View Final Grades</FormButton> 
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Start Date</th>
              <th>Location</th>
              <th>File Date</th>
              <th>Event Type</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Grade Format</th>
              <th>Projected Reimbursement</th>
              <th>Amount Awarded</th>
            </tr>
          </thead>
          {
           reimbursements.map((item, index) => (
              <tr key={index}>
               <td>{item.id}</td>
               <td>{item.username}</td>
               <td>{item.start}</td>
               <td>{item.location}</td>
               <td>{item.file}</td>
               <td>{item.type}</td>
               <td>{item.cost}</td>
               <td>{item.status}</td>
               <td>{item.format}</td>
               <td>{item.projected}</td>
               <td>{item.awarded}</td>
              </tr>
           ))
          }
        </table>
        <Form>
          <FormLabel htmlFor='accept'>Please enter ID</FormLabel>
            <FormInput type='text' required onChange={handleIDChange} />
            <FormButton type='button' onClick= {handleAccept}>Accept</FormButton>
            <FormButton type='button' onClick= {handleReject}>Reject/Delete</FormButton>
        </Form>
      </>
        )
}
export default ReimbursementPage;

