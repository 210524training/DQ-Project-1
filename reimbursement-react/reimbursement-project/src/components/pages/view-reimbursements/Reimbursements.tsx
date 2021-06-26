// import React, { ChangeEvent } from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useAppSelector } from '../../../hook';
// import Reimbursement from '../../../models/reimbursement';
// import User from '../../../models/user';
// import { deleteReimbursement, getByID, getByRole, reject, updateByRole } from '../../../remote/reimbursement-backend/reimbursement.api';
// import { selectUser, UserState } from '../../../slices/user.slice';
// import { FormButton } from '../login/LoginElem';
// import { Form, FormInput, FormLabel, TableButtonAccept, TableButtonReject } from './FinalGradeElem';


// type Props = {
//     user: User
// }

// const ReimbursementPage: React.FC<Props> = (props) => {

//     const history = useHistory();
//     const user = useAppSelector<UserState>(selectUser);

//     const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);



//       useEffect(() => {
//           if(user) {
//         const handleReimbursementChange = async() => {
//             let table: Reimbursement[]
//             table = await getByRole(props.user.role, props.user.username);
//             console.log(table);
//             setReimbursements(table);
//         } 
//         handleReimbursementChange()}, [props.user]
//     )


        







   





import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Reimbursement from '../../../models/reimbursement';
import User from '../../../models/user';
import { selectUser, UserState } from '../../../slices/user.slice';
import { deleteReimbursement, getByID, getByRole, reject, updateByRole } from '../../../remote/reimbursement-backend/reimbursement.api';
import { FormButton } from '../login/LoginElem';
import { ChangeEvent } from 'react';
import { Form, FormInput, FormLabel, TableButtonAccept, TableButtonReject } from './FinalGradeElem';
import { useAppSelector } from '../../../hook';

const ReimbursementPage: React.FC<unknown> = (props): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const history = useHistory();

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
const [id, setID] = useState<string>('');
const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
      }

  const setData = (user: User) => {
    setStatus('Loading...');

    getByRole(user.role, id).then((arr) => {
      setReimbursements(arr);
      setStatus(reimbursements.length === 0 ? 'No content.' : undefined);
    }).catch((err) => {
      setStatus('An error occurred! ' + err.message);
    });
  };
  
  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

    const handleButtonClick = (e: ButtonEvent): void => {
        
        e.preventDefault();
        if(user) {
        (user.role === 'Employee') ? alert("you do not have access to this feature") : history.push('/grades');
} else console.log('somn wrong'); 
    }

const handleAccept = async (e: ButtonEvent): Promise<void> => {
    e.preventDefault();
    if(user) {
    const targetClaim = await getByID(id);
    (user.role === 'Employee') ? alert('cannot accept offer') : updateByRole(targetClaim, user.role)
}
}

const handleReject = async (e: ButtonEvent): Promise<void> => {
    e.preventDefault();
    if(user) {
    const targetClaim = await getByID(id);
    (user.role === 'Employee') ? deleteReimbursement(targetClaim.id, targetClaim.username) : reject(targetClaim);
}
}

    
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

