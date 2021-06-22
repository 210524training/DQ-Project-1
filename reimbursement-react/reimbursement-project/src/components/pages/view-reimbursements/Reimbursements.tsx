import * as ReactBootstrap from 'react-bootstrap'
import Reimbursement from '../../../models/reimbursement';

//reimbursements array
type Props = {
    reimbursements: Reimbursement[]
}

//add conditional that changes the table based on role 


const ReimbursementsTable: React.FC<Props> = ((props) => { 

    
    //render reimbursements array 
    const renderReimbursement = (reimbursement: any, index: any) => {
        return (
            <tr key={index}>
                <td>{reimbursement.id}</td>
                <td>{reimbursement.username}</td>
                <td>{reimbursement.location}</td>
                <td>{reimbursement.startDate}</td>
                <td>{reimbursement.fileDate}</td>
                <td>{reimbursement.type}</td>
                <td>{reimbursement.amount}</td>
                <td>{reimbursement.status}</td>
                <td>{reimbursement.format}</td>
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
                    </tr>
                </thead>
                <tbody>
                    {props.reimbursements.map(renderReimbursement)}
                </tbody>
            </ReactBootstrap.Table>
        </div>
    )
})

export default ReimbursementsTable