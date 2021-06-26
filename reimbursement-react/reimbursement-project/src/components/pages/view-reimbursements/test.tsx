import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { useAppSelector } from "../../../hook";
import Reimbursement from "../../../models/reimbursement";
import User from "../../../models/user";
import { deleteReimbursement, getByID, getByRole, reject, updateByRole } from "../../../remote/reimbursement-backend/reimbursement.api";
import { selectUser, UserState } from "../../../slices/user.slice";
import { Form, FormButton, FormInput, FormLabel } from "../submit-form/FormOptionsElem";

const TestPage = () => {
const user = useAppSelector<UserState>(selectUser);
const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
const [id, setID] = useState<string>('');

const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
      }
const setData = (user: User) => {

    getByRole(user.role, id).then((arr) => {
      setReimbursements(arr);
    })
}

useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

const handleAccept = async (e: ChangeEvent<HTMLSelectElement>) => {
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
if (user) {
  return (
      <Form onSubmit={handleAccept}>
      <input type="text"></input>
      <FormButton type="submit" />
      </Form>
  )
} else return (
    <h2>Hello</h2>
)

export default TestPage;