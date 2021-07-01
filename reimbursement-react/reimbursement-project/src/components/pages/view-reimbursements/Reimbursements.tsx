
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Reimbursement from '../../../models/reimbursement';
import User from '../../../models/user';
import { selectUser, UserState } from '../../../slices/user.slice';
import { bencoUpdate, bencoView, deleteReimbursement, getByID, getByUsername, headUpdate, headView, postImage, reject, supervisorUpdate, supervisorView, updateFile } from '../../../remote/reimbursement-backend/reimbursement.api';
import { FormButton } from '../login/LoginElem';
import { ChangeEvent } from 'react';
import { Form, FormInput, FormLabel, TableButtonAccept, TableButtonReject } from './FinalGradeElem';
import { useAppSelector } from '../../../hook';
import PendingButton from './PendingButton';
import Navbar from '../../navbar/Navbar';
import UserNav from '../../navbar/UserNav';

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const ReimbursementPage: React.FC<unknown> = (props): JSX.Element => {
  const user = useAppSelector<UserState>(selectUser);
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const history = useHistory();
  const [id, setID] = useState<string>('');
  const [file, setFile] = useState([]);
  const [images, setImages] = useState<any>([])
  const [description, setDescription] = useState<string>('')
  const [url, setUrl] = useState<string>('');


const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
      }

  // const getArray = async (user: User) => {

  //   let arr: Reimbursement[]
  //   switch(user.role) {
  //     case 'Employee':
  //       arr = await getByUsername(user.username)
  //       setReimbursements(arr)
  //       break;
  //     case 'Supervisor':
  //       arr = await supervisorView();
  //       setReimbursements(arr)
  //       break
  //     case 'Department Head':
  //       arr = await headView();
  //       setReimbursements(arr)
  //       break
  //     case 'Benco':
  //       arr = await bencoView();
  //       setReimbursements(arr)
  //       break
  //     default:
  //       arr = await getByUsername(user.username);
  //       setReimbursements(arr)
  //     }
  // }
  
    useEffect( () => {
      if (user) {
        console.log('inside if user')
      const getArray = async (user: User) => {

        let arr: Reimbursement[] = await getByUsername(user.username)
        setReimbursements(arr)
        // arr.forEach(el => markUrgent(el.file, el.start))
      }
      getArray(user);
      
  } 
}, [user]);


const handleReject = async (e: ButtonEvent): Promise<void> => {
    e.preventDefault();
    if(user) {
    const targetClaim = await getByID(id);
    if (user.role === 'Employee') {
      const result: boolean = await deleteReimbursement(id, user.username);
      (result) ? alert('successfully canceled reimbursement request') : alert('could not cancel');
    } else {
      reject(targetClaim);
    alert('successfully rejected claim');
}
}
}

const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
  setDescription(e.target.value);
}

const handleSubmit = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  const result = await postImage({image: file, description});
  (result) ? alert('file uploaded successfully') : alert('unable to upload file');
  //use reimb id to get by id, post result uri to reimbursement and push
  setImages([result.image, ...images]);
  // console.log(result)
  // console.log(result.imagepath)
  // console.log(result.data.imagePath);
  // //update reimbursement to include aws url 
  // const targetClaim = await getByID(id);
  // targetClaim.fileName = `resobucket.s3.us-west-1.amazonaws.com/${url}`;
  // updateFile(targetClaim);

}

const fileSelected = (e: any) => {
  const file = e.target.files[0]
  setFile(file)
}

// function markUrgent(fileDate: string, startDate: string) {
//   let today = Date.parse(fileDate);
//   let stringToDate = new Date(fileDate);
//   let twoWeeksFromNow = new Date(stringToDate.getFullYear(), stringToDate.getMonth(), stringToDate.getDate() + 14);
//   console.log(twoWeeksFromNow);
//   let twoWeeksParsed = Date.parse(twoWeeksFromNow.toString());
//   const start = Date.parse(startDate)
//   const twoWeeksDifference = twoWeeksParsed - today
//   console.log(twoWeeksDifference);
//   const difference = start - today;
//   console.log(difference);
//   if(difference >= twoWeeksDifference) {
//     console.log('it is at least two weeks till the deadline for acceptance');
//   } else {
//     alert('found an urgent claim');
//   }
// }

//edit amount function for benco
const handleClick = (item: Reimbursement, index: number) => {
  setReimbursements((current) => {
    // Remove the one reimbursement at the provided index
    return current.splice(index, 1);
  });

  // Send an HTTP Request to also delete it on the backend
}

    
  return (
        
      <>
        <UserNav />
        <h1 className="text-center">Your Reimbursements</h1>
        <PendingButton />
        <table
        className = "table table-striped table-sm table-bordered mt-4">
          <thead className= "thead-dark">
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
          <tbody>
          {
           reimbursements.map((item, index) => (
              <tr className= {(item.urgent) ? `table-danger` : 'table-default'} key={item.id}>
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
               <button onClick={() => handleClick(item, index)}>X</button>
              </tr>
           ))
          }
          </tbody>
        </table>

        <Form
        onSubmit={handleSubmit}>
          <FormLabel htmlFor='accept'>Please enter ID</FormLabel>
            <FormInput type='text' onChange={handleIDChange} required/>
            <button type='button' className="btn btn-danger mb-4" onClick= {handleReject}>Cancel</button>
            <input onChange={fileSelected} type="file" name='file'></input>
            <input type="text" onChange={handleDescriptionChange} required></input>
            <button type="submit" className= "btn btn-primary">Submit</button>
        </Form>

        {
          images.map( (image: any) => (
            <div key={image}>
              <img alt="" src={image}></img>
            </div>
          ))
        }
      </>
        )
}
export default ReimbursementPage;
