import { Link } from 'react-router-dom';
import styled from 'styled-components'

export const TableButtonReject = styled.button`
    background: #db4437;
    padding: 12px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
`;

export const TableButtonAccept = styled.button`
    background: #4285F4;
    padding: 12px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
`;

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #000;
`

export const FormInput = styled.input`
    padding: 10px 10px;
    margin-bottom: 8px; 
    border-radius: 4px;`

export const FormButtonAccept = styled.button`
    background: #4285F4;
    padding: 8px 0;
    border: none;
    border-radius: 4px;
    color: #;
    font-size: 12px;
    cursor: pointer;`

export const FormButtonReject = styled.button`
    background: #db4437;
    padding: 8px 0;
    border: none;
    border-radius: 4px;
    color: #;
    font-size: 12px;
    cursor: pointer;`

export const Form = styled.form`
    max-width: 400px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 40px 20px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    }
`;

export const StyledLink = styled(Link)`
    color: blue;
    font-size: 12px;
    cursor: pointer;
`