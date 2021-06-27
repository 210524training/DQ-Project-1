import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../../hook';
import Reimbursement from '../../../models/reimbursement';
import User from '../../../models/user';
import { accept, deleteReimbursement, getByID, getUser, putAward, reject, viewFinalGrade, viewPresentation } from '../../../remote/reimbursement-backend/reimbursement.api';
import { selectUser, UserState } from '../../../slices/user.slice';
import { FormButton } from '../login/LoginElem';
import { Form, FormInput, FormLabel, TableButtonAccept, TableButtonReject } from './FinalGradeElem';

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const FinalGradesPage = () => {

    const history = useHistory();
    const user = useAppSelector<UserState>(selectUser);

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
    const [id, setID] = useState<string>('');

    const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
      }

      const setData = async (user: User) => {

        let arr: Reimbursement[]
        switch(user.role) {
            case 'Supervisor':
                arr = await viewPresentation();
                setReimbursements(arr);
                break;
            case 'Department Head':
                history.goBack()
                break;
            case 'Benco':
                arr = await viewFinalGrade();
                setReimbursements(arr);
                break;
            case 'Employee':
                history.goBack()
                break;
        }
      }

      useEffect(() => {
          if(user) {
            const setData = async (user: User) => {

                let arr: Reimbursement[]
                switch(user.role) {
                    case 'Supervisor':
                        arr = await viewPresentation();
                        setReimbursements(arr);
                        break;
                    case 'Department Head':
                        alert('you shouldnt be in here')
                        break;
                    case 'Benco':
                        arr = await viewFinalGrade();
                        setReimbursements(arr);
                        break;
                    case 'Employee':
                        alert('you shouldnt be in here')
                        break;
                }
              }
              setData(user)
          }
      }, [user]);


    const handleAccept = async (e: ButtonEvent): Promise<void> => {
        e.preventDefault();
        if(user) {
        const targetClaim = await getByID(id)
        console.log(targetClaim);
        //update amount awarded function
        accept(targetClaim);
        const found = await getUser(targetClaim.username)
        found.awarded = targetClaim.awarded
        console.log(found)
        putAward(found);
            }
        }
    
    const handleReject = async (e: ButtonEvent): Promise<void> => {
        e.preventDefault();
        // const target = e.target;
        // const parent = target.parentElement
        // const getId = parent.firstChild.innerHTML
    
        const targetClaim = await getByID(id)
        if(user) {
            (user.role === 'Employee') ? deleteReimbursement(targetClaim.id, targetClaim.username) : reject(targetClaim);
        }
    }

    

    return (
        
        <> 
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
                <FormButton type='button' onClick= {handleReject}>Reject</FormButton>
        </Form>
        </>
        )
}

export default FinalGradesPage;


