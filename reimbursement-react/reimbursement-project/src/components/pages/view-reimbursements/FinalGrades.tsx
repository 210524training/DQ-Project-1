import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../../hook';
import Reimbursement from '../../../models/reimbursement';
import { accept, deleteReimbursement, getByID, getByRole, putAward, reject, viewFinalSubmission } from '../../../remote/reimbursement-backend/reimbursement.api';
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

    async function handleReimbursementChange() {
        if(user) {
            let table: Reimbursement[];
            table = await viewFinalSubmission(user.role);
            setReimbursements(table);
        } else alert('something went wrong'); 
        history.goBack();
    }

    const handleAccept = async (e: ButtonEvent): Promise<void> => {
        e.preventDefault();
        // const target = e.target;
        // const parent = target.parentElement
        // const getId = parent.firstChild.innerHTML
    
        const targetClaim = await getByID(id)
    
        if(user) {
            if (user.role === 'Employee') {
                alert('you do not have access to this feature')
            } else {
                accept(targetClaim);
                putAward(targetClaim);
            }
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

    useEffect(() => {
        handleReimbursementChange()}
        );

    

    return (
        <>
        <table>
         <tr>{Object.keys(reimbursements[0]).map((key) => (
             <th>{key}</th>
         ))}
            <th>Reject</th>
            <th>Accept</th>
         </tr>
         {reimbursements.map((item, index) => (
             <tr>{Object.values(item).map((val, index) => (
                 <td key={index}>{val}</td>
         ))}
         </tr>
        ))}
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


