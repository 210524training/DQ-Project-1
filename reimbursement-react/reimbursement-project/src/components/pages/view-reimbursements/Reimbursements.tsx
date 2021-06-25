import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../../hook';
import Reimbursement from '../../../models/reimbursement';
import { deleteReimbursement, getByID, getByRole, reject, updateByRole } from '../../../remote/reimbursement-backend/reimbursement.api';
import { selectUser, UserState } from '../../../slices/user.slice';
import { FormButton } from '../login/LoginElem';
import { Form, FormInput, FormLabel, TableButtonAccept, TableButtonReject } from './FinalGradeElem';

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const ReimbursementPage = () => {

    const history = useHistory();
    const user = useAppSelector<UserState>(selectUser);
    const [id, setID] = useState<string>('');
    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

    const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
      }

    async function handleReimbursementChange() {
        if(user) {
            let table: Reimbursement[];
            table = await getByRole(user.role, user.username);
            setReimbursements(table);
        } else history.push('/');
    }

    const handleButtonClick = (e: ButtonEvent): void => {
        e.preventDefault();
        if(user) {
           ( user.role === 'Employee') ? alert('you do not have access to this feature') : history.push('/grades')
    }
        alert('something went wrong')
}



const handleAccept = async (e: ButtonEvent): Promise<void> => {
    e.preventDefault();
    // const target = e.target;
    // const parent = target.parentElement
    // const getId = parent.firstChild.innerHTML

    const targetClaim = await getByID(id)

    if(user) {
        (user.role === 'Employee') ? alert('cannot accept offer') : updateByRole(targetClaim, user.role)
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
        <FormButton onClick= {handleButtonClick}>View Final Grades</FormButton> 
        <table>
         <tr>{Object.keys(reimbursements[0]).map((key) => (
             <th>{key}</th>
         ))}
            <th>Reject/Cancel</th>
            <th>Accept</th>
         </tr>
         {reimbursements.map((item) => (
             <tr>{Object.values(item).map((val) => (
                 <td>{val}</td>
         ))}
                <td>
                    <TableButtonReject type='button' onClick= {handleReject}>X</TableButtonReject>
                </td>
                <td>
                    <TableButtonAccept type='button' onClick= {handleAccept}>O</TableButtonAccept>
                </td>
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

export default ReimbursementPage;




