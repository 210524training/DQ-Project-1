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
import Home from "../home/Home";
import { FormButton, GradeButton } from "../login/LoginElem";
import { Form, FormInput, FormLabel, StyledLink } from "./FinalGradeElem";


type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const PendingPage: React.FC<unknown> = (): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const history = useHistory();
  const [id, setID] = useState<string>('');
  const [amount, setAmount] = useState<string>('');


const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
      }

const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount((e.target.value));
    }
    

 // arr.forEach(el => markUrgent(el.file, el.start))

useEffect( () => {
    if (user) {
      console.log('inside if user')
    const getArray = async (user: User) => {

      let arr: Reimbursement[]
      switch(user.role) {
        case 'Supervisor':
          console.log('inside supervisor cases')
          arr = await supervisorView();
          setReimbursements(arr);
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
      let result:boolean;
  const targetClaim = await getByID(id);
  switch(user.role) {
    case 'Supervisor':
      console.log(targetClaim);
       result = await supervisorUpdate(targetClaim);
      (result) ? alert('claim accepted') : alert('something went wrong');
      history.go(0)
      break
    case 'Department Head':
      headUpdate(targetClaim);
       result = await headUpdate(targetClaim);
      (result) ? alert('claim accepted') : alert('something went wrong');
      history.go(0)
      break
    case 'Benco':
      targetClaim.projected = Number(amount);
        result = await bencoUpdate(targetClaim);
      (result) ? alert('claim accepted') : alert('something went wrong');
      history.go(0)
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
    history.go(0)
  } 
}

  if(user) {
return (
        
    <>
    <UserNav />
      <h1 className="text-center">Pending Approval</h1>
      <GradeButton className="btn btn-info ml-2" onClick= {handleButtonClick}>View Final Grades</GradeButton> 
      <table className="table table-striped table-sm table-bordered mt-4">
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
            <th>Additional Notes</th>
          </tr>
        </thead>
        {
         reimbursements.map((item, index) => (
            <tr className= {(item.urgent) ? `table-danger` : 'table-default'} key={index}>
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
        <FormLabel htmlFor="alter amount">Alter Amount</FormLabel>
        {(user.role === 'Benco')? (<FormInput type='text' onChange={handleAmountChange}/>) : (<FormInput type="text" value="cannot alter" />)}
        <button type='button' className="btn btn-primary mb-2" onClick= {handleAccept}>Accept</button>
        <button type='button' className="btn btn-danger" onClick= {handleReject}>Reject</button>
      </Form>
      <StyledLink to="/message/form">Request More Information</StyledLink>
    </>
      )
  } else return (<Home />)
}
export default PendingPage;
