import React, { ChangeEvent, FormEvent, useState } from 'react';


import { useHistory } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook';
import Message from '../../models/message';
import { sendMessage } from '../../remote/reimbursement-backend/reimbursement.api';
import { selectUser, UserState } from '../../slices/user.slice';
import UserNav from '../navbar/UserNav';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap } from '../pages/register/RegisterElem';
import { FormOption, FormSelect } from '../pages/submit-form/FormOptionsElem';

const MessageForm = () => {

    const user = useAppSelector<UserState>(selectUser);
    const [recipient, setRecipient] = useState<string>('');
    const [recipientRole, setRecipientRole] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const history = useHistory();

    const handleRecipientChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipient(e.target.value);
    }

    const handleRecipientRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRecipientRole(e.target.value);
   }

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  }

  if(user) {
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const newMessage = new Message(recipient, recipientRole, note, user.username, user.role);
        const result = await sendMessage(newMessage);
        if(result) {
            alert('message sent')
            history.go(0)
        } else alert('unable to send message')
    }

    
    return (
        <>
            <UserNav />
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form onSubmit={handleFormSubmit}>
                            <FormH1>Request Additional Information</FormH1>
                            <FormLabel htmlFor= "to">To:</FormLabel>
                            <FormInput type='text' required onChange={handleRecipientChange}/>
                            <FormLabel htmlFor= "role">Role</FormLabel>
                            <FormSelect onChange={handleRecipientRoleChange}>
                                <FormOption value="Employee">Employee</FormOption>
                                <FormOption value="Supervisor">Supervisor</FormOption>
                                <FormOption value="Department Head">Department Head</FormOption>
                            </FormSelect>
                            <FormLabel htmlFor= "message">Message</FormLabel>
                            <FormInput type='text' required onChange={handleNoteChange}/>
                            <FormLabel htmlFor= "from">From: </FormLabel>
                            <FormInput type='text' name={user.username} value={user.username} readOnly/>
                            <FormLabel htmlFor= "from-role">Role</FormLabel>
                            <FormInput type="text" value={user.role} readOnly />
                            <FormButton type='submit'>Submit</FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
} else return (
    <div>Something's not right</div>
)
}

export default MessageForm