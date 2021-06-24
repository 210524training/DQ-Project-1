import { Props, useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap'
import { useAppSelector } from '../../../hook';
import Reimbursement from '../../../models/reimbursement';
import { getByUsername } from '../../../remote/reimbursement-backend/reimbursement.api';
import { selectUser, UserState } from '../../../slices/user.slice';

//add conditional that changes the table based on role 



const ReimbursementsTable: React.FC<Props> = ((props) => { 

    
    //render reimbursements array 
    const RenderReimbursement: React.FC = (): JSX.Element => {

        const history = useHistory();
        const user = useAppSelector<UserState>(selectUser);
        const reimbursementArray = [];

        if (user) {
            switch (user.role) {
            case 'Employee': 
            const table = await getByUsername()
            }
        }

        return (
            <tr>
                <td>{reimbursement.id}</td>
                <td>{reimbursement.username}</td>
                <td>{reimbursement.location}</td>
                <td>{reimbursement.startDate}</td>
                <td>{reimbursement.fileDate}</td>
                <td>{reimbursement.type}</td>
                <td>{reimbursement.cost}</td>
                <td>{reimbursement.status}</td>
                <td>{reimbursement.format}</td>
                <td>{reimbursement.projectedReimbursement}</td>
                <td>{reimbursement.amountAwarded}</td>
            </tr>
        )
    }

    return (
        <div className="App">
            <ReactBootstrap.Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>File Date</th>
                        <th>Event Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Grading Format</th>
                        <th>Projected Reimbursement</th>
                        <th>Amount Awarded</th>
                    </tr>
                </thead>
                <tbody>
                    {props.reimbursements.map(renderReimbursements)}
                </tbody>
            </ReactBootstrap.Table>
        </div>
    )
})

export default ReimbursementsTable