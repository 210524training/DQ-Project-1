import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppSelector } from "../../../hook";
import Reimbursement from "../../../models/reimbursement";
import User from "../../../models/user";
import { bencoUpdate, bencoView, deleteReimbursement, getByID, getByUsername, headUpdate, headView, reject, supervisorUpdate, supervisorView } from "../../../remote/reimbursement-backend/reimbursement.api";
import { selectUser, UserState } from "../../../slices/user.slice";
import MessageForm from "../../messaging/MessageForm";
import Navbar from "../../navbar/Navbar";
import { NavLinks } from "../../navbar/NavbarElem";
import UserNav from "../../navbar/UserNav";
import { FormButton } from "../login/LoginElem";
import { Form, FormInput, FormLabel, StyledLink } from "./FinalGradeElem";


type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const PendingPage: React.FC<unknown> = (): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const history = useHistory();
  const [id, setID] = useState<string>('');


const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
      }



useEffect( () => {
    if (user) {
      console.log('inside if user')
    const getArray = async (user: User) => {

      let arr: Reimbursement[]
      switch(user.role) {
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
        case 'Employee':
            alert('employees can only view their own reimbursement claims')
            history.goBack()
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
      let result;
  const targetClaim = await getByID(id);
  switch(user.role) {
    case 'Supervisor':
      console.log(targetClaim);
       result = await supervisorUpdate(targetClaim);
      (result) ? history.go(0) : console.log('something went wrong')
      break
    case 'Department Head':
      headUpdate(targetClaim);
       result = await headUpdate(targetClaim);
      (result) ? history.go(0) : console.log('something went wrong')
      break
    case 'Benco':
        result = await bencoUpdate(targetClaim);
      (result) ? history.go(0) : console.log('something went wrong')
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
    const result: boolean = await reject(targetClaim);
    (result) ? alert('successfully rejected reimbursement request') : alert('could not reject');
  } 
}

  
return (
        
    <>
    <UserNav />
      <h1>Pending Approval</h1>
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
            <th>Addition Notes</th>
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
             <td>{item.note}</td>
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
      <StyledLink to="/message/form">Request More Information</StyledLink>
    </>
      )
}
export default PendingPage;
