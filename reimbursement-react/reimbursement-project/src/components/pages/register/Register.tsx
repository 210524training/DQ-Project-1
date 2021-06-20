import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon } from './RegisterElem';
import { loginAsync } from '../../../slices/user.slice';
import { useAppDispatch } from '../../../hook';
import { useHistory } from 'react-router-dom'
import { Role } from '../../../models/user';
import { FormOption, FormSelect, } from '../submit-form/FormOptionsElem';

const Register: React.FC<unknown> = (props) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<Role>();
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
   }

   const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const userRole: Role = e.target.value as Role;
    setRole(userRole);
  }

   const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }
   
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password.length === 0 || password !== confirmPassword) {
            console.log('invalid user');
            return;
          }

        await dispatch(loginAsync({ username, password }));
        history.push('/');
    }

    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Reimbursements-R-Us</Icon>
                    <FormContent>
                        <Form onSubmit={handleFormSubmit}>
                            <FormH1>Sign up for Account</FormH1>
                            <FormLabel htmlFor='for'>Username</FormLabel>
                            <FormInput type='text' required onChange={handleUsernameChange}/>
                            <FormLabel htmlFor='for'>Password</FormLabel>
                            <FormInput type='password' required onChange={handlePasswordChange}/>
                            <FormLabel htmlFor='for'>Confirm Password</FormLabel>
                            <FormInput type='password' required onChange={handleConfirmPasswordChange}/>
                            <FormLabel htmlFor='for'>Role</FormLabel>
                            <FormSelect onChange={handleRoleChange}>
                                <FormOption value="Employee">Employee</FormOption>
                                <FormOption value="Supervisor">Supervisor</FormOption>
                                <FormOption value="Head">Department Head</FormOption>
                                <FormOption value="Benco">Benefits Coordinator</FormOption>
                            {console.log(role)}
                            </FormSelect>
                            <FormButton type='submit'>Register</FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default Register