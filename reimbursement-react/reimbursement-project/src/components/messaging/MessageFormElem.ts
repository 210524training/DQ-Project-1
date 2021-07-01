import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    height: 1000px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    background-color: #fff;
    `;

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
    `;

export const Icon = styled(Link)`
margin-left: 32px;
margin-top: 2rem;
text-decoration: none;
color: #fff;
font-size: 1.5rem;
display: flex;
align-items: center;
justify-self: flex-start;

@media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
}
`;
export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        margin-top: 30px;
    }
`

export const Form = styled.form`
    background: #000;
    max-width: 400px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    margin-bottom: 4em;
    padding: 80px 32px;
    border-radius: 4px;

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    }
`;

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
`;

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`;

export const FormInput = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none; 
    border-radius: 4px;
`;

export const FormButton = styled.button`
    background: #0F9D58;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
`;

export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
`;