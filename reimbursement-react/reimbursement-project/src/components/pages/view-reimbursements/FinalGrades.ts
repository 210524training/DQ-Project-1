import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../../hook';
import Reimbursement from '../../../models/reimbursement';
import { getByRole } from '../../../remote/reimbursement-backend/reimbursement.api';
import { selectUser, UserState } from '../../../slices/user.slice';
import { FormButton } from '../login/LoginElem';

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const FinalGradesPage = () => {

    const history = useHistory();
    const user = useAppSelector<UserState>(selectUser);

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

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
        history.push(`/reimbursement/accept`)
        await viewFinalGrade();
    }
        alert('something went wrong')
}

    useEffect(() => {
        handleReimbursementChange()}
        );

    
}

export default ReimbursementPage;