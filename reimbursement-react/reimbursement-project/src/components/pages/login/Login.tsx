import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon } from './LoginElem';
import { loginAsync } from '../../../slices/user.slice';
import { useAppDispatch } from '../../../hook';
import { useHistory } from 'react-router-dom'


const LoginPage: React.FC<unknown> = (props) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
   }
   
    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                            <FormH1>Sign in to your account</FormH1>
                            <FormLabel htmlFor='for'>Username</FormLabel>
                            <FormInput type='text' required onChange={handleUsernameChange}/>
                            <FormLabel htmlFor='for'>Password</FormLabel>
                            <FormInput type='password' required onChange={handlePasswordChange}/>
                            <FormButton type='submit'>Log in</FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default LoginPage